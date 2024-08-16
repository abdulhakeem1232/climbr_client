import React, { useState } from 'react';
import Chatlist from '../../components/user/home/Chatlist';
import Chatting from '../../components/user/home/Chatting';
import Nav from '../../components/user/home/nav';
import { Toaster } from 'sonner';

interface ChatDetails {
    chatId: string;
    avatar: string;
    username: string;
    id: string;
    lastlogged: string;
}

function Message() {
    const [selectedChat, setSelectedChat] = useState<ChatDetails | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSelectChat = (chatId: string, avatar: string, username: string, id: string, lastlogged: string) => {
        setSelectedChat({ chatId, avatar, username, id, lastlogged });
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Nav />
            <div className="flex-grow flex overflow-hidden">
                <div className={`md:w-1/3 lg:w-1/4 bg-white shadow-md ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
                    <Chatlist onSelectChat={handleSelectChat} />
                </div>
                <div className="flex-grow flex flex-col md:ml-4">
                    {selectedChat ? (
                        <Chatting
                            chatId={selectedChat.chatId}
                            avatar={selectedChat.avatar}
                            username={selectedChat.username}
                            id={selectedChat.id}
                            lastlogged={selectedChat.lastlogged}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-md">
                            <p className="text-gray-500">Select a chat to start messaging</p>
                        </div>
                    )}
                </div>
            </div>
            <button
                className="md:hidden fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? 'Close' : 'Chats'}
            </button>
            <Toaster position="top-right" />
        </div>
    );
}

export default Message;
