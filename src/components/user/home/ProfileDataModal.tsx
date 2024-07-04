import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/store';
import { endpoints } from '../../../endpoints/userEndpoint';
import { userAxios } from '../../../utils/Config';

interface BannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    fetchProfileData: () => void;
}

const ProfileDataModal: React.FC<BannerModalProps> = ({ isOpen, onClose, fetchProfileData }) => {
    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const form = useForm()
    const { register, handleSubmit, formState, setError, getValues } = form
    const { errors } = formState;

    const onSubmit = async (formData: any) => {
        try {
            let response = await userAxios.put(`${endpoints.updateData}/${userId}`, formData)
            fetchProfileData();
            onClose();
        } catch (err) {
            console.error('Error During Profile Data Updation:', err);
        }

    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center z-50 justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="modal-overlay absolute w-full h-full bg-gray-100 opacity-10" onClick={onClose}></div>
            <div className="modal-container rounded-xl bg-white w-11/12 md:max-w-lg mx-auto  shadow-lg z-50 overflow-y-auto">
                <div className="modal-header  text-white py-4 px-6 rounded-t">
                    <button className="btn btn-clear float-right text-3xl text-black" onClick={onClose}>×</button>
                    <div className="modal-title text-lg text-black font-semibold">Edit Profile Data</div>
                </div>
                <hr />
                <div className="modal-body p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className={`form-container w-full max-w-md px-4 ${isOpen ? 'block' : 'hidden'}`}>
                        <div className="mb-4">
                            <input type="text" id="header" placeholder="Header" {...register('header')} className="input-field w-full focus:outline-none rounded-md h-10 pl-2 border-2" />
                            <p className="error-message">{errors.header?.message?.toString()}</p>
                        </div>
                        <div className="mb-4">
                            <input type="text" id="mobile" placeholder="Mobile" {...register('mobile', {
                                required: 'Mobile number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Mobile number must be exactly 10 digits long',
                                },
                            })} className="input-field w-full rounded-md h-10 pl-2 border-2 focus:outline-none" />
                            <p className="error-message">{errors.mobile?.message?.toString()}</p>
                        </div>
                        <button type="submit" className="submit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                    </form>


                </div>
            </div>
        </div>
    );
}

export default ProfileDataModal;
