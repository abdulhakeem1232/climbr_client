import React, { useState, useEffect, useRef } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import socket from '../../../utils/socket/Socket';
import { endpoints } from '../../../endpoints/userEndpoint';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/store';
import videocall from '../../../assets/videocall.png';
import Add from '../../../assets/add.png';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { toast } from 'sonner';
import { useWebRTC } from '../../../Context/WebRTCContext';
import { userAxios } from '../../../utils/Config';
import Chatbg from '../../../assets/chatbg.jpg'
interface Message {
    chatId: string;
    name: string;
    message?: string;
    sender: string;
    createdAt: string;
    filePath?: string;
    fileType?: string;
}

interface ChattingProps {
    chatId: string;
    avatar: string;
    username: string;
    id: string;
    lastlogged: string;
}

interface GroupedMessages {
    [date: string]: Message[];
}

function Chatting({ chatId, avatar, username, id, lastlogged }: ChattingProps) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showFileOptions, setShowFileOptions] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFileType, setSelectedFileType] = useState<string | null>(null);
    const userId: string | null = useSelector((store: RootState) => store.UserData.UserId);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { startCall } = useWebRTC()
    useEffect(() => {
        if (chatId) {
            const fetchMessages = async () => {
                try {
                    let response = await userAxios.get(`${endpoints.getMessages}/${chatId}`);
                    setMessages(response.data.chats);
                } catch (err) {
                    console.log(err, 'during fetchMessages');
                }
            };
            fetchMessages();
            socket.on('message', (message: Message) => {
                if (message.chatId == chatId) {
                    setMessages(prevMessages => [...prevMessages, message]);
                    if (message.sender !== userId) {
                        toast.success(`New message in Chats`);
                    }
                }
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

    const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let filePath = '';
        let fileType = '';
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('sender', userId || '');
            formData.append('chatId', chatId);
            try {
                const response = await userAxios.post(endpoints.sendFiles, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                filePath = response.data.filePath;
                fileType = response.data.fileType;
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
        if (selectedFile || message.trim() !== "") {
            socket.emit('sendMessage', { chatId, userId, message, filePath, fileType });
            console.log('ayachuuuuuuuuuuuuuuuuuuuuuu');

            setMessage('');
            setSelectedFile(null);
            setSelectedFileType(null);
        }
    };

    const handleFileChange = (files: FileList | null, fileType: string) => {
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
            setSelectedFileType(fileType);
        }
    };

    const handleEmojiSelect = (emoji: any) => {
        setMessage(prevMessage => prevMessage + emoji.native);
        setShowEmojiPicker(false);
    };

    const groupedMessages: GroupedMessages = messages.reduce((acc: GroupedMessages, message) => {
        const messageDate = format(new Date(message.createdAt), 'yyyy-MM-dd');
        if (!acc[messageDate]) {
            acc[messageDate] = [];
        }
        acc[messageDate].push(message);
        return acc;
    }, {});

    const getDateLabel = (date: string) => {
        const parsedDate = parseISO(date);
        if (isToday(parsedDate)) {
            return 'Today';
        } else if (isYesterday(parsedDate)) {
            return 'Yesterday';
        } else {
            return format(parsedDate, 'MMMM d, yyyy');
        }
    };

    const handleFileOptionClick = (fileType: string) => {
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        fileInput.accept = fileType === 'image' ? 'image/*' : fileType === 'video' ? 'video/*' : '*/*';
        fileInput.onchange = () => handleFileChange(fileInput.files, fileType);
        fileInput.click();
        setShowFileOptions(false);
    };

    return (
        <div className='flex flex-col h-full bg-gray-100 rounded-lg shadow-lg overflow-hidden'>
            <div className='flex items-center p-4 bg-white border-b'>
                <img
                    src={avatar}
                    alt={`${username}'s avatar`}
                    className='w-10 h-10 rounded-full mr-4 object-cover'
                />
                <div className='flex-grow'>
                    <h2 className='text-lg font-semibold'>{username}</h2>
                    <span className='text-sm text-gray-500'>{lastlogged}</span>
                </div>
                <img src={videocall} alt="" className='w-8 cursor-pointer' onClick={() => startCall(id)} />
            </div>
            <div className='flex-grow overflow-y-auto p-4' style={{ backgroundImage: `url(${Chatbg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {Object.keys(groupedMessages).map(date => (
                    <div key={date} className='mb-4'>
                        <div className='text-center text-sm text-gray-500 my-2'>
                            {getDateLabel(date)}
                        </div>
                        {groupedMessages[date].map((message: Message, index: number) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === userId ? 'justify-end' : 'justify-start'} mb-2`}
                            >
                                <div className={`rounded-lg p-3 max-w-xs lg:max-w-md ${message.sender === userId ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                                    {message.fileType?.startsWith('image/') && <img src={`${message.filePath}`} alt='sent image' className='max-w-full rounded-lg mb-2' />}
                                    {message.fileType?.startsWith('video/') && <video src={`${message.filePath}`} controls className='max-w-full rounded-lg mb-2'></video>}
                                    {message.fileType && !message.fileType.startsWith('image/') && !message.fileType.startsWith('video/') && (
                                        <a href={`${message.filePath}`} download className='text-blue-300 underline'>
                                            Download file
                                        </a>
                                    )}
                                    <p>{message.message}</p>
                                    <div className="text-xs opacity-75 mt-1">
                                        {format(new Date(message.createdAt), 'HH:mm')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className='flex items-center p-4 bg-white'>
                <div className='relative mr-2'>
                    <button type='button' onClick={() => setShowFileOptions(!showFileOptions)} className='p-2 bg-gray-200 text-gray-800 rounded-full'>
                        <img src={Add} alt="" className='w-6' />
                    </button>
                    {showFileOptions && (
                        <div className='absolute bottom-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg'>
                            <button type='button' onClick={() => handleFileOptionClick('image')} className='block w-full text-left px-4 py-2 hover:bg-gray-100'>
                                Image
                            </button>
                            <button type='button' onClick={() => handleFileOptionClick('video')} className='block w-full text-left px-4 py-2 hover:bg-gray-100'>
                                Video
                            </button>
                            <button type='button' onClick={() => handleFileOptionClick('file')} className='block w-full text-left px-4 py-2 hover:bg-gray-100'>
                                Documents
                            </button>
                        </div>
                    )}
                </div>
                <input type='file' className='hidden' id='file-input' />
                <button type='button' onClick={() => setShowEmojiPicker(!showEmojiPicker)} className='p-2 bg-gray-200 text-gray-800 rounded-full mr-2'>
                    😊
                </button>
                {showEmojiPicker && (
                    <div className='absolute bottom-16 right-4'>
                        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                    </div>
                )}
                <input
                    type='text'
                    value={message}
                    placeholder='Type a message...'
                    onChange={(event) => setMessage(event.target.value)}
                    className='flex-grow p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button type='submit' className='ml-2 p-2 bg-blue-500 text-white rounded-full'>
                    Send
                </button>
            </form>
        </div>
    );
}

export default Chatting;
