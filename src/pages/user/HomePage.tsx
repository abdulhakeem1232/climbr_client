import React, { useState, Suspense } from 'react';
import Nav from '../../components/user/home/nav';
import MiddleBar from '../../components/user/home/MiddleBar';
import Profile from '../../components/user/home/SideProfile';
import Suggestion from '../../components/user/home/Suggestion';
import CreatePost from '../../components/user/home/CreatePost';
import ShimmerHome from '../../components/skeleton/ShimmerHome';
import DotSpinner from '../../components/user/home/FormSpinner'

const LazyHome = React.lazy(() => import('../../components/user/home/Home'));

function HomePage() {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className='flex flex-col h-screen ' >
            {isLoading && <DotSpinner />}
            <div className=''>
                <Nav />
            </div>

            <div className='flex flex-1 px-24 bg-white'>
                <div className='w-full md:w-1/4 hidden md:block lg:block ml-12'>
                    <Profile />
                </div>
                <div className='w-full md:w-1/2 flex justify-center flex-col items-center mx-4'>
                    <CreatePost setIsLoading={setIsLoading} />
                    <Suspense fallback={<ShimmerHome />}>
                        <LazyHome />
                    </Suspense>
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
