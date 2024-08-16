import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/store';
import { endpoints } from '../../../endpoints/userEndpoint';
import socket from '../../../utils/socket/Socket';
import { formatDistanceToNow } from 'date-fns';
import { userAxios } from '../../../utils/Config';

interface ChatlistProps {
    onSelectChat: (chatId: string, avatar: string, username: string, id: string, lastlogged: string) => void;
}

function Chatlist({ onSelectChat }: ChatlistProps) {
    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const [chats, setChats] = useState<any[]>([]);
    const [onlineUsers, setOnlineUsers] = useState(new Set<string>());

    useEffect(() => {
        const getChats = async () => {
            try {
                let response = await userAxios.get(`${endpoints.getChatlist}/${userId}`);
                console.log('-------------', response.data);

                const sortedChats = response.data.sort((a: any, b: any) => {
                    const updatedAtA = new Date(a.updatedAt).getTime();
                    const updatedAtB = new Date(b.updatedAt).getTime();
                    return updatedAtB - updatedAtA;
                });
                setChats(sortedChats);
            } catch (err) {
                console.log(err, 'during chatlist');
            }
        };

        getChats();

        socket.on('onlineUsers', (users: string[]) => {
            setOnlineUsers(new Set(users));
        });

        socket.on('sortChatlist', (message) => {
            const { chatId, message: newMessage, fileType } = message;
            console.log(message, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            console.log(fileType == "" ? "newMessage" : "fileType");

            setChats((prevChats: any) => {
                const updatedChats = prevChats.map((chat: any) => {
                    if (chat._id == chatId) {
                        return {
                            ...chat,
                            updatedAt: new Date(),
                            lastMessage: {
                                ...chat.lastMessage,
                                message: fileType === "" ? newMessage : fileType
                            }
                        }
                    }
                    return chat;
                }).sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
                return updatedChats;
            });
        });

        socket.emit('getOnlineUsers');

        return () => {
            socket.off('onlineUsers');
            socket.off('sortChatlist');
        };
    }, [userId]);

    return (
        <div className='h-full flex flex-col bg-gray-50'>
            <h2 className='text-2xl font-bold p-4 bg-blue-500 text-white'>Chats</h2>
            <div className='flex-grow overflow-y-auto'>
                {chats?.map((chat: any) => {
                    const isOnline = onlineUsers.has(chat.user._id);
                    const lastLoggedTime = chat.user.lastLogged ? new Date(chat.user.lastLogged) : null;
                    const lastlogged = isOnline ? 'online' : (lastLoggedTime ? formatDistanceToNow(lastLoggedTime, { addSuffix: true }) : 'offline');

                    return (
                        <div key={chat._id} className='hover:bg-gray-100 transition-colors duration-200'>
                            <div
                                onClick={() => onSelectChat(chat._id, chat.user.avatar, chat.user.username, chat.user._id, lastlogged)}
                                className='flex items-center p-4 cursor-pointer border-b border-gray-200'
                            >
                                <div className='relative'>
                                    <img
                                        src={chat.user.avatar}
                                        alt={`${chat.user.username}'s avatar`}
                                        className='w-12 h-12 rounded-full mr-4 object-cover'
                                    />
                                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                </div>
                                <div className='flex-grow'>
                                    <h3 className='font-semibold'>{chat.user.username}</h3>
                                    <p className='text-sm text-gray-600 truncate'>
                                        {chat.lastMessage ? (chat.lastMessage.fileType ? chat.lastMessage.fileType : chat.lastMessage.message) : 'No messages yet'}
                                    </p>
                                </div>
                                <span className='text-xs text-gray-500'>
                                    {isOnline ? 'Online' : lastlogged}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Chatlist;
