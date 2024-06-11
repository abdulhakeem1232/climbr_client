import React, { Suspense } from 'react';
import Home from '../../components/user/home/Home';
import Nav from '../../components/user/home/nav';
import MiddleBar from '../../components/user/home/MiddleBar';
import Profile from '../../components/user/home/SideProfile';
import Suggestion from '../../components/user/home/Suggestion';
import CreatePost from '../../components/user/home/CreatePost';
import SideprofileShimmer from '../../components/user/skeleton/Sideprofile';
import ShimmerHome from '../../components/user/skeleton/ShimmerHome';
const LazyProfile = React.lazy(() => import('../../components/user/home/SideProfile'));
const LazyHome = React.lazy(() => import('../../components/user/home/Home'));

function HomePage() {

    return (
        <div className='flex flex-col h-screen ' >
            <div className=''>
                <Nav />
            </div>

            <div className='flex flex-1 px-24 bg-gray-100'>
                <div className='w-full md:w-1/4 hidden md:block lg:block ml-12'>
                    {/* <Suspense fallback={<SideprofileShimmer />}>
                        <LazyProfile />
                    </Suspense> */}
                    <Profile />
                </div>
                <div className='w-full md:w-1/2 flex justify-center flex-col items-center mx-4'>
                    <CreatePost />
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
