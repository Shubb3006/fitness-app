import { useWorkoutStore } from '@/store/useWorkoutStore';
import React from 'react'

function calculateStreak(workouts) {
    if (!workouts.length) return 0;
  
    // get unique dates
    const dates = [
      ...new Set(workouts.map((w) => new Date(w.createdAt).toDateString())),
    ];
  
    // sort descending (latest first)
    dates.sort((a, b) => new Date(b) - new Date(a));
  
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    let currentDate = today;
  
    for (let i = 0; i < dates.length; i++) {
      const workoutDate = new Date(dates[i]);
  
      // difference in days
      const diff = (currentDate - workoutDate) / (1000 * 60 * 60 * 24);
  
      if (Math.floor(diff) === 0 || Math.floor(diff) === 1) {
        streak++;
        currentDate = workoutDate;
      } else {
        break;
      }
    }
  
    return streak;
  }
const StreakData = () => {
    const {workouts}=useWorkoutStore();
    const streak = calculateStreak(workouts);
  return (
    <div className="bg-base-100 p-6 rounded-2xl shadow mb-8 flex items-center justify-between border border-base-300">
    <div>
      <p className="text-sm text-gray-500">Current Streak</p>
      <h2 className="text-3xl font-bold">
        {streak} {streak > 1 ? "days" : "day"} 🔥
      </h2>
      <p className="text-xs text-gray-400 mt-1">
        {streak > 0 ? "Keep it going 💪" : "Start today 🚀"}
      </p>
    </div>

    <div className="text-5xl">🔥</div>
  </div>
  )
}

export default StreakData
