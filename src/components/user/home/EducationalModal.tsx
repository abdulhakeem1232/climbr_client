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

const EducationModal: React.FC<BannerModalProps> = ({ isOpen, onClose, fetchProfileData }) => {
    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const form = useForm();
    const { register, handleSubmit, formState, setError } = form;
    const { errors } = formState;

    // useEffect(() => {
    //     if (!isOpen) {
    //         setError('schoolName', { type: 'manual', message: '' });
    //         setError('degree', { type: 'manual', message: '' });
    //         setError('fieldOfStudy', { type: 'manual', message: '' });
    //         setError('startDate', { type: 'manual', message: '' });
    //         setError('endDate', { type: 'manual', message: '' });
    //     }
    // }, [isOpen, setError]);

    const submit = async (formData: any) => {
        try {
            console.log('---');

            let response = await userAxios.put(`${endpoints.updateEducation}/${userId}`, formData);
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
                    <div className="modal-title text-lg text-black font-semibold">Add Education Details</div>
                </div>

                <hr />
                <div className="modal-body p-6">
                    <form onSubmit={handleSubmit(submit)} >
                        <div className="mb-4">
                            <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">School Name</label>
                            <input type="text" id="schoolName" placeholder="School Name" {...register('schoolName', {
                                required: "School Name is Required", validate: {
                                    notOnlyNumbers: (value) => !(/^\d+$/.test(value)) || "School Name cannot consist only of numbers",
                                    notOnlySpaces: (value) => !(/^\s+$/.test(value)) || "School Name cannot consist only of spaces",
                                },
                            })} className="input-field w-full focus:outline-none rounded-md h-10 pl-2 border-2 mt-1" />
                            <p className="error-message">{errors.schoolName?.message?.toString()}</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Degree</label>
                            <input type="text" id="degree" placeholder=" Ex:Bachelor's" {...register('degree', {
                                required: "Degree is Required", validate: {
                                    notOnlyNumbers: (value) => !(/^\d+$/.test(value)) || "degree cannot consist only of numbers",
                                    notOnlySpaces: (value) => !(/^\s+$/.test(value)) || "degree cannot consist only of spaces",
                                },
                            })} className="input-field w-full rounded-md h-10 pl-2 border-2 focus:outline-none mt-1" />
                            <p className="error-message">{errors.degree?.message?.toString()}</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700">Field of Study</label>
                            <input type="text" id="fieldOfStudy" placeholder="Ex:Bussiness" {...register('fieldOfStudy', {
                                required: "Field Of Study is Required", validate: {
                                    notOnlyNumbers: (value) => !(/^\d+$/.test(value)) || "Field of Study cannot consist only of numbers",
                                    notOnlySpaces: (value) => !(/^\s+$/.test(value)) || "Field of Study cannot consist only of spaces",
                                },
                            })} className="input-field w-full rounded-md h-10 pl-2 border-2 focus:outline-none mt-1" />
                            <p className="error-message">{errors.fieldOfStudy?.message?.toString()}</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input type="date" id="startDate" placeholder="Start Date" {...register('startDate', {
                                required: "Start Date is Required is Required"
                            })} className="input-field w-full rounded-md h-10 pl-2 border-2 focus:outline-none mt-1" />
                            <p className="error-message">{errors.startDate?.message?.toString()}</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                            <input type="date" id="endDate" placeholder="End Date" {...register('endDate', {
                                required: "End Date is Required is Required"
                            })} className="input-field w-full rounded-md h-10 pl-2 border-2 focus:outline-none mt-1" />
                            <p className="error-message">{errors.endDate?.message?.toString()}</p>
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

export default EducationModal;
