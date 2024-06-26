import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import socket from '../utils/socket/Socket';

interface WebRTCContextProps {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    inCall: boolean;
    startCall: (chatId: string) => void;
    acceptCall: (chatId: string) => void;
    endCall: () => void;
}
const WebRTCContext = createContext<WebRTCContextProps | undefined>(undefined);
export const WebRTCProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [inCall, setInCall] = useState(false);
    const peerConnection = useRef<RTCPeerConnection | null>(null);

    const createPeerConnection = (chatId: string) => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('signal', { roomId: chatId, type: 'candidate', candidate: event.candidate });
            }
        };
        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };
        return pc;
    };
    const startCall = async (userId: string) => {
        console.log('started to videocall', userId);
        peerConnection.current = createPeerConnection(userId);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        stream.getTracks().forEach(track => {
            peerConnection.current!.addTrack(track, stream);
        });
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.emit('callUser', { userToCall: userId, from: 'offer', offer });
        setInCall(true);
        console.log('calluser emited');

    }
    const acceptCall = async () => {

    }
    const endCall = () => {
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        setLocalStream(null);
        setRemoteStream(null);
        setInCall(false);
    }
    return (
        <WebRTCContext.Provider value={{ localStream, remoteStream, inCall, startCall, acceptCall, endCall }}>
            {children}
        </WebRTCContext.Provider>
    )
}
export const useWebRTC = (): WebRTCContextProps => {
    const context = useContext(WebRTCContext);
    if (!context) {
        throw new Error('useWebRTC must be used within a WebRTCProvider');
    }
    return context;
};
