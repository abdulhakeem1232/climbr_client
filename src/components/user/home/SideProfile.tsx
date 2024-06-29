import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SideprofileShimmer from '../skeleton/Sideprofile';
import { RootState } from '../../../Redux/store/store';
import { endpoints } from '../../../endpoints/userEndpoint';
import { userAxios } from '../../../utils/Config';

function Profile() {
    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await userAxios.get(`${endpoints.userDetails}/${userId}`);
                console.log(response.data);
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [userId]);

    if (loading) {
        return <div><SideprofileShimmer /></div>;
    }
    return (
        <div className='lg:ml-10 mt-2 hidden min-h-screen sm:block border border-solid rounded-lg shadow-md bg-white'>
            <div className='relative p-1'>
                {userDetails && (
                    <img src={userDetails.banner} alt="User Banner" className='rounded-md w-full h-auto' />
                )}
                <div className="flex justify-center w-full relative">
                    {userDetails.avatar && (
                        <img
                            src={userDetails.avatar}
                            alt="User Avatar"
                            className='rounded-full w-1/2 h-auto absolute top-[calc(100%-3rem)] sm:top-[calc(100%)] transform -translate-y-1/2'
                        />
                    )}
                </div>
            </div>
            <div className='mt-20 p-1'>
                <p className='font-semibold'>{userDetails.username}</p>
                <p>{userDetails.header}</p>
                <div className='text-left text-gray-600 mt-2'>
                    <p><span className='font-semibold'>Email: </span>{userDetails.email}</p>
                    <p><span className='font-semibold'>Mobile: </span>{userDetails.mobile}</p>
                    <p><span className='font-semibold'>Posts: </span>{userDetails.postData?.length || 0}</p>
                </div>

            </div>
        </div>

    );
}

export default Profile;
