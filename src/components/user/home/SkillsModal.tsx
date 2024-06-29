import React, { useState, useEffect } from 'react';
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

const ExperienceModal: React.FC<BannerModalProps> = ({ isOpen, onClose, fetchProfileData }) => {
    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const form = useForm();
    const { register, handleSubmit, formState, setError } = form;
    const { errors } = formState;

    const submit = async (formData: any) => {
        try {
            let response = await userAxios.put(`${endpoints.updateSkills}/${userId}`, formData);
            if (response.data.success) {
                fetchProfileData();
                onClose();
            }
        } catch (err) {
            console.error('Error During education Data Updation:', err);
        }
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center z-50 justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="modal-overlay absolute w-full h-full bg-gray-100 opacity-10" onClick={onClose}></div>
            <div className="modal-container rounded-xl bg-white w-11/12 md:max-w-lg mx-auto shadow-lg z-50 overflow-y-auto">
                <div className="modal-header text-white py-4 px-6 rounded-t">
                    <button className="btn btn-clear float-right text-3xl text-black" onClick={onClose}>×</button>
                    <div className="modal-title text-lg text-black font-semibold">Add Skills</div>
                </div>

                <hr />
                <div className="modal-body p-6">
                    <form onSubmit={handleSubmit(submit)} >
                        <div className="mb-4">
                            <label htmlFor="skill" className="block text-sm font-medium text-gray-700">Skill</label>
                            <input type="text" id="skill" placeholder="Skill (One at a Time)" {...register('skill', {
                                required: "Skill is Required", validate: {
                                    notOnlyNumbers: (value) => !(/^\d+$/.test(value)) || "Skill cannot consist only of numbers",
                                    notOnlySpaces: (value) => !(/^\s+$/.test(value)) || "Skill cannot consist only of spaces",
                                },
                            })} className="input-field w-full focus:outline-none rounded-md h-10 pl-2 border-2 mt-1" />
                            <p className="error-message">{errors.skill?.message?.toString()}</p>
                        </div>

                        <button type="submit" className="submit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                    </form>

                </div>
            </div>
        </div >
    );
}

export default ExperienceModal;
