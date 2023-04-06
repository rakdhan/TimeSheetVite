import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useStore } from "../store/zustand";
const Navbar = () => {

  // state
  const [theme, setTheme] = useState(localStorage.getItem('theme'))
  const initialState = useStore((state) => state.initialState);
  const logout = useStore((state) => state.logout);

  // useEffect(() => {
  //   if (window.matchMedia('prefers-color-scheme: dark').matches) {
  //     setTheme('dark')
  //   } else {
  //     setTheme('light')
  //   }
  // }, [])
  
  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light')
    }
  }, [theme])

  const islogout=()=>{
    logout();
  }

  const sun = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  );

  const moon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  )

  return (
    <div className='flex flex-col fixed z-20 md:flex-wrap items-center justify-center'>
  
      <div className='flex flex-col mt-2 md:flex-row items-center justify-center '>
        <Link className='mx-2 m-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105' to={'/'}>Home</Link>
        { !initialState._isLoggedIn ? (
        <Link className='mx-2 m-2 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105' to={'/signin'}>Sign In</Link>
        ) : (
          <>
            <Link className='mx-2 m-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105' to={'/timesheet'}>Timesheet</Link>
            <Link className='mx-2 m-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105' to={'/calendar'}>Calendar</Link>
            <button className='mx-2 m-2 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl hover:shadow-inner transition duration-200 ease-in-out  transform hover:-translate-x hover:scale-105' onClick={islogout}>Logout</button>
          </>
        )}
      </div>
     
      <button
        type='button'
        onClick={handleThemeSwitch}
        className='fixed rounded-lg bg-gray-500 p-2 z-10  right-20 text-lg mt-2 dark:bg-green-500'>
        {theme === 'dark' ? sun : moon}
      </button>
    </div>
  )
}

export default Navbar