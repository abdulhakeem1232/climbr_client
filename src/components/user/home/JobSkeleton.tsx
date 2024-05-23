import React from 'react'

function JobSkeleton() {
    return (
        <div>
            <div className='w-full my-3 border-2 border-gray-300 animate-pulse'>
                <div className='flex items-center'>
                    <div className='w-48 h-24 bg-gray-300'></div>
                    <div className='ml-3 flex-1'>
                        <div className='h-6 bg-gray-300 mb-2 w-3/4'></div>
                        <div className='h-6 bg-gray-300 mb-2 w-1/2'></div>
                        <div className='h-6 bg-gray-300 mb-2 w-2/3'></div>
                        <div className='h-6 bg-gray-300 mb-2 w-1/3'></div>
                    </div>
                    <div className='ml-auto mb-auto mt-2 mr-2'>
                        <div className='h-10 bg-gray-300 w-24'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobSkeleton

