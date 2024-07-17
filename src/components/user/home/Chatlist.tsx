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
        <div className='chat-list-container mr-1 rounded-lg w-2/5 shadow-lg bg-white min-h-screen'>
            <h2 className='chat-list-title'>Chats</h2>
            <div className='chat-list'>
                {chats?.map((chat: any) => {
                    const isOnline = onlineUsers.has(chat.user._id);
                    const lastLoggedTime = chat.user.lastLogged ? new Date(chat.user.lastLogged) : null;
                    const lastlogged = isOnline ? 'online' : (lastLoggedTime ? formatDistanceToNow(lastLoggedTime, { addSuffix: true }) : 'offline');


                    return (
                        <div key={chat._id} className='mb-1  hover:bg-gray-200'>
                            <div
                                onClick={() => onSelectChat(chat._id, chat.user.avatar, chat.user.username, chat.user._id, lastlogged)}
                                className='chat-item cursor-pointer flex items-center p-2 rounded-lg'
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
                            <p className='text-left ml-16 -mt-5'>
                                {chat.lastMessage ? (chat.lastMessage.fileType ? chat.lastMessage.fileType : chat.lastMessage.message) : 'No messages yet'}
                            </p>
                            <hr className="" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Chatlist;
