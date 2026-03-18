"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Search, Send, Paperclip, Check, ChevronDown, ChevronUp, X, FileText } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

// Tipos
interface Message {
  id: number;
  sender_id: number;
  content: string;
  timestamp: string;
  is_read: boolean;
}

interface Chat {
  id: number;
  user: {
    id: number;
    name: string;
    initials: string;
    online: boolean;
  };
  listing: {
    id: number;
    title: string;
    price: string;
    image: string;
  };
  last_message: string;
  last_message_time: string;
  unread_count: number;
  messages: Message[];
}

// Mock data - Chats de COMPRA (cuando yo estoy comprando)
const BUY_CHATS: Chat[] = [
  {
    id: 1,
    user: {
      id: 2,
      name: "Carlos Méndez",
      initials: "CM",
      online: true
    },
    listing: {
      id: 101,
      title: "Rolex Submariner 2022",
      price: "S/ 45,000",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100"
    },
    last_message: "¿Cuándo podemos coordinar la entrega?",
    last_message_time: "Hace 1h",
    unread_count: 0,
    messages: [
      {
        id: 1,
        sender_id: 1,
        content: "Hola, me interesa tu Rolex. ¿Está disponible aún?",
        timestamp: "03:00 p.m.",
        is_read: true
      },
      {
        id: 2,
        sender_id: 2,
        content: "¡Hola! Sí, está disponible. ¿Te gustaría hacer una oferta?",
        timestamp: "03:15 p.m.",
        is_read: true
      },
      {
        id: 3,
        sender_id: 1,
        content: "Me gustaría ofrecerte S/ 42,000. ¿Qué te parece?",
        timestamp: "03:30 p.m.",
        is_read: true
      },
      {
        id: 4,
        sender_id: 2,
        content: "Gracias por tu oferta. Mi precio mínimo es S/ 44,000. Es un precio justo considerando que tiene solo 6 meses de uso.",
        timestamp: "04:00 p.m.",
        is_read: true
      },
      {
        id: 5,
        sender_id: 1,
        content: "Me parece bien. Acepto S/ 44,000. ¿Cuándo podemos coordinar la entrega?",
        timestamp: "04:30 p.m.",
        is_read: false
      }
    ]
  },
  {
    id: 2,
    user: {
      id: 3,
      name: "María Gonzáles",
      initials: "MG",
      online: false
    },
    listing: {
      id: 102,
      title: "MacBook Pro M3 Max 16\"",
      price: "S/ 10,999",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100"
    },
    last_message: "¿Incluye cargador original?",
    last_message_time: "Ayer",
    unread_count: 0,
    messages: []
  },
  {
    id: 3,
    user: {
      id: 4,
      name: "Jorge Ramírez",
      initials: "JR",
      online: true
    },
    listing: {
      id: 103,
      title: "Nintendo 64 Gold Edition",
      price: "S/ 3,200",
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=100"
    },
    last_message: "¡Genial! Te espero mañana entonces",
    last_message_time: "Hace 2h",
    unread_count: 0,
    messages: []
  }
];

// Mock data - Chats de VENTA (cuando yo estoy vendiendo)
const SELL_CHATS: Chat[] = [
  {
    id: 101,
    user: {
      id: 10,
      name: "Luis Torres",
      initials: "LT",
      online: true
    },
    listing: {
      id: 201,
      title: "Collar de Diamantes 18K",
      price: "S/ 28,500",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100"
    },
    last_message: "¿Aceptas S/ 26,000?",
    last_message_time: "Hace 30m",
    unread_count: 2,
    messages: [
      {
        id: 1,
        sender_id: 10,
        content: "Hola, me interesa tu collar de diamantes. ¿Tienes certificado de autenticidad?",
        timestamp: "02:00 p.m.",
        is_read: true
      },
      {
        id: 2,
        sender_id: 1,
        content: "Sí, viene con certificado GIA completo y caja original.",
        timestamp: "02:15 p.m.",
        is_read: true
      },
      {
        id: 3,
        sender_id: 10,
        content: "Perfecto. ¿Aceptas S/ 26,000?",
        timestamp: "02:30 p.m.",
        is_read: false
      }
    ]
  },
  {
    id: 102,
    user: {
      id: 11,
      name: "Patricia Ramos",
      initials: "PR",
      online: false
    },
    listing: {
      id: 202,
      title: "Apple Watch Ultra 2 Titanio",
      price: "S/ 3,899",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100"
    },
    last_message: "¿Está en garantía todavía?",
    last_message_time: "Hace 3h",
    unread_count: 1,
    messages: []
  },
  {
    id: 103,
    user: {
      id: 12,
      name: "Roberto Silva",
      initials: "RS",
      online: true
    },
    listing: {
      id: 203,
      title: "Leica M11 Edición Especial",
      price: "S/ 35,500",
      image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=100"
    },
    last_message: "Me interesa, ¿podemos vernos?",
    last_message_time: "Ayer",
    unread_count: 0,
    messages: []
  }
];

const FILTER_TAGS = [
  { id: "all", label: "Todo", active: true },
  { id: "pending_payment", label: "Pago pendiente", active: false },
  { id: "paid", label: "Pagado", active: false },
  { id: "pending_shipping", label: "Envío pendiente", active: false },
  { id: "shipped", label: "Enviado", active: false },
  { id: "cod", label: "Pago contra entrega", active: false }
];

export default function ChatsPanel() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [activeFilter, setActiveFilter] = useState("all");
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUserId = 1;

  // Cambiar chats al cambiar de tab
  const currentChats = activeTab === "buy" ? BUY_CHATS : SELL_CHATS;

  // Resetear chat seleccionado al cambiar de tab
  const handleTabChange = (tab: "buy" | "sell") => {
    setActiveTab(tab);
    setSelectedChat(null);
  };

  const handleSendMessage = () => {
    if ((!newMessage.trim() && !selectedFile) || !selectedChat) return;
    
    if (selectedFile) {
      console.log('Enviando PDF:', selectedFile.name);
      console.log('Con mensaje:', newMessage);
      // Aquí puedes agregar la lógica para enviar el archivo junto con el mensaje
      // Por ejemplo: uploadFileWithMessage(selectedFile, newMessage)
    } else {
      console.log('Enviando mensaje:', newMessage);
    }
    
    setNewMessage("");
    setSelectedFile(null);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      console.log('PDF seleccionado:', file.name);
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
                  onClick={() => handleTabChange("buy")}
                  className={`flex-1 font-['Poppins',sans-serif] text-[14px] py-2 px-3 rounded-[8px] transition-colors ${
                    activeTab === "buy"
                      ? "bg-[#0047FF] text-white"
                      : "bg-[#F5F5F7] text-[#546A88]"
                  }`}
                >
                  Comprar
                </button>
                <button
                  onClick={() => handleTabChange("sell")}
                  className={`flex-1 font-['Poppins',sans-serif] text-[14px] py-2 px-3 rounded-[8px] transition-colors ${
                    activeTab === "sell"
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
                      onClick={() => setActiveFilter(tag.id)}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-[6px] border transition-colors ${
                        activeFilter === tag.id
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
                {currentChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`w-full p-4 flex items-start gap-3 transition-colors ${
                      selectedChat?.id === chat.id
                        ? "bg-[#E8F0FE]"
                        : "hover:bg-[#F5F5F7]"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-[48px] h-[48px] bg-[#0047FF] rounded-full flex items-center justify-center">
                        <span className="font-['Poppins',sans-serif] text-[16px] text-white font-medium">
                          {chat.user.initials}
                        </span>
                      </div>
                      {chat.user.online && (
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
                            {chat.user.name}
                          </p>
                          <p className="font-['Poppins',sans-serif] text-[12px] text-[#8E8E93] truncate">
                            {chat.listing.title}
                          </p>
                        </div>
                        {chat.last_message_time && (
                          <span className="font-['Poppins',sans-serif] text-[11px] text-[#8E8E93] whitespace-nowrap ml-2 flex-shrink-0">
                            {chat.last_message_time}
                          </span>
                        )}
                      </div>
                      <p className="font-['Poppins',sans-serif] text-[13px] text-[#546A88] truncate">
                        {chat.last_message}
                      </p>
                    </div>
                  </button>
                ))}
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
                    <div className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] bg-[#0047FF] rounded-full flex items-center justify-center">
                      <span className="font-['Poppins',sans-serif] text-[14px] md:text-[16px] text-white font-medium">
                        {selectedChat.user.initials}
                      </span>
                    </div>
                    {selectedChat.user.online && (
                      <div className="absolute top-0 right-0 w-[10px] h-[10px] md:w-[12px] md:h-[12px] bg-[#34C759] rounded-full border-2 border-white" />
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-['Poppins',sans-serif] text-[14px] md:text-[16px] lg:text-[17px] text-black font-medium truncate">
                      {selectedChat.user.name}
                    </p>
                    <p className="font-['Poppins',sans-serif] text-[11px] md:text-[12px] lg:text-[13px] text-[#34C759]">
                      {selectedChat.user.online ? "En línea" : "Desconectado"}
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
                <ScrollArea className="h-full px-3 md:px-4 lg:px-5 pb-3 md:pb-4">
                {selectedChat.messages.length > 0 ? (
                  <div className="space-y-2 md:space-y-3">
                    {selectedChat.messages.map((message) => {
                      const isOwnMessage = message.sender_id === currentUserId;
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
                                {message.content}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`flex items-center gap-1 ${
                              isOwnMessage ? "justify-end" : "justify-start"
                            }`}
                          >
                            <p className="font-['Poppins',sans-serif] text-[10px] md:text-[11px] text-[#8E8E93]">
                              {message.timestamp}
                            </p>
                            {isOwnMessage && (
                              <div className="flex items-center">
                                {message.is_read ? (
                                  // Doble check para leído
                                  <div className="flex -space-x-1">
                                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#34C759]" strokeWidth={2.5} />
                                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#34C759]" strokeWidth={2.5} />
                                  </div>
                                ) : (
                                  // Un solo check para enviado
                                  <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#8E8E93]" strokeWidth={2.5} />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
