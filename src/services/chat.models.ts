

export interface ChatMessage {
    sender: string;
    message: string;
    ts: number;
}


export interface ChatChannel {
    id: string;
    name: string;
    messages: ChatMessage[];
}