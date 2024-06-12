import React, { useState, useEffect, useRef } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import socket from '../../../utils/socket/Socket';
import { userAxios, endpoints } from '../../../endpoints/userEndpoint';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/store';
import videocall from '../../../assets/videocall.png';

interface Message {
    name: string;
    message: string;
    sender: string;
    createdAt: string;
}

interface ChattingProps {
    chatId: string;
    avatar: string;
    username: string;
    id: string;
}

function Chatting({ chatId, avatar, username, id }: ChattingProps) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isOnline, setIsOnline] = useState(false);

    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatId) {
            const fetchMessages = async () => {
                try {
                    let response = await userAxios.get(`${endpoints.getMessages}/${chatId}`);
                    setMessages(response.data.chats);
                    console.log(response.data, '----------');
                } catch (err) {
                    console.log(err, 'during fetchMessages');
                }
            };
            fetchMessages();

            socket.on('message', (message: Message) => {
                console.log("New Message Received", message);
                setMessages(prevMessages => [...prevMessages, message]);
            });

            return () => {
                socket.off('message');
            };
        }
    }, [chatId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        socket.emit('sendMessage', { chatId, userId, message });
        setMessage('');
    };

    const handleFileChange = (files: FileList | null) => {
    };

    const handleEmojiSelect = (emoji: any) => {
        setMessage(prevMessage => prevMessage + emoji.native);
        setShowEmojiPicker(false);
    };

    return (
        <div className='flex flex-col min-h-screen max-h-screen p-4 shadow-lg rounded-lg w-full bg-white'>
            <div className='flex items-center mb-4 bg-gray-100 p-2 rounded-lg'>
                <img
                    src={avatar}
                    alt={`${username}'s avatar`}
                    className='w-10 h-10 rounded-full mr-4'
                />
                <h2 className='text-xl font-bold'>{username}</h2>
                <img src={videocall} alt="" className='w-8 ml-auto mr-2 cursor-pointer' />
            </div>
            <ul className='flex-1 p-4 list-none m-0 overflow-y-scroll no-scrollbar'>
                {messages?.map((message: Message, index) => (
                    <li
                        key={index}
                        className={`mb-2 p-2 rounded-lg break-words ${message.sender === userId ? 'ml-auto' : 'mr-auto'} ${message.sender === userId ? 'bg-blue-100 self-end text-right' : 'bg-green-100 self-start text-left'} max-w-max`}
                    >
                        {message.message}
                    </li>
                ))}
                <div ref={messagesEndRef} />
            </ul>
            <form onSubmit={sendMessage} className='flex p-4 bg-white border-t border-gray-300 relative'>
                <input
                    type='text'
                    value={message}
                    placeholder='Your message'
                    onChange={(event) => setMessage(event.target.value)}
                    className='flex-1 p-2 mr-2 border border-gray-300 rounded'
                />
                <button type='button' onClick={() => setShowEmojiPicker(!showEmojiPicker)} className='p-2 bg-gray-200 text-gray-800 rounded'>
                    😊
                </button>
                {showEmojiPicker && (
                    <div className='absolute bottom-16 right-2'>
                        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                    </div>
                )}
                <input
                    type='file'
                    accept='image/*'
                    onChange={(event) => handleFileChange(event.target.files)}
                    className='hidden'
                />
                <button type='submit' className='p-2 bg-blue-500 text-white rounded'>Send</button>
            </form>
        </div>
    );
}

export default Chatting;
