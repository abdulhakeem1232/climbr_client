import React, { createContext, useCallback, useContext, useState, useRef, useEffect } from 'react';
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
    const [guestId, setGuestId] = useState('');
    const [inCall, setInCall] = useState(false);
    const username = useSelector((store: RootState) => store.UserData.Username);
    const currentUser = useSelector((store: RootState) => store.UserData.UserId);

    const peerConnection = useRef<RTCPeerConnection | null>(null);

    const startCall = async (userId: string) => {
        try {
            setGuestId(userId);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            setLocalStream(stream);

            if (!peerConnection.current) {
                peerConnection.current = new RTCPeerConnection({
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:stun1.l.google.com:19302' },
                        { urls: 'stun:stun2.l.google.com:19302' },
                        { urls: 'stun:stun3.l.google.com:19302' },
                        { urls: 'stun:stun4.l.google.com:19302' },
                    ]
                });
                peerConnection.current.ontrack = (event) => {
                    if (event.streams && event.streams[0]) {
                        setRemoteStream(event.streams[0]);
                    }
                };

                peerConnection.current.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit('signal', { userId, type: 'candidate', candidate: event.candidate, context: 'webRTC' });
                    }
                };

                for (const track of stream.getTracks()) {
                    peerConnection.current.addTrack(track, stream);
                }
            }

            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);

            socket.emit('callUser', { userToCall: userId, from: username, offer, fromId: currentUser });
            setInCall(true);
        } catch (error) {
            console.error('Error starting call:', error);
        }
    };

    const acceptCall = async (userId: string, fromId: string, offer: RTCSessionDescriptionInit) => {
        try {
            setGuestId(userId);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(stream);

            if (!peerConnection.current) {
                peerConnection.current = new RTCPeerConnection({
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:stun1.l.google.com:19302' },
                        { urls: 'stun:stun2.l.google.com:19302' },
                        { urls: 'stun:stun3.l.google.com:19302' },
                        { urls: 'stun:stun4.l.google.com:19302' },
                    ]
                });

                peerConnection.current.ontrack = (event) => {
                    if (event.streams && event.streams[0]) {
                        setRemoteStream(event.streams[0]);
                    }
                };

                peerConnection.current.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit('signal', { userId: fromId, type: 'candidate', candidate: event.candidate, context: 'webRTC' });
                    }
                };

                for (const track of stream.getTracks()) {
                    peerConnection.current.addTrack(track, stream);
                }
            }

            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);

            socket.emit('callAccepted', { userId: fromId, answer, context: 'webRTC' });
            setInCall(true);
        } catch (error) {
            console.error('Error accepting call:', error);
        }
    };

    const endCall = () => {
        try {
            if (peerConnection.current) {
                peerConnection.current.close();
                peerConnection.current = null;
            }

            if (localStream) {
                localStream.getTracks().forEach((track) => track.stop());
                setLocalStream(null);
            }

            if (remoteStream) {
                remoteStream.getTracks().forEach((track) => track.stop());
                setRemoteStream(null);
            }

            socket.emit("callEnded", guestId);
            setInCall(false);
        } catch (error) {
            console.error('Error ending call:', error);
        }
    };

    useEffect(() => {
        const handleSignal = async (data: { type: any; candidate: any; answer: any; }) => {
            try {
                const { type, candidate, answer } = data;
                console.log('Received signal:', type, candidate, answer);

                if (peerConnection.current) {
                    console.log('---------------');

                    if (type === 'answer') {
                        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
                    } else if (type === 'candidate' && peerConnection.current.signalingState !== 'closed') {
                        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
                    }
                }
            } catch (error) {
                console.error('Error handling signal:', error);
            }
        };

        const handleCallAcceptedSignal = async (data: { answer: any; }) => {
            try {
                const { answer } = data;
                console.log('Received callAcceptedSignal:', answer);

                if (peerConnection.current && peerConnection.current.signalingState !== 'closed') {
                    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
                    console.log('Remote description set successfully');
                }
            } catch (error) {
                console.error('Error handling callAcceptedSignal:', error);
            }
        };

        const handleCallEndedSignal = () => {
            console.log('Received callEndedSignal');
            endCall();
        };

        socket.on('signal', handleSignal);
        socket.on('callAcceptedSignal', handleCallAcceptedSignal);
        socket.on('callEndedSignal', handleCallEndedSignal);

        return () => {
            socket.off('signal', handleSignal);
            socket.off('callAcceptedSignal', handleCallAcceptedSignal);
            socket.off('callEndedSignal', handleCallEndedSignal);
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
