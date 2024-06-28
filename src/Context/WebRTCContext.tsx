import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import socket from '../utils/socket/Socket';
import peer from '../Service/peer';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store/store';

interface WebRTCContextProps {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    inCall: boolean;
    startCall: (userId: string) => void;
    acceptCall: (userId: string, from: string, offer: RTCSessionDescriptionInit) => void;
    endCall: () => void;
}

const WebRTCContext = createContext<WebRTCContextProps | undefined>(undefined);

export const WebRTCProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [inCall, setInCall] = useState(false);
    const username = useSelector((store: RootState) => store.UserData.Username);

    const peerConnection = useRef<RTCPeerConnection | null>(null);

    const createPeerConnection = (userId: string) => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                console.log('Sending candidate signal...');
                socket.emit('signal', { userId, type: 'candidate', candidate: event.candidate, context: 'webRTC' });
            }
        };

        pc.ontrack = (event) => {
            console.log('Remote track added:', event.streams[0]);
            setRemoteStream(event.streams[0]);
        };

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                setLocalStream(stream);
                stream.getTracks().forEach(track => {
                    pc.addTrack(track, stream);
                });
            })
            .catch(error => {
                console.error('Error accessing media devices:', error);
            });

        return pc;
    };

    const startCall = async (userId: string) => {
        console.log('Started to video call', userId);
        peerConnection.current = createPeerConnection(userId);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        stream.getTracks().forEach(track => {
            peerConnection.current!.addTrack(track, stream);
        });
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.emit('callUser', { userToCall: userId, from: username, offer });
        setInCall(true);
        console.log('callUser emitted');
    };

    const acceptCall = async (userId: string, from: string, offer: RTCSessionDescriptionInit) => {
        console.log('Accepting call from', from, userId);
        peerConnection.current = createPeerConnection(userId);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        stream.getTracks().forEach(track => {
            peerConnection.current!.addTrack(track, stream);
        });
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        console.log('Emitting callAccepted signal with answer:', answer);
        socket.emit('callAccepted', { userId: from, answer, context: 'webRTC' });
        setInCall(true);
    };

    const endCall = () => {
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        setLocalStream(null);
        setRemoteStream(null);
        setInCall(false);
    };

    useEffect(() => {
        socket.on('signal', async (data) => {
            const { type, candidate, answer, context } = data;
            console.log('Received signal:', type, candidate, answer);
            if (context === 'webRTC' && peerConnection.current) {
                if (type === 'answer') {
                    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
                } else if (type === 'candidate') {
                    await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
                }
            }
        });

        socket.on('callAcceptedSignal', async (data) => {
            const { answer, context } = data;
            console.log('Received callAcceptedSignal:', answer);
            if (context === 'webRTC' && peerConnection.current) {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
            }
        });

        return () => {
            socket.off('signal');
            socket.off('callAcceptedSignal');
        };
    }, []);


    return (
        <WebRTCContext.Provider value={{ localStream, remoteStream, inCall, startCall, acceptCall, endCall }}>
            {children}
        </WebRTCContext.Provider>
    );
};

export const useWebRTC = (): WebRTCContextProps => {
    const context = useContext(WebRTCContext);
    if (!context) {
        throw new Error('useWebRTC must be used within a WebRTCProvider');
    }
    return context;
};
