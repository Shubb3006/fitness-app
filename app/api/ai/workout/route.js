export async function POST(req) {
    const { goal, experience } = await req.json();
  
    let plan = [];
    if (goal === "Muscle Gain" && experience === "Beginner") {
        plan = [
          {
            day: "Day 1 - Push",
            exercises: [
              { name: "Bench Press", sets: 3, reps: 10, weight: 0 },
              { name: "Incline Dumbbell Press", sets: 3, reps: 12, weight: 0 },
              { name: "Shoulder Press", sets: 3, reps: 12, weight: 0 },
              { name: "Tricep Dips", sets: 3, reps: 10, weight: 0 },
            ],
          },
          {
            day: "Day 2 - Pull",
            exercises: [
              { name: "Lat Pulldown", sets: 3, reps: 12, weight: 0 },
              { name: "Seated Row", sets: 3, reps: 12, weight: 0 },
              { name: "Bicep Curls", sets: 3, reps: 12, weight: 0 },
            ],
          },
          {
            day: "Day 3 - Legs",
            exercises: [
              { name: "Squats", sets: 3, reps: 10, weight: 0 },
              { name: "Leg Press", sets: 3, reps: 12, weight: 0 },
              { name: "Leg Curl", sets: 3, reps: 12, weight: 0 },
            ],
          },
        ];
      }
      if (goal === "Muscle Gain" && experience === "Intermediate") {
        plan = [
          {
            day: "Day 1 - Chest + Triceps",
            exercises: [
              { name: "Bench Press", sets: 4, reps: 8, weight: 0 },
              { name: "Incline DB Press", sets: 3, reps: 10, weight: 0 },
              { name: "Cable Fly", sets: 3, reps: 12, weight: 0 },
              { name: "Tricep Pushdown", sets: 3, reps: 12, weight: 0 },
            ],
          },
          {
            day: "Day 2 - Back + Biceps",
            exercises: [
              { name: "Deadlift", sets: 4, reps: 6, weight: 0 },
              { name: "Pull-ups", sets: 3, reps: 8, weight: 0 },
              { name: "Barbell Row", sets: 3, reps: 10, weight: 0 },
              { name: "Bicep Curl", sets: 3, reps: 12, weight: 0 },
            ],
          },
          {
            day: "Day 3 - Legs",
            exercises: [
              { name: "Squats", sets: 4, reps: 8, weight: 0 },
              { name: "Leg Press", sets: 3, reps: 12, weight: 0 },
              { name: "Hamstring Curl", sets: 3, reps: 12, weight: 0 },
            ],
          },
          {
            day: "Day 4 - Shoulders",
            exercises: [
              { name: "Shoulder Press", sets: 4, reps: 10, weight: 0 },
              { name: "Lateral Raise", sets: 3, reps: 12, weight: 0 },
              { name: "Rear Delt Fly", sets: 3, reps: 12, weight: 0 },
            ],
          },
        ];
      }
      if (goal === "Muscle Gain" && experience === "Advanced") {
        plan = [
          {
            day: "Day 1 - Chest",
            exercises: [
              { name: "Bench Press", sets: 5, reps: 6, weight: 0 },
              { name: "Incline DB Press", sets: 4, reps: 8, weight: 0 },
              { name: "Chest Fly", sets: 4, reps: 12, weight: 0 },
            ],
          },
          {
            day: "Day 2 - Back",
            exercises: [
              { name: "Deadlift", sets: 5, reps: 5, weight: 0 },
              { name: "Pull-ups", sets: 4, reps: 10, weight: 0 },
              { name: "Barbell Row", sets: 4, reps: 8, weight: 0 },
            ],
          },
          {
            day: "Day 3 - Legs",
            exercises: [
              { name: "Squats", sets: 5, reps: 5, weight: 0 },
              { name: "Leg Press", sets: 4, reps: 10, weight: 0 },
              { name: "Romanian Deadlift", sets: 4, reps: 10, weight: 0 },
            ],
          },
          {
            day: "Day 4 - Shoulders",
            exercises: [
              { name: "Overhead Press", sets: 4, reps: 8, weight: 0 },
              { name: "Lateral Raises", sets: 4, reps: 12, weight: 0 },
            ],
          },
          {
            day: "Day 5 - Arms",
            exercises: [
              { name: "Barbell Curl", sets: 4, reps: 10, weight: 0 },
              { name: "Skull Crushers", sets: 4, reps: 10, weight: 0 },
            ],
          },
        ];
      }
      if (goal === "Fat Loss" && experience === "Beginner") {
        plan = [
          {
            day: "Day 1 - Full Body",
            exercises: [
              { name: "Squats", sets: 3, reps: 12, weight: 0 },
              { name: "Push-ups", sets: 3, reps: 10, weight: 0 },
              { name: "Plank", sets: 3, reps: 30, weight: 0 },
            ],
          },
          {
            day: "Day 2 - Cardio",
            exercises: [
              { name: "Walking", sets: 1, reps: 30, weight: 0 },
            ],
          },
        ];
      }
      if (goal === "Fat Loss" && experience === "Intermediate") {
        plan = [
          {
            day: "Day 1 - Upper Body",
            exercises: [
              { name: "Bench Press", sets: 3, reps: 10, weight: 0 },
              { name: "Pull-ups", sets: 3, reps: 8, weight: 0 },
            ],
          },
          {
            day: "Day 2 - Lower Body",
            exercises: [
              { name: "Squats", sets: 4, reps: 10, weight: 0 },
              { name: "Lunges", sets: 3, reps: 12, weight: 0 },
            ],
          },
          {
            day: "Day 3 - HIIT",
            exercises: [
              { name: "Burpees", sets: 4, reps: 15, weight: 0 },
              { name: "Mountain Climbers", sets: 4, reps: 20, weight: 0 },
            ],
          },
        ];
      }
      if (goal === "Fat Loss" && experience === "Advanced") {
        plan = [
          {
            day: "Day 1 - Push + HIIT",
            exercises: [
              { name: "Bench Press", sets: 4, reps: 8, weight: 0 },
              { name: "Burpees", sets: 4, reps: 20, weight: 0 },
            ],
          },
          {
            day: "Day 2 - Pull + Cardio",
            exercises: [
              { name: "Deadlift", sets: 4, reps: 6, weight: 0 },
              { name: "Running", sets: 1, reps: 30, weight: 0 },
            ],
          },
          {
            day: "Day 3 - Legs + Core",
            exercises: [
              { name: "Squats", sets: 4, reps: 8, weight: 0 },
              { name: "Plank", sets: 4, reps: 45, weight: 0 },
            ],
          },
        ];
      }
  
    // simulate delay
    await new Promise((res) => setTimeout(res, 1200));
  
    return Response.json({
      success: true,
      data: plan,
    });
  }