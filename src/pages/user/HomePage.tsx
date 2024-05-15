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
                < div className='w-full md:w-1/4 hidden md:block lg:block' >
                    <Profile />
                </div >
                <div className='w-full md:w-1/2 flex justify-center items-center mx-4'>
                    <Home />

                </div>
                <div className='w-full md:w-1/4 hidden md:block lg:block'>
                    <Suggestion />
                </div>
            </div >
            <MiddleBar />
        </div >
    );
}

export default HomePage;
