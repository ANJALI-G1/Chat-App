import React from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {
  const {theme}=useThemeStore();

  const { authUser, checkAuth, isCheckingAuth ,onlineUsers} = useAuthStore();
  
  
  useEffect(() => { checkAuth() }, [checkAuth]);


  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 hover:size-20  animate-spin' />
      </div>
    );
  }

  // theme related

  

  return (
    <>
      <div data-theme={theme}>
        {console.log(onlineUsers)}


        <Navbar />
        <Routes>
          {/* we will define routes here */}
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
          <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
          <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
        </Routes>

        <Toaster />

      </div>
    </>
  )
}

export default App
