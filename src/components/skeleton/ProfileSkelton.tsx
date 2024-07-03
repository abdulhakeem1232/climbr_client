import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ProfileSkeleton = () => {
    return (
        <div className='mb-11 animate-pulse pl-2'>
            <div className='mb-2 flex'>
                <div className='w-32 h-32 bg-gray-300 rounded-full'></div>
                <div className='ml-4'>
                    <Skeleton width={200} height={20} />
                    <Skeleton width={150} height={15} />
                    <div className='text-blue-400 mt-1'>
                        <Skeleton width={100} height={15} /> | <Skeleton width={100} height={15} />
                    </div>
                </div>
            </div>
            <hr />
            <div className='my-2'>
                <Skeleton height={20} />
            </div>
            <hr />
            <div className='my-2'>
                <Skeleton height={20} />
            </div>
            <hr />
            <div className='text-left px-4'>
                <div className='my-2 font-semibold'>Applied Jobs:</div>
                <div className='mb-2'>
                    <Skeleton count={3} height={20} />
                </div>
                <hr />
                <div className='my-2 font-semibold'>Posted Jobs:</div>
                <div>
                    <div className='py-2'>
                        <div className='flex'>
                            <div className='w-24 h-24 bg-gray-300 rounded-md mr-3'></div>
                            <div>
                                <Skeleton width={200} height={20} />
                                <Skeleton width={150} height={15} />
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className='py-2'>
                        <div className='flex'>
                            <div className='w-24 h-24 bg-gray-300 rounded-md mr-3'></div>
                            <div>
                                <Skeleton width={200} height={20} />
                                <Skeleton width={150} height={15} />
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileSkeleton;
