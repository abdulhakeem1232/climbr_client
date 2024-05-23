import React, { useState } from 'react';
import Nav from '../home/nav';
import MiddleBar from './MiddleBar';
import ImageIcon from '../../../assets/ImageIcon.png'
import Button from '@mui/material/Button';
import profile from '../../../assets/profile.png'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store/store'
import { userAxios, endpoints } from '../../../endpoints/userEndpoint';

function CreatePost() {
    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState<string>('');
    const avatar = useSelector((store: RootState) => store.UserData.image)

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
        <div className='bg-white w-full rounded-lg mt-3 p-4 border-2 border-solid'>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='flex'>
                    <img src={avatar || profile} alt="" className='w-9 h-9' />
                    <input
                        id="description"
                        placeholder='Start a Post'
                        className='w-full border-2 border-solid mb-3 mt-1 h-9 rounded-full ml-1 pl-3 '
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />

                </div>
                <div className='flex mx-2 justify-between'>
                    <label htmlFor="image" className="cursor-pointer">
                        <img src={ImageIcon} alt="" className='w-9 ' />
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                    <Button variant="contained" color="primary" type="submit" style={{ marginBottom: '10px', marginTop: '10px' }}>
                        Post
                    </Button>
                </div>


            </form>
            <MiddleBar />
        </div >
    );
}

export default CreatePost;
