import React, { useState } from 'react';
import Loader from '../home/FormSpinner'
import { endpoints } from '../../../endpoints/userEndpoint';
import { userAxios } from '../../../utils/Config';
import { RootState } from "../../../Redux/store/store";
import { useSelector } from "react-redux";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentImage: string;
    fetchProfileData: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, currentImage, fetchProfileData }) => {
    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const [newImage, setNewImage] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('090990');

        const files = e.target.files;
        if (files && files.length > 0) {
            const selectedImage = files[0];
            if (selectedImage.type.startsWith('image')) {
                setNewImage(selectedImage);
                setImageError('');
            } else {
                setImageError('Please select a valid image file');
            }
        }
    };

    const handleSave = async () => {
        if (!newImage) {
            setImageError('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('image', newImage);
        setIsLoading(true);
        try {
            const response = await userAxios.put(`${endpoints.updateProfile}/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            fetchProfileData();
            onClose();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center z-50 justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="modal-overlay absolute w-full h-full bg-gray-100 opacity-10" onClick={onClose}></div>
            <div className="modal-container bg-white w-11/12 md:max-w-lg mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
                <div className="modal-header  text-white py-4 px-6 rounded-t">
                    <button className="btn btn-clear float-right  text-3xl text-black" onClick={onClose}>×</button>
                    <div className="modal-title text-lg font-semibold text-black">Edit Profile Photo</div>
                </div>
                <hr />
                <div className="modal-body p-6 ">
                    <div className='mb-3 text-lg font-semibold'>Current Profile Photo</div>
                    <img src={currentImage} alt="Current Banner" className="mb-4 w-28 rounded-full" />

                    <input id="file-input" type="file" className="" onChange={handleImageChange} />
                    {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
                </div>
                <div className="modal-footer bg-gray-100 py-4 px-6 rounded-b">
                    <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                </div>
                {isLoading && <Loader />}
            </div >
        </div >
    );
}

export default ProfileModal;
