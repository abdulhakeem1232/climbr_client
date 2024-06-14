import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/store';
import { userAxios, endpoints } from '../../../endpoints/userEndpoint';
import socket from '../../../utils/socket/Socket';
import { formatDistanceToNow } from 'date-fns';

interface ChatlistProps {
    onSelectChat: (chatId: string, avatar: string, username: string, id: string, lastlogged: string) => void;
}

function Chatlist({ onSelectChat }: ChatlistProps) {
    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState(new Set<string>());

    useEffect(() => {
        const getChats = async () => {
            try {
                let response = await userAxios.get(`${endpoints.getChatlist}/${userId}`);
                console.log(response.data);
                setChats(response.data);
            } catch (err) {
                console.log(err, 'during chatlist');
            }
        };
        getChats();
        socket.on('onlineUsers', (users: string[]) => {
            setOnlineUsers(new Set(users));
        });
        socket.emit('getOnlineUsers');
        return () => {
            socket.off('onlineUsers');
        };

    }, [userId]);

    return (
        <div className='chat-list-container mr-1 rounded-lg w-2/5 shadow-lg bg-white min-h-screen'>
            <h2 className='chat-list-title'>Chats</h2>
            <div className='chat-list'>
                {chats?.map((chat: any) => {
                    const isOnline = onlineUsers.has(chat.user._id);
                    const lastlogged = isOnline ? 'online' : formatDistanceToNow(new Date(chat.user.lastLogged), { addSuffix: true });

                    return (
                        <div key={chat._id} className='mb-1 '>
                            <div
                                onClick={() => onSelectChat(chat._id, chat.user.avatar, chat.user.username, chat.user._id, lastlogged)}
                                className='chat-item cursor-pointer flex items-center p-2 hover:bg-gray-200 rounded-lg'
                            >
                                <img
                                    src={chat.user.avatar}
                                    alt={`${chat.user.username}'s avatar`}
                                    className='chat-item-avatar w-10 h-10 rounded-full mr-4'
                                />
                                <span className='chat-item-username'>{chat.user.username}</span>
                                <span className={`ml-auto ${isOnline ? 'text-green-500' : 'text-gray-500'}`}>
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                            </div>
                            <hr className="" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Chatlist;