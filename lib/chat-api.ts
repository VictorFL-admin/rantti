// API client para funcionalidades de chat
import { getApiUrl } from './api-config';

// Función helper para obtener headers de autenticación
const getAuthHeaders = (): HeadersInit => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Tipos TypeScript
export interface User {
  id: number;
  name: string;
  initials: string;
  online: boolean;
  avatar?: string;
}

export interface Listing {
  id: number;
  title: string;
  title_short?: string; // Título truncado del backend
  price: number;
  currency?: string;
  image?: string; // URL de la imagen principal
  images?: Array<{ id: number; url: string; thumbnail_url?: string; is_primary: boolean; order: number }>;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  message_text: string;
  attachment_url?: string;
  attachment_type?: string;
  read_at?: string;
  created_at: string;
}

export interface Conversation {
  id: number;
  listing_id: number;
  buyer_id: number;
  seller_id: number;
  last_message_at: string;
  last_message_preview: string;
  unread_count: number;
  user: User; // El otro usuario (comprador o vendedor según contexto)
  other_user?: User; // Alias alternativo del otro usuario (para compatibilidad con backend)
  listing: Listing;
  messages?: Message[];
}

export type ChatType = 'comprar' | 'vender';
export type FilterType = 'todo' | 'pago_pendiente' | 'pagado' | 'envio_pendiente' | 'enviado' | 'pago_contra_entrega';

// 1. Obtener lista de conversaciones
export const fetchConversations = async (type: ChatType, filter?: FilterType): Promise<Conversation[]> => {
  try {
    const params = new URLSearchParams({ type });
    if (filter && filter !== 'todo') {
      params.append('filter', filter);
    }

    const response = await fetch(getApiUrl(`/api/conversations?${params.toString()}`), {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('❌ Error fetching conversations:', error);
    throw error;
  }
};

// 2. Crear o recuperar conversación
export const createOrGetConversation = async (listingId: number, otherUserId: number): Promise<Conversation> => {
  try {
    const response = await fetch(getApiUrl('/api/conversations'), {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        listing_id: listingId,
        other_user_id: otherUserId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('❌ Error creating/getting conversation:', error);
    throw error;
  }
};

// 3. Obtener mensajes de una conversación
export const fetchMessages = async (conversationId: number, page: number = 1): Promise<{ data: Message[]; conversation: Conversation; last_page: number }> => {
  try {
    const response = await fetch(getApiUrl(`/api/conversations/${conversationId}/messages?page=${page}`), {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Backend devuelve: { success: true, data: { conversation: {...}, messages: [...] } }
    const messages = result.data?.messages || [];
    const conversation = result.data?.conversation || null;
    
    // Normalizar el objeto conversation para compatibilidad
    if (conversation && conversation.other_user) {
      conversation.user = {
        ...conversation.other_user,
        name: conversation.other_user.full_name,
        online: conversation.other_user.is_online,
        avatar: conversation.other_user.avatar_url,
        initials: getInitials(conversation.other_user.full_name)
      };
    }
    
    return {
      data: messages,
      conversation: conversation,
      last_page: result.last_page || 1,
    };
  } catch (error) {
    console.error('❌ Error fetching messages:', error);
    throw error;
  }
};

// Helper function para generar iniciales
function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

// 4. Enviar mensaje
export const sendMessage = async (
  conversationId: number,
  messageText: string,
  attachmentUrl?: string,
  attachmentType?: string
): Promise<Message> => {
  try {
    const response = await fetch(getApiUrl('/api/messages'), {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        conversation_id: conversationId,
        message_text: messageText,
        ...(attachmentUrl && { attachment_url: attachmentUrl }),
        ...(attachmentType && { attachment_type: attachmentType }),
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('❌ Error sending message:', error);
    throw error;
  }
};

// 5. Marcar mensaje como leído
export const markMessageAsRead = async (messageId: number): Promise<void> => {
  try {
    const response = await fetch(getApiUrl(`/api/messages/${messageId}/mark-read`), {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('❌ Error marking message as read:', error);
    throw error;
  }
};

// 6. Marcar todos los mensajes de una conversación como leídos
export const markAllMessagesAsRead = async (conversationId: number): Promise<void> => {
  try {
    const response = await fetch(getApiUrl(`/api/conversations/${conversationId}/mark-all-read`), {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('❌ Error marking all messages as read:', error);
    throw error;
  }
};

// 7. Subir archivo adjunto (si necesitas upload de archivos)
export const uploadAttachment = async (file: File): Promise<{ url: string; type: string }> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    const response = await fetch(getApiUrl('/api/attachments/upload'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      url: data.url,
      type: data.type,
    };
  } catch (error) {
    console.error('❌ Error uploading attachment:', error);
    throw error;
  }
};
