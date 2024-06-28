import React, { useEffect, useState } from 'react';

interface VideoCallModalProps {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    onEndCall: () => void;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ localStream, remoteStream, onEndCall }) => {
    const localVideoRef = React.useRef<HTMLVideoElement>(null);
    const remoteVideoRef = React.useRef<HTMLVideoElement>(null);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [isMicOff, setIsMicOff] = useState(false);

    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [localStream, remoteStream]);

    const toggleCamera = () => {
        if (localStream) {
            localStream.getVideoTracks().forEach(track => {
                track.enabled = !track.enabled;
                setIsCameraOff(!track.enabled);
            });
        }
    };

    const toggleMic = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
                setIsMicOff(!track.enabled);
            });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative w-full h-full flex items-center justify-center bg-black">
                <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute top-4 right-4 w-64 h-44 bg-gray-900 border-2 border-white rounded-lg"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <button onClick={toggleCamera} className="p-2 bg-gray-200 text-gray-800 rounded">
                        {isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
                    </button>
                    <button onClick={toggleMic} className="p-2 bg-gray-200 text-gray-800 rounded">
                        {isMicOff ? 'Turn Mic On' : 'Turn Mic Off'}
                    </button>
                    <button onClick={onEndCall} className="p-2 text-white bg-red-500 rounded-full">
                        End Call
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoCallModal;
