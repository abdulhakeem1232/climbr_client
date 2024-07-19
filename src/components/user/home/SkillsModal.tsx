import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/store';
import { endpoints } from '../../../endpoints/userEndpoint';
import { userAxios } from '../../../utils/Config';
import { Command } from 'cmdk';

interface Skill {
    id: string;
    skill: string;
}

interface SkillModalProps {
    isOpen: boolean;
    onClose: () => void;
    fetchProfileData: () => void;
}

const SkillModal: React.FC<SkillModalProps> = ({ isOpen, onClose, fetchProfileData }) => {
    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const { handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await userAxios.get(`${endpoints.getSkills}`);
            console.log(response.data, 'pololollooooooooooooo');

            setSkills(response.data.skills);
        } catch (err) {
            console.error('Error fetching skills:', err);
        }
    };

    const submit = async () => {
        if (!selectedSkill) return;

        try {
            const response = await userAxios.put(`${endpoints.updateSkills}/${userId}`, { skill: selectedSkill.skill });
            if (response.data.success) {
                fetchProfileData();
                onClose();
            }
        } catch (err) {
            console.error('Error during skill update:', err);
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
            <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Add Skill</h2>
                <form onSubmit={handleSubmit(submit)}>
                    <Command className="w-full mb-4">
                        <Command.Input
                            placeholder="Search skills..."
                            className="w-full p-2 border rounded"
                            value={searchValue}
                            onValueChange={setSearchValue}
                        />
                        <Command.List className="mt-2">
                            {skills?.map((skill) => (
                                <Command.Item
                                    key={skill.id}
                                    value={skill.skill}
                                    onSelect={() => {
                                        setSelectedSkill(skill);
                                        setValue('skill', skill.skill);
                                        setSearchValue(skill.skill);
                                    }}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {skill.skill}
                                </Command.Item>
                            ))}
                        </Command.List>
                    </Command>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Add Skill
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SkillModal;
