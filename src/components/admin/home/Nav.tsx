import React from 'react'
import Logo from '../../../assets/logo.png'
import { CgProfile } from "react-icons/cg";

function Nav() {
    return (
        <div className='h-16 flex justify-between items-center'>
            <img src={Logo} alt="" className="ml-20 w-36" />
            <div className="flex items-center">

                <CgProfile className='mr-16 w-8 h-8' />
            </div>
        </div>
    )
}

export default Nav

