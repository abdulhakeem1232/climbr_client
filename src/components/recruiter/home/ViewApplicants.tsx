import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { recruiterAxios } from '../../../utils/Config'
import { recruiterendpoints } from '../../../endpoints/recruiterEndpoints'
import LoadingWave from '../../user/home/Spinner'
import { error } from 'console'

interface Applicant {
    userId: string;
    status: string;
    name: string;
    cv: string;
    mobile: string;
    email: string;
}

function ViewApplicants() {
    const { jobId } = useParams()
    const [applicants, setApplicants] = useState<Applicant[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await recruiterAxios.get(`${recruiterendpoints.getApplicant}/${jobId}`)
                console.log(response, '-------');
                setApplicants(response.data.applicants)
            } catch (err) {
                console.error("ERROR:", err);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, []);
    const updateStatus = async (userId: string, status: string) => {
        let data = {
            jobId, userId, status
        }
        try {
            let response = await recruiterAxios.post(`${recruiterendpoints.changeApplicantStatus}`, data)
            console.log(response.data);
            setApplicants(prevState =>
                prevState.map(applicant =>
                    applicant.userId == userId ? { ...applicant, status } : applicant
                )
            );
        } catch (err) {
            console.error('Error while changing status', err);

        }
    }
    const handlePdfDownload = async (cvUrl: string) => {
        try {
            if (cvUrl) {
                const response = await fetch(cvUrl);

                if (!response.ok) {
                    console.error("Error while fetch cv using url")
                }
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'resume.pdf');
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            } else {
                console.error("ERROR: Invalid CV URL");
            }
        } catch (error) {
            console.error("ERROR: Failed to download PDF", error);
        }
    };

    return (
        <div>
            {loading ? (<LoadingWave />) : (
                <div className='lg:px-40 pt-5'>
                    <p className='text-xl font-semibold pb-5'>Applicants</p>
                    <table className='min-w-full'>
                        <thead>
                            <tr>
                                <th className='border'>Name</th>
                                <th className='border'>Email</th>
                                <th className='border'>Mobile</th>
                                <th className='border'>Resume</th>
                                <th className='border'>Status/Action</th>
                            </tr >
                        </thead >
                        <tbody>
                            {applicants?.map((applicant: any) => (
                                <tr key={applicant.id}>
                                    <td className='border py-1'>{applicant.name}</td>
                                    <td className='border py-1'>{applicant.email}</td>
                                    <td className='border py-1'>{applicant.mobile}</td>
                                    <td className=' border py-1 cursor-pointer text-blue-500' onClick={() => handlePdfDownload(applicant.cv)}>Download Resume</td>
                                    <td className='border py-1'>{applicant.status == "Applied" ? <div>
                                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-1' onClick={() => updateStatus(applicant.userId, "Rejected")}>Reject</button>
                                        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded' onClick={() => updateStatus(applicant.userId, "Shortlisted")}>Shortlist</button></div> : applicant.status}</td>

                                </tr>
                            ))
                            }
                        </tbody >
                    </table ></div >

            )
            }

        </div >
    )
}

export default ViewApplicants

