import React, { useState } from 'react';
import Chatlist from '../../components/user/home/Chatlist';
import Chatting from '../../components/user/home/Chatting';
import Nav from '../../components/user/home/nav';

interface ChatDetails {
    chatId: string;
    avatar: string;
    username: string;
}

function Message() {
    const [selectedChat, setSelectedChat] = useState<ChatDetails | null>(null);

    const handleSelectChat = (chatId: string, avatar: string, username: string) => {
        setSelectedChat({ chatId, avatar, username });
    };

    return (
        <div>
            <div>
                <Nav />
            </div>
            < div className='flex  justify-start px-1 md:px-28 lg:px-60 mt-2 bg-gray-50' >
                <Chatlist onSelectChat={handleSelectChat} />
                {selectedChat && <Chatting chatId={selectedChat.chatId} avatar={selectedChat.avatar} username={selectedChat.username} />}
            </div >
        </div>
    );
}

export default Message;
