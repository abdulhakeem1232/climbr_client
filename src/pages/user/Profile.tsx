import React from 'react'
import Profile from '../../components/user/home/Profile'
import Nav from '../../components/user/home/nav';
import MiddleBar from '../../components/user/home/MiddleBar';
import { ChakraProvider } from '@chakra-ui/react';


function ProfilePage() {
    return (
        <div className='flex flex-col min-h-screen bg-gray-100 ' >
            <div className='fixed w-full bg-white'>
                <Nav />
            </div>
            {/* style={{ backgroundColor: 'rgba(255,250,247,247)' }} */}
            <div className='flex  ml-4 md:ml-16 lg:ml-60  mt-24 w-1/2 rounded-lg'  >
                <div>
                    <ChakraProvider>
                        <Profile />
                    </ChakraProvider >

                </div>



            </div >
            <MiddleBar />
        </div >
    )
}

export default ProfilePage

