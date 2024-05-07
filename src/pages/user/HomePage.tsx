import React from 'react';
import Home from '../../components/user/home/Home';
import Nav from '../../components/user/home/nav';
import MiddleBar from '../../components/user/home/MiddleBar';
import Profile from '../../components/user/home/Profile';
import Suggestion from '../../components/user/home/Suggestion';

function HomePage() {
    return (
        <div className='flex flex-col h-screen ' >
            <div>
                <Nav />
            </div>
            <div className='flex flex-1' style={{ backgroundColor: '#f5f4d5' }}>
                < div className='w-1/4' >
                    <Profile />
                </div >
                <div className='w-1/2 flex justify-center items-center'>
                    <h1>Welcome to Home</h1>

                </div>
                <div className='w-1/4'>
                    <Suggestion />
                </div>
            </div >
            <MiddleBar />
        </div >
    );
}

export default HomePage;
