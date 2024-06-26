import React, { useEffect, useState } from 'react';
import { useWebRTC } from '../../../Context/WebRTCContext';
import socket from '../../../utils/socket/Socket';

interface IncomingCallNotificationProps {
    callerId: string;
    callerName: string;
    onAccept: () => void;
    onReject: () => void;
}

const IncomingCallNotification: React.FC<IncomingCallNotificationProps> = ({ callerId, callerName, onAccept, onReject }) => {
    return (
        <div className="fixed bottom-0 right-0 m-4 p-4 bg-white shadow-lg rounded-lg flex items-center">
            <div className="mr-4">
                <img src={`path/to/avatar/${callerId}`} alt={`${callerName}'s avatar`} className="w-10 h-10 rounded-full" />
            </div>
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
    const [incomingCall, setIncomingCall] = useState<{ callerId: string, callerName: string } | null>(null);

    useEffect(() => {
        socket.on('incomingCall', (data: { callerId: string, callerName: string }) => {
            console.log('incoming call');

            setIncomingCall(data);
        });

        return () => {
            socket.off('incomingCall');
        };
    }, []);

    const handleAccept = () => {
        if (incomingCall) {
            acceptCall(incomingCall.callerId);
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
            callerId={incomingCall.callerId}
            callerName={incomingCall.callerName}
            onAccept={handleAccept}
            onReject={handleReject}
        />
    );
};

export default GlobalIncomingCallHandler;
