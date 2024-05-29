import React, { useState } from 'react'
import Nav from '../../components/user/home/nav';
import MiddleBar from '../../components/user/home/MiddleBar';
import Profile from '../../components/user/home/SideProfile';
import Suggestion from '../../components/user/home/Suggestion';
import Job from '../../components/user/home/Job';

function SingleJob() {
    return (
        <div className='flex flex-col h-screen ' >
            <div className=''>
                <Nav />
            </div>

            <div className='flex flex-1 px-24 bg-gray-200' style={{ backgroundColor: '#f5f4d5' }} >
                < div className='w-full md:w-1/4 hidden md:block lg:block ml-12' >
                    <Profile />
                </div >
                <div className='w-full md:w-1/2   mx-4'>

                    <Job />

                </div>
                <div className='w-full md:w-1/4 hidden md:block lg:block'>
                    <Suggestion />
                </div>
            </div >
            <MiddleBar />

        </div >
    )
}

export default SingleJob

