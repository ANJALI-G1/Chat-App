import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore=create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdateProfile:false,

    isCheckingAuth:true,//it will check whether user is authenticated or not

    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get('/auth/check');

            set({authUser:res.data})
        } catch (error) {
            console.error("Error in checkAuth",error);
            set({authUser:null})
        } finally {
            set({isCheckingAuth:false,})
        }
    }
}))