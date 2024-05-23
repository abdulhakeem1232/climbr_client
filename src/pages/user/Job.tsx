import React, { useState } from 'react'
import Joblist from '../../components/user/home/Joblist'
import Nav from '../../components/user/home/nav';
import MiddleBar from '../../components/user/home/MiddleBar';
import Profile from '../../components/user/home/Profile';
import Suggestion from '../../components/user/home/Suggestion';
function Job() {

    return (
        <div className='flex flex-col h-screen ' >
            <div className=''>
                <Nav />
            </div>
            {/* style={{ backgroundColor: '#f5f4d5' }} */}

            <div className='flex flex-1 px-24 bg-gray-200' style={{ backgroundColor: '#f5f4d5' }} >
                < div className='w-full md:w-1/4 hidden md:block lg:block ml-12' >
                    <Profile />
                </div >
                <div className='w-full md:w-1/2   mx-4'>

                    <Joblist />

                </div>
                <div className='w-full md:w-1/4 hidden md:block lg:block'>
                    <Suggestion />
                </div>
            </div >
            <MiddleBar />
        </div >
    )
}

export default Job

