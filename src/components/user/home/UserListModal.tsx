import React, { useEffect, useState } from 'react';
import { endpoints } from '../../../endpoints/userEndpoint';
import { userAxios } from '../../../utils/Config';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    userIds: string[];
    title: string;
}

interface UserDetails {
    username: string;
    avatar: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, userIds, title }) => {
    const [userDetails, setUserDetails] = useState<UserDetails[]>([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            console.log(userIds, 'ppppp');
            if (userIds.length > 0) {
                try {
                    const responses = await Promise.all(userIds.map(id => userAxios.get(`${endpoints.userDetails}/${id}`)));
                    setUserDetails(responses.map(response => response.data));
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            } else {
                setUserDetails([]);
            }
        };

        fetchUserDetails();
    }, [userIds]);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
                <button className="float-right" onClick={onClose}>Close</button>
                <h2 className="text-xl font-bold">{title}</h2>
                <ul>
                    {userDetails.map((user, index) => (
                        <li key={index} className="p-2 border-b border-gray-200 flex">
                            <img src={user.avatar} alt="" className='w-8 mr-2 rounded-full' />
                            {user.username}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Modal;
