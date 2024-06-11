import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/store';
import { userAxios, endpoints } from '../../../endpoints/userEndpoint';

interface ChatlistProps {
    onSelectChat: (chatId: string, avatar: string, username: string) => void;
}

function Chatlist({ onSelectChat }: ChatlistProps) {
    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const [chats, setChats] = useState([]);

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
    }, [userId]);

    return (
        <div className='chat-list-container mr-1 rounded-lg w-2/5 shadow-lg bg-white min-h-screen'>
            <h2 className='chat-list-title'>Chats</h2>
            <div className='chat-list'>
                {chats?.map((chat: any) => (
                    <div key={chat._id} className='mb-1 '>
                        <div
                            onClick={() => onSelectChat(chat._id, chat.user.avatar, chat.user.username)}
                            className='chat-item cursor-pointer flex items-center p-2 hover:bg-gray-200 rounded-lg'
                        >
                            <img
                                src={chat.user.avatar}
                                alt={`${chat.user.username}'s avatar`}
                                className='chat-item-avatar w-10 h-10 rounded-full mr-4'
                            />
                            <span className='chat-item-username'>{chat.user.username}</span>
                        </div>
                        <hr className="" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Chatlist;
