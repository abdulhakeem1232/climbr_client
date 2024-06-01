import React from 'react'

function JobSkeleton() {
    return (
        <div className="animate-pulse flex flex-col w-64 rounded-lg bg-white shadow-md border border-gray-200 p-4 mr-4 mb-4">
            <div className="w-full h-40 bg-gray-300 rounded-md mb-4"></div>
            <div className="flex flex-col gap-2">
                <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-full h-10 bg-gray-300 rounded-md"></div>
            </div>
        </div>
    )
}

export default JobSkeleton

