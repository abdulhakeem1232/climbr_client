import React from 'react';

function SideprofileShimmer() {
    return (
        <div className="ml-10 mt-2 hidden min-h-screen sm:block border border-solid rounded-lg shadow-md bg-white">
            <div className="animate-pulse flex items-center justify-center w-full h-96 rounded-md bg-gray-200 relative">
                {/* Shimmer effect for banner */}
                <div className="h-52 w-full rounded-md bg-gray-300"></div>
                {/* Center the avatar within the profile div */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {/* Shimmer effect for avatar */}
                    <div className="h-24 w-24 rounded-full bg-gray-300"></div>
                </div>
            </div>
            <div className="mt-20 p-1">
                <div className="h-8 w-40 rounded-md bg-gray-300"></div>
                <div className="h-6 w-60 rounded-md bg-gray-300 mt-1"></div>
                <div className="h-4 w-64 rounded-md bg-gray-300 mt-2"></div>
                <div className="h-4 w-64 rounded-md bg-gray-300 mt-1"></div>
                <div className="h-4 w-40 rounded-md bg-gray-300 mt-1"></div>
            </div>
        </div>
    );
}

export default SideprofileShimmer;
