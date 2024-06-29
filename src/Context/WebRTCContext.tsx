// import React, { createContext, useCallback, useContext, useState, useRef, useEffect } from 'react';
// import socket from '../utils/socket/Socket';
// import peer from '../Service/peer';
// import { useSelector } from 'react-redux';
// import { RootState } from '../Redux/store/store';

// interface WebRTCContextProps {
//     localStream: MediaStream | null;
//     remoteStream: MediaStream | null;
//     inCall: boolean;
//     startCall: (userId: string) => void;
//     acceptCall: (userId: string, from: string, offer: RTCSessionDescriptionInit) => void;
//     endCall: () => void;
// }

// const WebRTCContext = createContext<WebRTCContextProps | undefined>(undefined);

// export const WebRTCProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//     const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
//     const [inCall, setInCall] = useState(false);
//     const username = useSelector((store: RootState) => store.UserData.Username);
//     const currentUser = useSelector((store: RootState) => store.UserData.UserId);


//     const peerConnection = useRef<RTCPeerConnection | null>(null);

//     const startCall = async (userId: string) => {
//         const stream = await navigator.mediaDevices.getUserMedia({
//             audio: true,
//             video: true,
//         });
//         const offer = await peer.getOffer();
//         socket.emit('callUser', { userToCall: userId, from: username, offer, fromId: currentUser });
//         setLocalStream(stream);
//         sendStreams();
//         setInCall(true);
//     }

//     const acceptCall = async (userId: string, fromId: string, offer: RTCSessionDescriptionInit) => {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         setLocalStream(stream);
//         const ans = await peer.getAnswer(offer);
//         sendStreams();
//         setInCall(true);
//         socket.emit('callAccepted', { userId: fromId, answer: ans, context: 'webRTC' });
//     }
//     const sendStreams = useCallback(() => {
//         if (localStream) {
//             for (const track of localStream.getTracks()) {
//                 peer.peer.addTrack(track, localStream);
//             }
//         }
//     }, [localStream]);

//     const endCall = () => {
//         if (peerConnection.current) {
//             peerConnection.current.close();
//             peerConnection.current = null;
//         }
//         setLocalStream(null);
//         setRemoteStream(null);
//         setInCall(false);
//     };

//     useEffect(() => {
//         socket.on('signal', async (data) => {
//             const { type, candidate, answer } = data;
//             console.log('Received signal:', type, candidate, answer);

//             if (peerConnection.current) {
//                 try {
//                     if (type === 'answer' && peerConnection.current.signalingState !== 'closed') {
//                         await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
//                     } else if (type === 'candidate' && peerConnection.current.signalingState !== 'closed') {
//                         await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
//                     }
//                 } catch (error) {
//                     console.error('Error handling signal:', error);
//                 }
//             }
//         });

//         socket.on('callAcceptedSignal', async (data) => {
//             const { answer } = data;
//             console.log('Received callAcceptedSignal:', answer);
//             if (peerConnection.current) {
//                 try {
//                     console.log('vannu');
//                     if (peerConnection.current.signalingState !== 'closed') {
//                         await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
//                     }
//                 } catch (error) {
//                     console.error('Error handling callAcceptedSignal:', error);

//                 }
//             }
//         });

//         return () => {
//             socket.off('signal');
//             socket.off('callAcceptedSignal');
//         };
//     }, []);


//     return (
//         <WebRTCContext.Provider value={{ localStream, remoteStream, inCall, startCall, acceptCall, endCall }}>
//             {children}
//         </WebRTCContext.Provider>
//     );
// };

// export const useWebRTC = (): WebRTCContextProps => {
//     const context = useContext(WebRTCContext);
//     if (!context) {
//         throw new Error('useWebRTC must be used within a WebRTCProvider');
//     }
//     return context;
// };



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
    const [inCall, setInCall] = useState(false);
    const username = useSelector((store: RootState) => store.UserData.Username);
    const currentUser = useSelector((store: RootState) => store.UserData.UserId);

    const peerConnection = useRef<RTCPeerConnection | null>(null);

    const startCall = async (userId: string) => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        setLocalStream(stream);

        if (!peerConnection.current) {
            peerConnection.current = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: [
                            "stun:stun.l.google.com:19302",
                            "stun:global.stun.twilio.com:3478",
                        ],
                    },
                ],
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
    };

    const acceptCall = async (userId: string, fromId: string, offer: RTCSessionDescriptionInit) => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);

        if (!peerConnection.current) {
            peerConnection.current = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: [
                            "stun:stun.l.google.com:19302",
                            "stun:global.stun.twilio.com:3478",
                        ],
                    },
                ],
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
    };

    const endCall = () => {
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

        setInCall(false);
    };

    useEffect(() => {
        socket.on('signal', async (data) => {
            const { type, candidate, answer } = data;
            console.log('Received signal:', type, candidate, answer);

            if (peerConnection.current) {
                try {
                    if (type === 'answer' && peerConnection.current.signalingState === 'have-local-offer') {
                        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
                    } else if (type === 'candidate' && peerConnection.current.signalingState !== 'closed') {
                        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
                    }
                } catch (error) {
                    console.error('Error handling signal:', error);
                }
            }
        });

        socket.on('callAcceptedSignal', async (data) => {
            const { answer } = data;
            console.log('Received callAcceptedSignal:', answer);

            if (peerConnection.current) {
                try {
                    console.log('vannu');
                    if (peerConnection.current.signalingState === 'have-local-offer') {
                        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
                    }
                } catch (error) {
                    console.error('Error handling callAcceptedSignal:', error);
                }
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


