import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import AuthImagePattern from '../components/AuthImagePattern';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });


  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    
    if (!formData.email.trim()) return toast.error("Email is Required")
    if (!formData.password.trim()) return toast.error("Password is Required")
    if (!formData.password.length > 6) return toast.error("Password must be at least 6 characters")
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email Address")

    return true;


  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success=validateForm();
    if(success) login(formData);
  }
  return (
     <>
      <div className="min-h-screen grid lg:grid-cols-2">

        {/* left side */}

        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* LOGO */}
            <div className="text-center mb-8">


              <div className="flex flex-col items-center gap-2 group">
                <div className="size-12 rounded-xl bg-primary/10 center-flex group-hover:bg-primary/20 transition-colors">

                  <MessageSquare className="size-6 text-primary" />

                </div>
                <h1 className="text-2xl font-bold mt-2">Login In</h1>
                <p className="text-base-content/60">Get started with your free account</p>
              </div>
            </div>

            {/* Form to be displayed */}

            <form onSubmit={handleSubmit} className="space-y-6">


              {/* For Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative center-flex">
                  <div className="absolute insert-y-0 left-0 pl-3 flex items-center justify-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40 " />
                  </div>

                  <input 
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})}
                  />
                </div>

              </div>
              {/* For password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative center-flex">
                  <div className="absolute insert-y-0 left-0 pl-3 flex items-center justify-center pointer-events-none">
                    <Lock className="size-5 text-base-content/40 " />
                  </div>

                  <input 
                  type={showPassword?"text":"password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={(e)=>setFormData({...formData,password:e.target.value})}
                  />
                  <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={()=>setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="size-5 text-base-content/40"/>:<Eye className="size-5 text-base-content/40" />}
                  </button>
                </div>

              </div>

              {/* to click on signup */}
              <button type="submit" className="w-full btn btn-primary" disabled={isLoggingIn}>
                {isLoggingIn?<>
                <Loader2 className="size-5 animate-spin"/>Loading...
                </>:("Sign In")}
              </button>

            </form>
            
            {/* if user has already an account */}
            <div className="text-center">
              <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">Create account</Link>
              </p>
            </div>
          </div>
        </div>

        {/* right side ,you have to edit it*/}
        <AuthImagePattern title="Join Our community" 
        subtitle="connect with friends,share moments, and stay in touch with your loved ones"
        />
      </div>
    </>
  )
}

export default LoginPage
