import React from 'react'
import Profile from '../../components/user/home/Profile'
import Nav from '../../components/user/home/nav';
import MiddleBar from '../../components/user/home/MiddleBar';
import { ChakraProvider } from '@chakra-ui/react';


function ProfilePage() {
    return (
        <div className='flex flex-col  bg-gray-100 ' >
            <div className='fixed w-full bg-white z-10'>
                <Nav />
            </div>
            <div className='flex-1  mx-auto  mt-24 w-3/4 rounded-lg z-0'  >
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

