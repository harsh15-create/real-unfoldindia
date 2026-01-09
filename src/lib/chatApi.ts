
import { supabase } from '@/lib/supabaseClient';

export interface ChatMessage {
    id: string;
    conversation_id: string;
    user_id: string;
    message_content: string;
    message_type: 'user' | 'assistant';
    timestamp: string;
    is_exported?: boolean;
}

export interface ChatSession {
    id: string; // This is the conversation_id
    title: string;
    date: Date;
    preview: string;
}

// Fetch all distinct conversations for the user
// Since we don't have a conversations table, we fetch messages and group them.
// Note: This is not consistent with massive scale but works for individual user history.
export const fetchUserSessions = async (userId: string): Promise<ChatSession[]> => {
    const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching chat sessions:', error);
        return [];
    }

    if (!data) return [];

    const sessionsMap = new Map<string, ChatSession>();

    // Iterate through messages. Since they are ordered by desc timestamp, 
    // the first time we see a conversation_id, it's the latest message (for preview).
    // We also need to find the "first" message of the conversation for the title, 
    // which in this reverse order will be the LAST one we process for that ID? 
    // Actually, getting a good title might require scanning. 
    // Let's stick to using the latest message for preview and maybe "New Chat" or first available user msg for title.

    // Better approach: Group by ID.
    const groups: { [key: string]: ChatMessage[] } = {};
    data.forEach((msg: any) => {
        if (!groups[msg.conversation_id]) {
            groups[msg.conversation_id] = [];
        }
        groups[msg.conversation_id].push(msg);
    });

    const sessions: ChatSession[] = Object.keys(groups).map(conversationId => {
        const msgs = groups[conversationId];
        // Sort msgs by timestamp asc to find first and last
        msgs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        const firstMsg = msgs[0];
        const lastMsg = msgs[msgs.length - 1];

        // Find first user message for title
        const firstUserMsg = msgs.find(m => m.message_type === 'user');

        let title = 'New Conversation';
        if (firstUserMsg) {
            title = firstUserMsg.message_content.slice(0, 30) + (firstUserMsg.message_content.length > 30 ? '...' : '');
        }

        return {
            id: conversationId,
            title: title,
            date: new Date(lastMsg.timestamp),
            preview: lastMsg.message_content.slice(0, 50) + (lastMsg.message_content.length > 50 ? '...' : '')
        };
    });

    // Sort sessions by date desc
    sessions.sort((a, b) => b.date.getTime() - a.date.getTime());

    return sessions;
};

export const fetchMessages = async (conversationId: string): Promise<ChatMessage[]> => {
    const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('timestamp', { ascending: true });

    if (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }

    return data as ChatMessage[];
};

export const sendMessage = async (
    userId: string,
    conversationId: string,
    content: string,
    type: 'user' | 'assistant'
): Promise<ChatMessage | null> => {
    const { data, error } = await supabase
        .from('chat_messages')
        .insert([
            {
                user_id: userId,
                conversation_id: conversationId,
                message_content: content,
                message_type: type,
                timestamp: new Date().toISOString()
            }
        ])
        .select()
        .single();

    if (error) {
        console.error(`Error sending ${type} message:`, error);
        throw error;
    }

    return data as ChatMessage;
};

export const deleteSession = async (conversationId: string) => {
    const { error } = await supabase
        .from('chat_messages')
        .delete()
        .eq('conversation_id', conversationId);

    if (error) {
        console.error('Error deleting session:', error);
        throw error;
    }
};

export const deleteAllUserChats = async (userId: string) => {
    const { error } = await supabase
        .from('chat_messages')
        .delete()
        .eq('user_id', userId);

    if (error) {
        console.error('Error deleting all chats:', error);
        throw error;
    }
};
