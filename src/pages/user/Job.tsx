import React, { useState } from 'react'
import Joblist from '../../components/user/home/Joblist'
import Nav from '../../components/user/home/nav';
import MiddleBar from '../../components/user/home/MiddleBar';
import Profile from '../../components/user/home/Profile';
import Suggestion from '../../components/user/home/Suggestion';
function Job() {

    return (
        <div className='flex flex-col h-screen ' >
            <div className='fixed w-full bg-white'>
                <Nav />
            </div>
            {/* style={{ backgroundColor: 'rgba(255,250,247,247)' }} */}
            <div className='flex w-full pl-4 py-24 lg:pl-24  bg-gray-50'  >
                <Joblist />



            </div >
            <MiddleBar />
        </div >
    )
}

export default Job

