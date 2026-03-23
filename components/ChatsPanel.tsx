"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "./ui/card";
import { Search, Send, Paperclip, Check, ChevronDown, ChevronUp, X, FileText } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import * as ChatAPI from "@/lib/chat-api";
import { getEcho } from "@/lib/echo";
import { presenceService } from "@/lib/services/presence-service";
import type { Conversation, Message as APIMessage } from "@/lib/chat-api";

const FILTER_TAGS = [
  { id: "todo", label: "Todo", value: "todo" },
  { id: "pago_pendiente", label: "Pago pendiente", value: "pago_pendiente" },
  { id: "pagado", label: "Pagado", value: "pagado" },
  { id: "envio_pendiente", label: "Envío pendiente", value: "envio_pendiente" },
  { id: "enviado", label: "Enviado", value: "enviado" },
  { id: "pago_contra_entrega", label: "Pago contra entrega", value: "pago_contra_entrega" }
];

export default function ChatsPanel() {
  // Estados del componente
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"comprar" | "vender">("comprar");
  const [activeFilter, setActiveFilter] = useState<ChatAPI.FilterType>("todo");
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Estado de presencia - usuarios online
  const [onlineUserIds, setOnlineUserIds] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  
  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loadingMoreMessages, setLoadingMoreMessages] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef<number>(0);
  const lastChatIdRef = useRef<number | null>(null);

  // ✅ Scroll inicial INSTANTÁNEO al abrir un chat + Auto-scroll con mensajes nuevos
  useEffect(() => {
    // Resetear cuando no hay chat seleccionado (ej: usuario presionó ESC)
    if (!selectedChat) {
      lastChatIdRef.current = null;
      return;
    }

    if (!selectedChat.messages) return;

    const currentLength = selectedChat.messages.length;
    const chatChanged = lastChatIdRef.current !== selectedChat.id;

    // CASO 1: Chat nuevo seleccionado (scroll instantáneo al final)
    if (chatChanged && currentLength > 0) {
      // console.log('📜 Scroll inicial al chat:', selectedChat.id);
      
      // Scroll inmediato para evitar ver la parte superior
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
      
      // Scroll de respaldo después del render para asegurar la posición
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
      });
      
      lastChatIdRef.current = selectedChat.id;
      prevMessagesLengthRef.current = currentLength;
    }
    // CASO 2: Mensaje nuevo en el chat actual (scroll suave)
    else if (!chatChanged && currentLength > prevMessagesLengthRef.current && prevMessagesLengthRef.current > 0) {
      // console.log('📨 Nuevo mensaje detectado, haciendo auto-scroll');
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      prevMessagesLengthRef.current = currentLength;
    }
    // CASO 3: Actualizar contador sin hacer scroll (cargar mensajes viejos)
    else if (currentLength !== prevMessagesLengthRef.current) {
      prevMessagesLengthRef.current = currentLength;
    }
  }, [selectedChat?.id, selectedChat?.messages?.length]); // Reacciona a cambio de chat O cantidad de mensajes

  // Obtener ID del usuario actual
  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        // console.log('👤 Current user ID:', userData.id);
        setCurrentUserId(userData.id);
      } catch (error) {
        // console.error('❌ Error parsing user data:', error);
      }
    } else {
      // console.warn('⚠️ No user data found in localStorage');
    }
  }, []);
  
  // Helper para generar iniciales
  const getInitials = (name: string): string => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Función para cargar conversaciones
  const loadConversations = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await ChatAPI.fetchConversations(activeTab, activeFilter === "todo" ? undefined : activeFilter);
      
      // Normalizar cada conversación para compatibilidad (sin aplicar estado online aquí)
      const normalizedData = data.map(conv => {
        const otherUser = conv.other_user ? {
          id: conv.other_user.id,
          name: (conv.other_user as any).full_name || conv.other_user.name,
          // NO aplicar online aquí - se actualizará por presenceService
          online: false,
          avatar: (conv.other_user as any).avatar_url || conv.other_user.avatar,
          initials: getInitials((conv.other_user as any).full_name || conv.other_user.name || '')
        } : conv.user;
        
        return {
          ...conv,
          user: otherUser,
          other_user: conv.other_user
        };
      });
      
      // console.log('📋 Loaded conversations (online status will be updated by presenceService):', normalizedData);
      setConversations(normalizedData);
      
      // ✅ CRITICAL: Aplicar estado online inmediatamente después de cargar
      const currentOnlineUserIds = presenceService.getOnlineUserIds();
      // console.log('🔄 Applying current online status:', Array.from(currentOnlineUserIds));
      
      if (currentOnlineUserIds.size > 0) {
        setConversations(prev => prev.map(conv => {
          const userOnline = conv.user ? currentOnlineUserIds.has(conv.user.id) : false;
          const otherUserOnline = conv.other_user ? currentOnlineUserIds.has(conv.other_user.id) : false;
          
          return {
            ...conv,
            user: conv.user ? {
              ...conv.user,
              online: userOnline,
              is_online: userOnline
            } : conv.user,
            other_user: conv.other_user ? {
              ...conv.other_user,
              online: otherUserOnline,
              is_online: otherUserOnline
            } : conv.other_user
          };
        }));
      }
      
      // Si había un chat seleccionado, actualizarlo sin crear dependencia circular
      setSelectedChat(prev => {
        if (!prev) return prev;
        const updatedChat = normalizedData.find(c => c.id === prev.id);
        if (!updatedChat) return prev;
        
        // Aplicar estado online al chat seleccionado también
        const isOnline = currentOnlineUserIds.has(updatedChat.user?.id || 0);
        return {
          ...updatedChat,
          user: updatedChat.user ? {
            ...updatedChat.user,
            online: isOnline,
            is_online: isOnline
          } : updatedChat.user
        };
      });
    } catch (err) {
      // console.error("Error loading conversations:", err);
      setError("Error al cargar conversaciones");
    } finally {
      setLoading(false);
    }
  }, [activeTab, activeFilter]); // ✅ REMOVIDO onlineUserIds - previene recargas desde backend que sobrescriben presencia

  // Cargar conversaciones cuando cambie el tab o filtro
  useEffect(() => {
    loadConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, activeFilter]);

  // � WebSocket para canal personal - actualizar lista en tiempo real
  useEffect(() => {
    if (!currentUserId) return;

    const echo = getEcho();
    if (!echo) {
      // console.warn('⚠️ Echo not initialized for personal channel');
      return;
    }

    // console.log(`📡 Subscribing to personal channel: user.${currentUserId}`);
    const personalChannel = echo.private(`user.${currentUserId}`);

    // Escuchar eventos globales en el canal personal
    personalChannel.subscription.bind_global((eventName: string, data: any) => {
      // console.log(`📬 Personal channel event: ${eventName}`, data);

      // Actualizar lista cuando llega mensaje nuevo
      if (eventName === 'MessageSent') {
        // console.log('📬 New message notification for conversation:', data.conversation_id);
        
        setConversations(prev => prev.map(conv => {
          if (conv.id === data.conversation_id) {
            return {
              ...conv,
              last_message_preview: data.message_text,
              last_message_at: data.created_at,
              // Solo incrementar unread si el chat NO está abierto
              unread_count: selectedChat?.id === data.conversation_id ? 0 : conv.unread_count + 1,
              // ✅ CRITICAL: Preservar estado online del usuario
              user: conv.user,
              other_user: conv.other_user
            };
          }
          return conv;
        }));
      }
    });

    // ✅ No hacer cleanup - el canal personal debe permanecer activo
  }, [currentUserId, selectedChat?.id]);

  // 🟢 Suscribirse al Presence Service (Redis HTTP polling)
  useEffect(() => {
    // console.log('🔵 ChatsPanel: Subscribing to Presence Service');
    
    // presenceService se auto-inicializa al importar si hay token
    // No es necesario llamar .initialize() o .start() aquí

    // Suscribirse a cambios de presencia
    const unsubscribe = presenceService.subscribe((newOnlineUserIds) => {
      // console.log('📡 Presence update received:', Array.from(newOnlineUserIds));
      
      // Actualizar estado local
      setOnlineUserIds(newOnlineUserIds);
      
      // Actualizar conversaciones
      setConversations(prev => {
        if (prev.length === 0) return prev;
        
        return prev.map(conv => {
          const userOnline = conv.user ? newOnlineUserIds.has(conv.user.id) : false;
          const otherUserOnline = conv.other_user ? newOnlineUserIds.has(conv.other_user.id) : false;
          
          return {
            ...conv,
            user: conv.user ? {
              ...conv.user,
              online: userOnline,
              is_online: userOnline
            } : conv.user,
            other_user: conv.other_user ? {
              ...conv.other_user,
              online: otherUserOnline,
              is_online: otherUserOnline
            } : conv.other_user
          };
        });
      });

      // Actualizar chat seleccionado
      setSelectedChat(prev => {
        if (!prev?.user) return prev;
        const isOnline = newOnlineUserIds.has(prev.user.id);
        return {
          ...prev,
          user: {
            ...prev.user,
            online: isOnline,
            is_online: isOnline
          }
        };
      });
    });

    // Cleanup: desuscribirse (pero NO detener el service)
    return () => {
      // console.log('🔵 ChatsPanel: Unsubscribing from Presence Service');
      unsubscribe();
    };
  }, []);

  // Configurar WebSocket cuando se selecciona un chat
  useEffect(() => {
    if (!selectedChat) return;

    const echo = getEcho();
    if (!echo) {
      // console.warn("⚠️ Echo not initialized - WebSocket disabled");
      return;
    }

    // Suscribirse al canal de la conversación
    // console.log(`🔌 Subscribing to channel: conversation.${selectedChat.id}`);
    const channel = echo.private(`conversation.${selectedChat.id}`);
    
    // Debug: Listener para todos los eventos
    channel.subscription.bind_global((eventName: string, data: any) => {
      // console.log(`🌐 WebSocket Event: ${eventName}`, data);
      
      // Si es MessageSent, procesarlo manualmente
      if (eventName === 'MessageSent') {
        // console.log('📨 Processing MessageSent from bind_global');
        const message = data;
        
        // console.log('📨 Message data:', message);
        // console.log('📨 Message sender_id:', message.sender_id);
        // console.log('📨 Current user_id:', currentUserId);
        
        // Actualizar mensajes del chat seleccionado
        setSelectedChat(prev => {
          if (!prev || prev.id !== message.conversation_id) {
            // console.log('⚠️ Not updating: conversation mismatch or no selected chat');
            return prev;
          }
          
          // Evitar duplicados si el mensaje ya existe
          const messageExists = prev.messages?.some(m => m.id === message.id);
          if (messageExists) {
            // console.log('⚠️ Message already exists, skipping duplicate');
            return prev;
          }
          
          // console.log('✅ Adding message to chat');
          return {
            ...prev,
            messages: [...(prev.messages || []), message]
          };
        });

        // Si el mensaje NO es del usuario actual, marcarlo como leído automáticamente
        if (message.sender_id !== currentUserId) {
          // console.log('📖 Auto-marking message as read (chat is open)');
          ChatAPI.markMessageAsRead(message.id).catch(err => 
            {} // console.error('❌ Error auto-marking message as read:', err)
          );
        }

        // Actualizar preview en la lista
        setConversations(prev => prev.map(conv => 
          conv.id === message.conversation_id
            ? {
                ...conv,
                last_message_preview: message.message_text,
                last_message_at: message.created_at,
                // NO incrementar unread_count si el chat está abierto
                unread_count: conv.id === selectedChat.id ? 0 : conv.unread_count + 1,
                // ✅ Preservar estado online del usuario
                user: conv.user,
                other_user: conv.other_user
              }
            : conv
        ));
      }
      
      // Si es MessageRead, procesarlo también globalmente
      if (eventName === 'MessageRead') {
        // console.log('📖 Processing MessageRead from bind_global');
        const { message_id, read_at } = data;
        
        // Convertir a número para asegurar comparación correcta
        const messageIdNum = typeof message_id === 'string' ? parseInt(message_id, 10) : message_id;
        
        // console.log('📖 Message ID:', messageIdNum, '(type:', typeof messageIdNum, ')');
        // console.log('📖 Read at:', read_at);
        // console.log('📖 Current chat ID:', selectedChat?.id);
        
        // Actualizar read_at en los mensajes del chat seleccionado
        setSelectedChat(prev => {
          if (!prev) {
            // console.log('⚠️ No chat selected');
            return prev;
          }
          
          const messageIndex = prev.messages?.findIndex(m => m.id === messageIdNum);
          if (messageIndex === -1 || messageIndex === undefined) {
            // console.log('⚠️ Message not in current chat, message_id:', messageIdNum);
            // console.log('⚠️ Available message IDs:', prev.messages?.map(m => m.id));
            return prev;
          }
          
          // console.log('✅ Updating message read status at index:', messageIndex);
          
          // Crear nuevo array de mensajes con el mensaje actualizado
          const updatedMessages = [...(prev.messages || [])];
          updatedMessages[messageIndex] = {
            ...updatedMessages[messageIndex],
            read_at
          };
          
          return {
            ...prev,
            messages: updatedMessages
          };
        });
        
        // Reducir unread_count en la lista de conversaciones
        setConversations(prev => prev.map(conv => {
          // Como estamos en el canal conversation.X, sabemos que es de esta conversación
          if (conv.id === selectedChat.id) {
            return {
              ...conv,
              unread_count: Math.max(0, conv.unread_count - 1)
            };
          }
          return conv;
        }));
      }
    });
    
    // Verificar si el canal se suscribió correctamente
    channel.subscribed(() => {
      // console.log('✅ Successfully subscribed to channel');
    });
    
    channel.error((error: any) => {
      // console.error('❌ Channel subscription error:', error);
    });

    // Marcar mensajes como leídos al abrir el chat
    let isSubscribed = true;
    ChatAPI.markAllMessagesAsRead(selectedChat.id)
      .then(() => {
        if (isSubscribed) {
          // console.log(`✅ Messages marked as read for conversation ${selectedChat.id}`);
          
          // Actualizar unread_count a 0 en la lista de conversaciones
          setConversations(prev => prev.map(conv =>
            conv.id === selectedChat.id ? { ...conv, unread_count: 0 } : conv
          ));
        }
      })
      .catch(err => {
        if (isSubscribed) {
          // console.error('Error marking messages as read:', err);
        }
      });

    // Limpiar suscripción al desmontar o cambiar de chat
    return () => {
      isSubscribed = false;
      echo.leave(`conversation.${selectedChat.id}`);
      // console.log(`🔌 Left conversation channel: ${selectedChat.id}`);
    };
  }, [selectedChat?.id]);

  // ✅ No desconectar Echo - debe permanecer activo mientras el usuario esté en la app
  // En producción no hay React Strict Mode, y en desarrollo necesitamos mantener la conexión
  // useEffect(() => {
  //   return () => {
  //     disconnectEcho();
  //   };
  // }, []);

  // Cargar mensajes de una conversación (página 1)
  const loadMessages = async (conversationId: number) => {
    try {
      const { data: messages, conversation, last_page } = await ChatAPI.fetchMessages(conversationId, 1);
      
      setCurrentPage(1);
      setLastPage(last_page);
      
      setSelectedChat(prev => {
        if (!prev || prev.id !== conversationId) return prev;
        
        // ✅ CRITICAL: Preservar estado online al actualizar desde backend
        const currentOnlineUserIds = presenceService.getOnlineUserIds();
        // console.log(`🔄 loadMessages: Preserving online status for conversation ${conversationId}`, Array.from(currentOnlineUserIds));
        
        // Actualizar con la info del conversation que viene del backend
        const updated = {
          ...prev,
          ...(conversation && { 
            user: conversation.user ? {
              ...conversation.user,
              // ✅ Preservar estado online
              online: currentOnlineUserIds.has(conversation.user.id),
              is_online: currentOnlineUserIds.has(conversation.user.id)
            } : prev.user,
            other_user: conversation.other_user ? {
              ...conversation.other_user,
              // ✅ Preservar estado online
              online: currentOnlineUserIds.has(conversation.other_user.id),
              is_online: currentOnlineUserIds.has(conversation.other_user.id)
            } : prev.other_user
          }),
          messages: Array.isArray(messages) ? messages : []
        };
        
        // console.log(`✅ loadMessages: Updated chat - User ${updated.user?.id} online: ${updated.user?.online}`);
        return updated;
      });
    } catch (err) {
      // console.error("Error loading messages:", err);
    }
  };

  // Cargar más mensajes (páginas anteriores)
  const loadMoreMessages = async () => {
    if (!selectedChat || loadingMoreMessages || currentPage >= lastPage) return;
    
    setLoadingMoreMessages(true);
    const nextPage = currentPage + 1;
    
    try {
      // Guardar scroll position antes de cargar
      const container = messagesContainerRef.current;
      const previousScrollHeight = container?.scrollHeight || 0;
      
      const { data: olderMessages } = await ChatAPI.fetchMessages(selectedChat.id, nextPage);
      
      setCurrentPage(nextPage);
      
      setSelectedChat(prev => {
        if (!prev) return prev;
        
        // Agregar mensajes antiguos al inicio
        const existingMessages = prev.messages || [];
        const newMessages = [...olderMessages, ...existingMessages];
        
        return {
          ...prev,
          messages: newMessages
        };
      });
      
      // Restaurar posición de scroll después de agregar mensajes
      setTimeout(() => {
        if (container) {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop = newScrollHeight - previousScrollHeight;
        }
      }, 50);
      
    } catch (err) {
      // console.error("Error loading more messages:", err);
    } finally {
      setLoadingMoreMessages(false);
    }
  };

  // Manejar selección de chat
  const handleChatSelect = async (chat: Conversation) => {
    // Normalizar el user para compatibilidad con other_user del backend
    const normalizedChat: Conversation = {
      ...chat,
      user: chat.other_user ? {
        id: chat.other_user.id,
        name: (chat.other_user as any).full_name || chat.other_user.name,
        // ✅ Aplicar estado online desde WebSocket, no desde backend
        online: onlineUserIds.has(chat.other_user.id),
        avatar: (chat.other_user as any).avatar_url || chat.other_user.avatar,
        initials: getInitials((chat.other_user as any).full_name || chat.other_user.name || '')
      } : chat.user || {
        id: 0,
        name: 'Usuario',
        online: false,
        initials: '?'
      },
      messages: Array.isArray(chat.messages) ? chat.messages : []
    };
    
    // console.log(`💬 Chat selected - User ${normalizedChat.user.id} online: ${normalizedChat.user.online}`);
    setSelectedChat(normalizedChat);
    
    // Cargar mensajes si no están cargados
    if (!chat.messages || chat.messages.length === 0) {
      await loadMessages(chat.id);
    }
  };

  // Cambiar de tab
  const handleTabChange = (tab: "comprar" | "vender") => {
    setActiveTab(tab);
    setSelectedChat(null);
  };

  // Enviar mensaje
  const handleSendMessage = async () => {
    if ((!newMessage.trim() && !selectedFile) || !selectedChat) return;
    
    try {
      let attachmentUrl: string | undefined;
      let attachmentType: string | undefined;

       // Subir archivo si existe
      if (selectedFile) {
        // console.log('📤 Uploading file:', selectedFile.name);
        const uploadResult = await ChatAPI.uploadAttachment(selectedFile);
        attachmentUrl = uploadResult.url;
        attachmentType = uploadResult.type;
      }

      // Enviar mensaje
      // console.log('📤 Sending message...');
      const sentMessage = await ChatAPI.sendMessage(
        selectedChat.id,
        newMessage.trim(),
        attachmentUrl,
        attachmentType
      );
      // console.log('✅ Message sent:', sentMessage);
      // console.log('👤 Current user ID at send:', currentUserId);
      // console.log('👤 Sender ID from response:', sentMessage.sender_id);

      // El mensaje se agregará automáticamente cuando llegue por WebSocket
      // No es necesario agregarlo aquí para evitar duplicados

      // Actualizar preview en la lista
      setConversations(prev => prev.map(conv =>
        conv.id === selectedChat.id
          ? {
              ...conv,
              last_message_preview: sentMessage.message_text,
              last_message_at: sentMessage.created_at
            }
          : conv
      ));

      // Limpiar input
      setNewMessage("");
      setSelectedFile(null);
    } catch (err) {
      // console.error('❌ Error sending message:', err);
      alert('Error al enviar mensaje');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      // console.log('📎 PDF selected:', file.name);
      // Limpiar el input para permitir seleccionar el mismo archivo otra vez
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      alert('Por favor, selecciona solo archivos PDF');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Manejo de tecla ESC para deseleccionar chat
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedChat) {
        setSelectedChat(null);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [selectedChat]);

  return (
    <div className="space-y-4 pt-1">
      {/* Chat Interface */}
      <Card className="bg-white border-[rgba(0,0,0,0.15)] border-2 rounded-[16px]">
        <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] h-[calc(100vh-180px)] min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] overflow-hidden rounded-[14px]">
          {/* Messages List */}
          <div className={`${selectedChat ? 'hidden xl:flex' : 'flex'} flex-col h-full bg-white border-r border-[rgba(144,161,185,0.2)]`}>
            {/* Header */}
            <div className="p-4 pb-3 flex-shrink-0 border-b border-[rgba(144,161,185,0.1)]">
              <p className="font-['Poppins',sans-serif] text-[17px] text-black mb-3">
                Mensajes
              </p>

              {/* Tabs */}
              <div className="flex items-center gap-4 mb-3">
                <button
                  onClick={() => handleTabChange("comprar")}
                  className={`flex-1 font-['Poppins',sans-serif] text-[14px] py-2 px-3 rounded-[8px] transition-colors ${
                    activeTab === "comprar"
                      ? "bg-[#0047FF] text-white"
                      : "bg-[#F5F5F7] text-[#546A88]"
                  }`}
                >
                  Comprar
                </button>
                <button
                  onClick={() => handleTabChange("vender")}
                  className={`flex-1 font-['Poppins',sans-serif] text-[14px] py-2 px-3 rounded-[8px] transition-colors ${
                    activeTab === "vender"
                      ? "bg-[#0047FF] text-white"
                      : "bg-[#F5F5F7] text-[#546A88]"
                  }`}
                >
                  Vender
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-3">
                <div className="bg-[#F5F5F7] h-[40px] rounded-[8px] border border-[rgba(144,161,185,0.2)] flex items-center px-3">
                  <Search className="w-[16px] h-[16px] text-[#8E8E93] mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Buscar conversaciones..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 font-['Poppins',sans-serif] text-[13px] text-[#546A88] placeholder:text-[#8E8E93] bg-transparent border-none outline-none"
                  />
                </div>
              </div>

              {/* Filters with Expand/Collapse */}
              <div className="flex items-start gap-2">
                <div className={`flex items-center gap-2 flex-1 ${filtersExpanded ? 'flex-wrap' : 'overflow-hidden h-[40px] py-0.5'}`}>
                  {FILTER_TAGS.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => setActiveFilter(tag.value as ChatAPI.FilterType)}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-[6px] border transition-colors ${
                        activeFilter === tag.value
                          ? "bg-[#E8F0FE] border-[#0047FF] text-[#0047FF]"
                          : "bg-white border-[rgba(144,161,185,0.3)] text-[#546A88]"
                      }`}
                    >
                      <span className="font-['Poppins',sans-serif] text-[12px] whitespace-nowrap">
                        {tag.label}</span>
                    </button>
                  ))}
                </div>

                {/* Expand/Collapse Arrow */}
                <button
                  onClick={() => setFiltersExpanded(!filtersExpanded)}
                  className="flex-shrink-0 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  {filtersExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#546A88]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#546A88]" />
                  )}
                </button>
              </div>
            </div>

            {/* Chat List */}
            <ScrollArea className="flex-1">
              <div className="space-y-0">
                {loading ? (
                  <div className="flex items-center justify-center p-8">
                    <p className="font-['Poppins',sans-serif] text-[14px] text-[#8E8E93]">
                      Cargando conversaciones...
                    </p>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center p-8">
                    <p className="font-['Poppins',sans-serif] text-[14px] text-red-500">
                      {error}
                    </p>
                  </div>
                ) : conversations.length === 0 ? (
                  <div className="flex items-center justify-center p-8">
                    <p className="font-['Poppins',sans-serif] text-[14px] text-[#8E8E93]">
                      No hay conversaciones
                    </p>
                  </div>
                ) : (
                  conversations
                    .filter(chat => 
                      searchQuery === "" ||
                      chat.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      chat.listing.title.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => handleChatSelect(chat)}
                        className={`w-full p-4 flex items-start gap-3 transition-colors ${
                          selectedChat?.id === chat.id
                            ? "bg-[#E8F0FE]"
                            : "hover:bg-[#F5F5F7]"
                        }`}
                      >
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <Avatar className="w-[48px] h-[48px]">
                            <AvatarImage src={chat.user?.avatar || ''} alt={chat.user?.name || 'Usuario'} />
                            <AvatarFallback className="bg-[#0047FF] text-white font-['Poppins',sans-serif] text-[16px] font-medium">
                              {chat.user?.initials || '?'}
                            </AvatarFallback>
                          </Avatar>
                          {chat.user?.online && (
                            <div className="absolute bottom-0 right-0 w-[12px] h-[12px] bg-[#34C759] rounded-full border-2 border-white" />
                          )}
                          {chat.unread_count > 0 && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="font-['Poppins',sans-serif] text-xs text-white font-medium">
                                {chat.unread_count}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex-1 min-w-0">
                              <p className="font-['Poppins',sans-serif] text-[15px] text-black font-medium truncate">
                                {chat.user?.name || 'Usuario'}
                              </p>
                              <p className="font-['Poppins',sans-serif] text-[12px] text-[#8E8E93] truncate">
                                {chat.listing.title}
                              </p>
                            </div>
                            {chat.last_message_at && (
                              <span className="font-['Poppins',sans-serif] text-[11px] text-[#8E8E93] whitespace-nowrap ml-2 flex-shrink-0">
                                {new Date(chat.last_message_at).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            )}
                          </div>
                          <p className="font-['Poppins',sans-serif] text-[13px] text-[#546A88] overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                            {chat.last_message_preview}
                          </p>
                        </div>
                      </button>
                    ))
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Conversation */}
          {selectedChat ? (
            <div className="flex flex-col h-full bg-white overflow-hidden">
              {/* Chat Header */}
              <div className="p-3 md:p-5 border-b border-[rgba(144,161,185,0.15)] flex-shrink-0">
                <div className="flex items-center gap-2 md:gap-3">
                  {/* Back Button on Mobile */}
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="xl:hidden text-[#546A88] hover:text-black"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <Avatar className="w-[40px] h-[40px] md:w-[48px] md:h-[48px]">
                      <AvatarImage src={selectedChat.user?.avatar || ''} alt={selectedChat.user?.name || 'Usuario'} />
                      <AvatarFallback className="bg-[#0047FF] text-white font-['Poppins',sans-serif] text-[14px] md:text-[16px] font-medium">
                        {selectedChat.user?.initials || '?'}
                      </AvatarFallback>
                    </Avatar>
                    {selectedChat.user?.online && (
                      <div className="absolute top-0 right-0 w-[10px] h-[10px] md:w-[12px] md:h-[12px] bg-[#34C759] rounded-full border-2 border-white" />
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-['Poppins',sans-serif] text-[14px] md:text-[16px] lg:text-[17px] text-black font-medium truncate">
                      {selectedChat.user?.name || 'Usuario'}
                    </p>
                    <p className="font-['Poppins',sans-serif] text-[11px] md:text-[12px] lg:text-[13px] text-[#34C759]">
                      {selectedChat.user?.online ? "En línea" : "Desconectado"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Info Card */}
              <div className="p-2 mx-3 my-2 md:p-3 md:mx-4 md:my-3 lg:p-4 lg:m-5 bg-[#F5F5F7] rounded-[8px] md:rounded-[12px] flex items-center gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
                <img
                  src={selectedChat.listing.image}
                  alt={selectedChat.listing.title}
                  className="w-[50px] h-[50px] md:w-[55px] md:h-[55px] lg:w-[60px] lg:h-[60px] rounded-[6px] md:rounded-[8px] object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-['Poppins',sans-serif] text-[12px] md:text-[13px] lg:text-[14px] text-[#2E3A4B] mb-0.5 line-clamp-1">
                    {selectedChat.listing.title}
                  </p>
                  <p className="font-['Poppins',sans-serif] text-[14px] md:text-[15px] lg:text-[16px] text-[#0047FF] font-semibold">
                    {selectedChat.listing.price}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-hidden relative">
                <ScrollArea className="h-full px-3 md:px-4 lg:px-5 pb-3 md:pb-4" ref={messagesContainerRef}>
                {selectedChat.messages && selectedChat.messages.length > 0 ? (
                  <div className="space-y-2 md:space-y-3 pt-4">
                    {/* Botón Cargar más mensajes */}
                    {currentPage < lastPage && (
                      <div className="flex justify-center py-2">
                        <button
                          onClick={loadMoreMessages}
                          disabled={loadingMoreMessages}
                          className="px-4 py-2 text-sm font-['Poppins',sans-serif] text-[#0047FF] bg-white border border-[#E5E5EA] rounded-full hover:bg-[#F5F5F7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loadingMoreMessages ? 'Cargando...' : 'Cargar más mensajes'}
                        </button>
                      </div>
                    )}
                    
                    {selectedChat.messages.map((message) => {
                      const isOwnMessage = currentUserId !== null && message.sender_id === currentUserId;
                      return (
                        <div key={message.id} className="space-y-1">
                          <div
                            className={`flex ${
                              isOwnMessage ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[85%] md:max-w-[80%] rounded-[14px] md:rounded-[16px] px-3 py-2 md:px-4 md:py-3 ${
                                isOwnMessage
                                  ? "bg-[#0047FF] rounded-br-[4px]"
                                  : "bg-[#F5F5F7] rounded-bl-[4px]"
                              }`}
                            >
                              <p
                                className={`font-['Poppins',sans-serif] text-[13px] md:text-[14px] leading-[1.4] ${
                                  isOwnMessage ? "text-white" : "text-black"
                                }`}
                              >
                                {message.message_text}
                              </p>
                              {message.attachment_url && (
                                <div className="mt-2">
                                  <a 
                                    href={message.attachment_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 p-2 rounded-lg ${
                                      isOwnMessage ? 'bg-white/10' : 'bg-black/5'
                                    }`}
                                  >
                                    <FileText className="w-4 h-4" />
                                    <span className="text-xs">Archivo adjunto</span>
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                          <div
                            className={`flex items-center gap-1 ${
                              isOwnMessage ? "justify-end" : "justify-start"
                            }`}
                          >
                            <p className="font-['Poppins',sans-serif] text-[10px] md:text-[11px] text-[#8E8E93]">
                              {new Date(message.created_at).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {isOwnMessage && (
                              <div className="flex items-center">
                                {message.read_at ? (
                                  // Doble check azul para leído (como WhatsApp)
                                  <div className="flex -space-x-1">
                                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#0047FF]" strokeWidth={2.5} />
                                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#0047FF]" strokeWidth={2.5} />
                                  </div>
                                ) : (
                                  // Check gris para enviado pero no leído
                                  <div className="flex -space-x-1">
                                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#8E8E93]" strokeWidth={2.5} />
                                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#8E8E93]" strokeWidth={2.5} />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {/* Elemento invisible para hacer scroll al final */}
                    <div ref={messagesEndRef} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="font-['Poppins',sans-serif] text-[14px] text-[#8E8E93]">
                      No hay mensajes aún
                    </p>
                  </div>
                )}
                </ScrollArea>
              </div>

              {/* Message Input */}
              <div className="p-3 md:p-4 lg:p-5 flex flex-col gap-2 md:gap-3 flex-shrink-0 border-t border-[rgba(144,161,185,0.1)]">
                {/* File Preview */}
                {selectedFile && (
                  <div className="bg-[#F5F5F7] rounded-[8px] md:rounded-[12px] p-2 md:p-3 flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#0047FF] rounded-[6px] md:rounded-[8px] flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['Poppins',sans-serif] text-[12px] md:text-[13px] text-black font-medium truncate">
                        {selectedFile.name}
                      </p>
                      <p className="font-['Poppins',sans-serif] text-[10px] md:text-[11px] text-[#8E8E93]">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.05)] transition-colors flex-shrink-0"
                    >
                      <X className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#8E8E93]" />
                    </button>
                  </div>
                )}
                
                {/* Input Area */}
                <div className="flex items-center gap-2 md:gap-3">
                  {/* Input file oculto */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button 
                    onClick={handleFileButtonClick}
                    className="w-4 h-4 md:w-5 md:h-5 text-[#8E8E93] hover:text-black transition-colors flex-shrink-0"
                    title="Adjuntar PDF"
                  >
                    <Paperclip className="w-full h-full" />
                  </button>
                  <div className="flex-1 bg-[#F5F5F7] border border-[rgba(144,161,185,0.15)] rounded-[20px] px-3 py-2 md:px-4 md:py-3">
                    <input
                      type="text"
                      placeholder="Escribe un mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="w-full font-['Poppins',sans-serif] text-[13px] md:text-[14px] text-black placeholder:text-[#8E8E93] bg-transparent border-none outline-none"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() && !selectedFile}
                    className="w-[38px] h-[38px] md:w-[42px] md:h-[42px] lg:w-[44px] lg:h-[44px] bg-[#0047FF] rounded-full flex items-center justify-center hover:bg-[#0039CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send className="w-[16px] h-[16px] md:w-[17px] md:h-[17px] lg:w-[18px] lg:h-[18px] text-white" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden xl:flex flex-col items-center justify-center h-full bg-white">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-['Poppins',sans-serif] text-[16px] text-black font-medium mb-2">
                  Selecciona una conversación
                </h3>
                <p className="font-['Poppins',sans-serif] text-[13px] text-[#8E8E93]">
                  Elige un chat para comenzar a conversar
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
