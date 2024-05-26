import React from 'react';
import { useParams } from 'react-router-dom';
import EditJob from '../../components/recruiter/home/EditJob';

function EditJobPage() {
    return (
        <div className='bg-slate-200 min-h-screen flex justify-center items-center'>
            <EditJob />
        </div>
    );
}

export default EditJobPage;
