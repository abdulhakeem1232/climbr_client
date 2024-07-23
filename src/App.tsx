import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRoutes from './routes/userRoute'
import RecruiterRoute from './routes/recruiterRoute';
import AdminRoute from './routes/adminRoute';
import { WebRTCProvider, useWebRTC } from './Context/WebRTCContext';
import VideoCallModal from './components/user/home/VideoCall';
import GlobalIncomingCallHandler from './components/user/home/IncomeVideoCall';
import { ErrorBoundary } from 'react-error-boundary';
import { fallbackRender } from './components/user/home/ErrorBoundary';

function App() {

  return (
    <WebRTCProvider>
      <div className="App">
        <ErrorBoundary FallbackComponent={fallbackRender}>
          x``
          <GlobalVideoCallHandler />
          <GlobalIncomingCallHandler />
        </ErrorBoundary>
      </div >
    </WebRTCProvider>
  );
}
const GlobalVideoCallHandler: React.FC = () => {
  const { localStream, remoteStream, inCall, endCall } = useWebRTC();

  if (!inCall) return null;

  return (
    <VideoCallModal localStream={localStream} remoteStream={remoteStream} onEndCall={endCall} />
  );
};

export default App;
