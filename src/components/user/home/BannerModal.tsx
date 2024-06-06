import React, { useState } from 'react';
import imageIcon from '../../../assets/ImageIcon.png'
import { endpoints, userAxios } from '../../../endpoints/userEndpoint';
import { RootState } from "../../../Redux/store/store";
import { useSelector } from "react-redux";

interface BannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentImage: string;
    onSelectNewImage: (newImage: File) => void;
    fetchProfileData: () => void;
}

const BannerModal: React.FC<BannerModalProps> = ({ isOpen, onClose, currentImage, onSelectNewImage, fetchProfileData }) => {
    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const [newImage, setNewImage] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string>('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setNewImage(files[0]);
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        if (!newImage) {
            setImageError('Please select an image');
            return;
        }
        if (newImage && !newImage.type.startsWith('image')) {
            setImageError('Please select a valid image file');
            return;
        }
        if (newImage) {
            formData.append('image', newImage);
        }
        try {
            let response = await userAxios.put(`${endpoints.updateCover}/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(response.data);
            fetchProfileData();
            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={`fixed top-0  left-0 w-full h-full flex items-center z-50 justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="modal-overlay  absolute w-full h-full bg-gray-100 opacity-10" onClick={onClose}></div>
            <div className="modal-container rounded-xl bg-white w-11/12 md:max-w-lg mx-auto  shadow-lg z-50 overflow-y-auto">
                <div className="modal-header  text-white py-4 px-6 rounded-t">
                    <button className="btn btn-clear float-right text-black text-3xl" onClick={onClose}>×</button>
                    <div className="modal-title text-lg text-black font-semibold mb-2">Edit Cover Photo</div>
                    <hr />
                </div>
                <div className="modal-body p-6">
                    <div className='mb-3 text-lg font-semibold'>Current Cover Photo</div>
                    <img src={currentImage} alt="Current Banner" className="mb-4" />

                    <label htmlFor="file-input" className="flex items-center    p-2 rounded cursor-pointer" >
                        <img src={imageIcon} alt="" className='w-8' />
                    </label>
                    <input id="file-input" type="file" className="hidden" onChange={handleImageChange} />
                    {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
                </div>
                <div className="modal-footer bg-gray-100 py-4 px-6 rounded-b">
                    <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                </div>
            </div >
        </div >
    );
}

export default BannerModal;
