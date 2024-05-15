import React, { useState } from 'react';
import Nav from '../home/nav';
import MiddleBar from './MiddleBar';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import { userAxios, endpoints } from '../../../endpoints/userEndpoint';

function CreatePost() {
    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState<string>('');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setImage(file);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        if (image) {
            formData.append('image', image);
            console.log('llldld');

        }
        formData.append('description', description);
        console.log('Image:', image);
        console.log('Description:', description);
        console.log(formData, 'lll');
        console.log(formData);
        for (let value of formData.values()) {
            console.log(value);
        }
        try {
            let response = await userAxios.post(endpoints.createpost, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div>
            <div className='mb-4'>
                <Nav />
            </div>
            <h2 className='mb-4'>Create a New Post</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label htmlFor="image"><ImageIcon /></label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
                <Button variant="contained" color="primary" type="submit" style={{ marginBottom: '10px', marginTop: '10px' }}>
                    Submit
                </Button>
            </form>
            <MiddleBar />
        </div >
    );
}

export default CreatePost;
