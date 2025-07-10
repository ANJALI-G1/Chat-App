import { create } from "zustand";
import toast from 'react-hot-toast';
import {axiosInstance} from "../lib/axios.js"
import axios from "axios";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore= create((set,get)=>(
    {
        messages:[],
        users:[],
        selectedUser:null,
        isUserLoading:false,
        isMessageLoading:false,


        getUsers:async()=>{
            set({isUserLoading:true});
            try {
                const res=await axiosInstance.get("/messages/users-list");
                set({users:res.data})
            } catch (error) {
                console.error("Error in getMessages",error.response.data.message)
                toast.error(error.response.data.message);
            }finally{
                set({isUserLoading:false});
            }
        },

        getMessages: async (userId)=>{
            set({isMessageLoading:true});

            try {
                const res=await axiosInstance.get(`messages/${userId}`);
                set({messages:res.data});
            } catch (error) {
                console.error("Error in getMessages",error.response.data.message)
                toast.error(error.response.data.message);
            } finally{
                set({isMessageLoading:false});
            }
        },

        setSelectedUser: (selectedUser)=>{
            set({selectedUser})
        },

        sendMessages:async(messageData)=>{
            const {selectedUser,messages}=get();
            try {
                const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
                console.log(messageData,selectedUser._id);
                set({messages:[...messages,res.data]})
                
            } catch (error) {
                console.error("Error in sendMessages",error.response.data.message)
                toast.error(error.response.data.message);
            } 
        },

        subscribeToMessages:()=>{
            const {selectedUser}=get()
            if(!selectedUser) return;

            const socket=useAuthStore.getState().socket;

            socket.on("newMessage",(newMessage)=>{
                if(newMessage.senderId!=selectedUser._id) return;
                set({
                    messages:[...get().messages,newMessage]
                })
            })
        },

        unsubscribeFromMessages:()=>{
            const socket=useAuthStore.getState().socket;
            if (!socket) return;
            socket.off("newMessage");
        }
    }

    
))