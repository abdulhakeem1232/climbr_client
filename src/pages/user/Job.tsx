import React, { useState } from 'react'
import Joblist from '../../components/user/home/Joblist'
import Nav from '../../components/user/home/nav';
import MiddleBar from '../../components/user/home/MiddleBar';

function Job() {
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className='flex flex-col min-h-screen bg-gray-100'>
            <div className='fixed w-full z-10 bg-white shadow-md'>
                <Nav />
            </div>
            <div className='flex flex-col md:flex-row w-full pt-20 px-4 md:px-8 lg:px-12'>
                <button
                    className='md:hidden mb-4 bg-blue-500 text-white py-2 px-4 rounded-full shadow-md'
                    onClick={toggleFilters}
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                <Joblist showFilters={showFilters} />
            </div>
            <MiddleBar />
        </div>
    )
}

export default Job
