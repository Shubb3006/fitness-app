import { getUserFromCookie } from "@/lib/auth";
import { NextResponse } from "next/server";
import  Workout  from '@/models/workout.model.js';
import { connectDB } from "@/lib/db";

export async function DELETE(req,{params}){
    try {
        await connectDB();
        const user = await getUserFromCookie(req);
        if (!user) {
            return NextResponse.json(
                { status: "error", message: "Unauthorized" },
                { status: 401 }
            );
        }
        const {id}=await params;

        const workout=await Workout.findById(id);
        if (!workout) {
            return NextResponse.json(
                { status: "error", message: "Workout not found" },
                { status: 401 }
            );
        }

        if(workout.userId.toString()!==user._id.toString()){
            return NextResponse.json(
                { status: "error", message: "Not Allowed" },
                { status: 401 }
            );
        }

        await Workout.findByIdAndDelete(id);

        return NextResponse.json(
            { status: "success", message: "Workout deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(req,{params}){
    try {
        await connectDB();
        const user = await getUserFromCookie(req);
        if (!user) {
            return NextResponse.json(
                { status: "error", message: "Unauthorized" },
                { status: 401 }
            );
        }
        const {id}=await params;

        const workout=await Workout.findById(id);
        if (!workout) {
            return NextResponse.json(
                { status: "error", message: "Workout not found" },
                { status: 401 }
            );
        }

        if(workout.userId.toString()!==user._id.toString()){
            return NextResponse.json(
                { status: "error", message: "Not Allowed" },
                { status: 401 }
            );
        }

        const body=await req.json();
        const {exercises}=body;

        const updatedWorkout = await Workout.findByIdAndUpdate(
            id,
            { exercises },
            { new: true }
        );

        return NextResponse.json(
            { status: "success", message: "Workout updated successfully", workout:updatedWorkout },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req,{params}){
    try {
        await connectDB();
        const user=await getUserFromCookie(req);
        
        if (!user) {
            return NextResponse.json(
                { status: "error", message: "Unauthorized" },
                { status: 401 }
            );
        }
        const {id}=await params;

        const workout=await Workout.findById(id);
        if (!workout) {
            return NextResponse.json(
                { status: "error", message: "Workout not found" },
                { status: 401 }
            );
        }

        if(workout.userId.toString()!==user._id.toString()){
            return NextResponse.json(
                { status: "error", message: "Not Allowed" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {status:"success",workout}
        )
    } catch (error) {
        
    }
}