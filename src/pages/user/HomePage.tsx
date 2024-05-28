import React from 'react';
import Home from '../../components/user/home/Home';
import Nav from '../../components/user/home/nav';
import MiddleBar from '../../components/user/home/MiddleBar';
import Profile from '../../components/user/home/Profile';
import Suggestion from '../../components/user/home/Suggestion';
import CreatePost from '../../components/user/home/CreatePost';


function HomePage() {

    return (
        <div className='flex flex-col h-screen ' >
            <div className=''>
                <Nav />
            </div>
            {/* style={{ backgroundColor: '#f5f4d5' }} */}

            <div className='flex flex-1 px-24 bg-gray-100'>
                < div className='w-full md:w-1/4 hidden md:block lg:block ml-12' >
                    <Profile />
                </div >
                <div className='w-full md:w-1/2  flex justify-center flex-col items-center mx-4'>
                    <CreatePost />
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
