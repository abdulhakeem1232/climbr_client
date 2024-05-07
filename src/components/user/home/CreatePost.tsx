import React from 'react';
import { useForm } from 'react-hook-form';
import Nav from '../home/nav'
import MiddleBar from './MiddleBar'
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button'


interface FormData {
    image: FileList;
    description: string;
}

function CreatePost() {
    const form = useForm<FormData>()
    const { register, handleSubmit } = form

    const onSubmit = async (data: FormData) => {
        console.log('Form Data:', data);
        try {
            const formData = new FormData();
            formData.append('image', data.image[0]);
            formData.append('description', data.description);

            const response = await fetch('/api/posts', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Post created successfully!');
            } else {
                console.error('Failed to create post:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
            <div className='mb-4'>
                <Nav />
            </div>
            <h2 className='mb-4'>Create a New Post</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="image"><ImageIcon /></label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        {...register('image')}
                        style={{ display: 'none' }}

                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        {...register('description')}
                    />
                </div>
                <Button variant="contained" color="primary" type="submit" style={{ marginBottom: '10px', marginTop: '10px' }}  >
                    Submit
                </Button>
            </form>
            <MiddleBar />
        </div >
    );
}

export default CreatePost;
