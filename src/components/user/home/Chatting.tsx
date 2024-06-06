import React, { useState, useEffect } from 'react';
import socket from '../../../utils/socket/Socket';


interface Message {
    name: string;
    message: string;
}

function Chatting() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket.on('message', (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        return () => {
            socket.off('message');
        };
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (name && message) {
            socket.emit('sendMessage', { name, message });
            setName('');
            setMessage('');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} placeholder="Your name" onChange={(event) => setName(event.target.value)} />
                <input type="text" value={message} placeholder="Your message" onChange={(event) => setMessage(event.target.value)} />
                <button type="submit">Send</button>
            </form>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        {message.name}: {message.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Chatting;
