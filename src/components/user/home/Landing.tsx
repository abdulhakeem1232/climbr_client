import React from 'react'
import banner from '../../../assets/bannerlanding.png'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


const CustomButton = styled(Button)({
    backgroundColor: 'black',
    color: 'white',
});
const Landing = () => {
    return (
        <div>
            {/* nav */}
            <div className=' px-4 lg:px-28 flex justify-between h-24  items-center'>
                <h1 className='font-bold text-2xl'>Logo</h1>
                <div className='flex'>
                    <h2 className='pr-10 pt-1 font-semibold'> Register</h2>
                    <CustomButton variant="contained">Login</CustomButton>
                </div>
            </div>
            {/* nav */}
            {/* <hr className='mx-28 lg:mx-28 border-[1px]' /> */}
            <div className='flex flex-col md:flex-row px-4 lg:px-28 mt-9'>
                <div className='w-full md:w-1/2 my-auto px-4 lg:px-20 text-left'>
                    <h1 className=' font-semibold text-4xl md:text-7xl leading-tight  -mt-16 pt-6 md:pt-0'>One Step Closer To Your New Job</h1>
                    <p className='text-slate-500 mt-3'>Explore thousands of jpb opprtunities with all kahfowlie ushdfoilwehsodlf ihweiorilsdhfwoel    c8jwe;od  wsdwesdi  8eud fjpwo; hsxgunv erhfglviedfhg eiufhgweiru</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-3 px-4 border border-blue-700 rounded">
                        Join Now
                    </button>
                </div>
                <div className='w-full md:w-1/2 '>
                    <img src={banner} alt="" className='max-w-[70%]  h-full mx-auto' />
                </div>
            </div>
            {/* banner */}
            <div className='py-4 mt-6 bg-gray-100  flex flex-col px-4 lg:px-28 pb-32'>
                <div >
                    <h1 className='text-left'>Most Demand Jobs</h1>
                </div>
                <div className='flex justify-center'>
                    <div className='h-44 w-44  flex flex-col items-start justify-end bg-black p-3 rounded-md'>
                        <span className='text-white font-medium text-xl'>Design</span><br />
                        <span className='text-white'> New 186 Jobs Posted</span>
                    </div>
                    <div className='h-44 w-44  flex flex-col items-start justify-end p-3'>
                        <span className='font-semibold text-xl'>Design</span><br />
                        <span>New 186 Jobs Posted</span>

                    </div>
                    <div className='h-44 w-44  flex flex-col items-start justify-end p-3'>
                        <span className='font-semibold text-xl'>Design</span><br />
                        <span>New 186 Jobs Posted</span>

                    </div>
                    <div className='h-44 w-44 flex flex-col items-start justify-end p-3'>
                        <span className='font-semibold text-xl'>Design</span><br />
                        <span>New 186 Jobs Posted</span>

                    </div>
                    <div className='h-44 w-44 rounded-md flex flex-col items-start justify-end bg-slate-50 p-3'>
                        <span className='font-semibold text-xl'>Design</span><br />
                        <span>New 186 Jobs Posted</span>

                    </div>
                </div>
            </div >
        </div >
    )
}

export default Landing


