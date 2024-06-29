import React, { useEffect, useState } from 'react';
import { useWebRTC } from '../../../Context/WebRTCContext';
import socket from '../../../utils/socket/Socket';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/store';

interface IncomingCallNotificationProps {
    callerId: string;
    callerName: string;
    onAccept: () => void;
    onReject: () => void;
}

const IncomingCallNotification: React.FC<IncomingCallNotificationProps> = ({ callerId, callerName, onAccept, onReject }) => {
    return (
        <div className="fixed bottom-0 right-0 m-4 p-4 bg-white shadow-lg rounded-lg flex items-center">
            <div className="flex-1">
                <h4 className="font-bold">{callerName}</h4>
                <p className="text-sm text-gray-500">Incoming video call...</p>
            </div>
            <button onClick={onAccept} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Accept</button>
            <button onClick={onReject} className="bg-red-500 text-white px-4 py-2 rounded">Reject</button>
        </div>
    );
};

const GlobalIncomingCallHandler: React.FC = () => {
    const { acceptCall, endCall } = useWebRTC();
    const [incomingCall, setIncomingCall] = useState<{
        fromId: string; from: string, offer: RTCSessionDescriptionInit
    } | null>(null);
    const userId = useSelector((store: RootState) => store.UserData.UserId) || '';

    useEffect(() => {
        socket.on('incomingCall', (data: { from: string, offer: RTCSessionDescriptionInit, fromId: string }) => {
            console.log('incoming call', data);
            setIncomingCall(data);
        });

        return () => {
            socket.off('incomingCall');
        };
    }, []);

    const handleAccept = () => {
        if (incomingCall) {
            acceptCall(userId, incomingCall.fromId, incomingCall.offer);
            setIncomingCall(null);
        }
    };

    const handleReject = () => {
        endCall();
        setIncomingCall(null);
    };

    if (!incomingCall) return null;

    return (
        <IncomingCallNotification
            callerId={incomingCall.from}
            callerName={incomingCall.from}
            onAccept={handleAccept}
            onReject={handleReject}
        />
    );
};

export default GlobalIncomingCallHandler;
