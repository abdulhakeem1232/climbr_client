import React from 'react';
import EditJob from '../../components/recruiter/home/EditJob';
import Nav from '../../components/recruiter/home/Nav'

function EditJobPage() {
    return (
        <div>
            <Nav />
            < div className='bg-slate-100 min-h-screen flex justify-center items-center' >
                <EditJob />
            </div >
        </div >
    );
}

export default EditJobPage;
