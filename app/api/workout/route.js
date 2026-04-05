import { getUserFromCookie } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Workout from "@/models/workout.model";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try {
        await connectDB();
        const user=await  getUserFromCookie(req);
        if(!user){
            return NextResponse.json(
                {status:"error",message:"Unauthorized"},
                {status:401}
            )
        }

        const body=await req.json();
        const {exercises}=body

        const isValid = exercises.every((ex) => {
            if (!ex.name || ex.name.trim() === "") return false;
          
            if (!ex.sets || ex.sets.length === 0) return false;
          
            return ex.sets.every(
              (set) =>
                set.reps !== "" &&
                set.weight !== "" &&
                set.reps > 0 &&
                set.weight >= 0
            );
          });
          
          if (!isValid) {
            return NextResponse.json(
              { status: "error", message: "Invalid workout data" },
              { status: 400 }
            );
          }

        const workout = await Workout.create({
            userId: user._id,
            exercises,
        });

        return NextResponse.json(
            {status:"success",workouts:workout}
        )
      
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req){
    try {
        await connectDB();
        const user=await getUserFromCookie(req);
        if(!user){
            return NextResponse.json(
                {status:"error",message:"Unauthorized"},
                {status:401}
            )
        }

        const workouts=await Workout.find({userId:user._id}).sort({createdAt:-1});
        return NextResponse.json({
            status:"success",
            count:workouts.length,
            workout:workouts
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req){

}