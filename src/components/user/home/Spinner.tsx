import React from 'react';

const LoadingWave: React.FC = () => {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="flex justify-center items-end w-72 h-24">
                <div className="loading-bar bg-blue-600 w-5 h-2 mx-1 rounded-md animate-loading-wave"></div>
                <div className="loading-bar bg-blue-600 w-5 h-2 mx-1 rounded-md animate-loading-wave" style={{ animationDelay: '0.1s' }}></div>
                <div className="loading-bar bg-blue-600 w-5 h-2 mx-1 rounded-md animate-loading-wave" style={{ animationDelay: '0.2s' }}></div>
                <div className="loading-bar bg-blue-600 w-5 h-2 mx-1 rounded-md animate-loading-wave" style={{ animationDelay: '0.3s' }}></div>
            </div>
        </div>
    );
};

export default LoadingWave;
