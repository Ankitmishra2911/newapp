import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from './Sidebar';

export const AdminDashboard = () => {
  return (<div className='d-flex gap-4 flex-col md:flex-row'>
    <SideBar/>
            <Outlet/>
            </div>
  )
};
