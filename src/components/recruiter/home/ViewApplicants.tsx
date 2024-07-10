import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { recruiterAxios } from '../../../utils/Config'
import { recruiterendpoints } from '../../../endpoints/recruiterEndpoints'
import LoadingWave from '../../user/home/Spinner'
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
                <div className='lg:px-40 pt-8 bg-gray-100 min-h-screen'>
                    <h2 className='text-2xl font-bold text-indigo-800 mb-6'>Applicants</h2>
                    <div className='overflow-x-auto shadow-lg rounded-lg'>
                        <table className='min-w-full'>
                            <thead className='bg-indigo-600 text-white'>
                                <tr>
                                    <th className='px-4 py-3 text-left'>Name</th>
                                    <th className='px-4 py-3 text-left'>Email</th>
                                    <th className='px-4 py-3 text-left'>Mobile</th>
                                    <th className='px-4 py-3 text-left'>Resume</th>
                                    <th className='px-4 py-3 text-left'>Status/Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                {applicants?.map((applicant: any) => (
                                    <tr key={applicant.id} className='hover:bg-indigo-50 transition-colors'>
                                        <td className='border-b border-indigo-100 px-4 py-3 text-left'>{applicant.name}</td>
                                        <td className='border-b border-indigo-100 px-4 py-3 text-left'>{applicant.email}</td>
                                        <td className='border-b border-indigo-100 px-4 py-3 text-left'>{applicant.mobile}</td>
                                        <td className='border-b border-indigo-100 px-4 py-3 text-left'>
                                            <button
                                                onClick={() => handlePdfDownload(applicant.cv)}
                                                className='text-indigo-600 hover:text-indigo-800 font-semibold transition-colors'
                                            >
                                                Download Resume
                                            </button>
                                        </td>
                                        <td className='border-b border-indigo-100 px-4 py-3 text-left'>
                                            {applicant.status === "Applied" ? (
                                                <div>
                                                    <button
                                                        className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded mr-2 transition-colors'
                                                        onClick={() => updateStatus(applicant.userId, "Rejected")}
                                                    >
                                                        Reject
                                                    </button>
                                                    <button
                                                        className='bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded transition-colors'
                                                        onClick={() => updateStatus(applicant.userId, "Shortlisted")}
                                                    >
                                                        Shortlist
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className={`font-semibold  ${applicant.status === "Rejected" ? 'text-red-600' : 'text-green-600'}`} > {applicant.status}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            )
            }

        </div >
    )
}

export default ViewApplicants

