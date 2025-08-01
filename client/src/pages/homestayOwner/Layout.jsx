import React from 'react'
import Navbar from '../../components/homestayOwner/Navbar'
import Sidebar from '../../components/homestayOwner/Sidebar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex w-full '>
                <Sidebar />
                <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout