import React, { useEffect } from 'react'
import { Route, Routes, useRoutes, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import toast, { Toaster } from 'react-hot-toast';
import { useStore } from '../store/zustand';
import { Link, Navigate } from 'react-router-dom';



const Home = () => {

  const initialState = useStore((state) => state.initialState);
  
  useEffect(() => {
    if (!initialState._isLoggedIn) {
      <Navigate to="/siginin" />;
      // return (!initialState._isLoggedIn) ? <Navigate to="/signin" /> : <Navigate to="/calendar" />
    }
  }, [])

  return (
    <main className=''>
      <div className='flex justify-center'>
        <Navbar></Navbar>
      </div>
      {/* <p className="font-extrabold text-3xl md:text-4xl mb-1 md:mb-3 ">Home Page Tetap</p> */}
        <Toaster />
      <Outlet />
    </main>
  )
}

export default Home