import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useWorkoutStore=create((set)=>({
    workouts:[],
    gettingWorkouts:false,
    addingWorkout:false,
    deletingWorkout:false,
    updatingWorkout:false,

    getWorkouts:async()=>{
        try {
            set({gettingWorkouts:true})
            const res=await axiosInstance.get("/workout");
            set({workouts:res.data.workout})
        } catch (error) {
            toast.error(error?.response?.data?.message||error.message,{duration:1000})
        }finally{
            set({gettingWorkouts:false})
        }
    },

    addWorkout:async(data)=>{
        try {
            set({addingWorkout:true})
            console.log(data)
            const res=await axiosInstance.post("/workout",{exercises:data});
            set((state)=>({
                workouts:[res.data.workouts,...state.workouts]
            }))

            return true;
        } catch (error) {
            toast.error(error?.response?.data?.message||error.message,{duration:1000})
        }finally{
            set({addingWorkout:false})
        }
    },

    deleteWorkout:async(id)=>{
        try {
            set({deletingWorkout:true});
            const res=await axiosInstance.delete(`/workout/${id}`);
            set((state)=>({
                workouts:state.workouts.filter((w)=>w._id!==id)
            }))

            toast.success("Deleted successfully")
        } catch (error) {
            toast.error(error?.response?.data?.message||error.message,{duration:1000})
        }finally{
            set({deletingWorkout:false})

        }
    },

    updateWorkout:async(id,data)=>{
        try {
            set({updatingWorkout:true})
            const res=await axiosInstance.put(`/workout/${id}`,{exercises:data})
            set((state) => ({
                workouts: state.workouts.map((w) =>
                  w._id === id ? res.data.workout : w
                ),
              }));
              toast.success("Workout updated");
              return true;

        } catch (error) {
            toast.error(error?.response?.data?.message||error.message,{duration:1000})
        }finally{
            set({updatingWorkout:false})
        }
    },

    getWorkout:async(id)=>{
        try {
            set({gettingWorkout:true})
            const res=await axiosInstance.get(`/workout/${id}`)
            
        } catch (error) {
            toast.error(error?.response?.data?.message||error.message,{duration:1000})
        }finally{
            set({gettingWorkout:false})
        }
    }
}))