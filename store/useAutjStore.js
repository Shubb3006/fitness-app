import axiosInstance from "@/lib/axios"
import toast from "react-hot-toast";
import {create} from "zustand"
export const useAuthStore=create((set)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningIn:false,
    isSigningUp:false,
    isLoggingOut:false,

    checkAuth:async()=>{
        set({isCheckingAuth:true})
        try {
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data.user})
        } catch (error) {
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true});
        try {
            const res=await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data.user});
            toast.success("Sign up successfulll",{duration:1000})
            return true;
        } catch (error) {
            toast.error(error?.response?.data?.message||error.message,{duration:1000})
           return false;
        }finally{
            set({isSigningUp:false})
        }
    },

    signin:async(data)=>{
        set({isSigningIn:true});
        try {
            const res=await axiosInstance.post("/auth/signin",data)
            toast.success("Sign In successfulll",{duration:1000})
            set({authUser:res.data.user});
            return true;
        } catch (error) {
            toast.error(error?.response?.data?.message||error.message,{duration:1000})
           return false;
        }finally{
            set({isSigningIn:false})
        }
    },

    logout:async()=>{
        set({isLoggingOut:false});
        try {
            const res=await axiosInstance.post("/auth/logout")
            set({authUser:null});
            toast.success("Logout Succes",{duration:1000})
            return true;

        } catch (error) {
            console.log(error?.response?.data?.message||error.message);
            toast.error(error?.response?.data?.message||error.message)
        }finally{
            set({isLoggingOut:false})
        }
    }
}))