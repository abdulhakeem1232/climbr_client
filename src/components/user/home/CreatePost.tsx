import React, { useState } from 'react';
import Nav from '../home/nav';
import MiddleBar from './MiddleBar';
import ImageIcon from '../../../assets/ImageIcon.png'
import Button from '@mui/material/Button';
import profile from '../../../assets/profile.png'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store/store'
import { endpoints } from '../../../endpoints/userEndpoint';
import { userAxios } from '../../../utils/Config';
import { toast } from 'sonner';

interface CreatePostProps {
    setIsLoading: (isLoading: boolean) => void;
}

function CreatePost({ setIsLoading }: CreatePostProps) {
    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState<string>('');
    const [imageError, setImageError] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string>('');

    const avatar = useSelector((store: RootState) => store.UserData.image);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setImage(file);
        setImageError('');
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview('');
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        if (!description) {
            setDescriptionError('Please enter a description');
            return;
        } else {
            setDescriptionError('');
        }
        if (!image) {
            setImageError('Please select an image');
            return;
        }
        if (image && !image.type.startsWith('image')) {
            setImageError('Please select a valid image file');
            return;
        }
        if (image) {
            formData.append('image', image);
        }
        formData.append('description', description);
        setIsLoading(true);
        try {
            let response = await userAxios.post(endpoints.createpost, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error: any) {
            if (error.response) {
                if (error.response.status == 413) {
                    toast('The uploaded file is too large. Please upload a smaller file.');
                } else if (error.response.status == 500) {
                    toast('An internal server error occurred. Please try again later.');
                } else {
                    toast('An error occurred while submitting the post. Please try again later.');
                }
            } else {
                toast('An unexpected error occurred. Please check your connection and try again.');
            }
            console.error('Error:', error);
        }
        setIsLoading(false);
        setDescription('');
        setImagePreview('');
        setImage(null);
    };

    return (
        <div className='bg-white w-full rounded-lg mt-3 px-4 pt-4 border-2 border-solid'>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='flex'>
                    <img src={avatar || profile} alt="" className='w-9 h-9 rounded-full' />
                    <div className='w-full'>
                        <input
                            id="description"
                            placeholder='Start a Post'
                            className='w-full border-2 border-solid mb-3 mt-1 h-9 rounded-full ml-1 pl-3'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                        {descriptionError && <p style={{ color: 'red', marginLeft: '10px' }}>{descriptionError}</p>}
                    </div>
                </div>
                <div className='flex mx-2 justify-between'>
                    <div className='flex'>
                        <label htmlFor="image" className="cursor-pointer">
                            <img src={ImageIcon} alt="" className='w-9' />
                            {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <div>
                                <img src={imagePreview} alt="Preview" className='ml-3 rounded-md' style={{ width: '40px', height: '40px' }} />
                            </div>
                        )}
                    </div>
                    <div>
                        <Button variant="contained" className='h-10' color="primary" type="submit" style={{ marginBottom: '10px', marginTop: '10px' }}>
                            Post
                        </Button>
                    </div>
                </div>
            </form>
            <MiddleBar />
        </div>
    );
}

export default CreatePost;
