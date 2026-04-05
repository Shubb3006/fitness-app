import mongoose from "mongoose";

const workoutSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    date:{
        type:Date,
        default:Date.now()
    },
    exercises:[
        {
            name:String,
            sets:[
                {
                    reps:Number,
                    weight:Number
                }
            ]
        }
    ]
},{timestamps:true})

export default mongoose.models.Workout||mongoose.model("Workout",workoutSchema);