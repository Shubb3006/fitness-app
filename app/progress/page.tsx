"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const page = () => {
  const { user } = useUser();
  const [weight, setWeight] = useState("");
  const [fat, setFat] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [weightLogs, setWeightLogs] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    async function fetchWeights() {
      const { data, error } = await supabase
        .from("progress")
        .select("weight_kg,body_fat_pct,date")
        .eq("user_id", user?.id)
        .order("date", { ascending: true });
      if (error) console.log(error);
      else setWeightLogs(data || []);
    }

    fetchWeights();
  }, [user?.id]);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!weight || !fat) return alert("Please fill all fields");
    setLoading(true);
    const { data, error } = await supabase.from("progress").insert({
      user_id: user?.id,
      date: new Date(),
      weight_kg: parseFloat(weight),
      body_fat_pct: parseFloat(fat),
    });
    setLoading(false);
    if (error) {
      console.error(error.message);
      alert("Error saving data");
    } else {
      setWeight("");
      setFat("");
      setSuccess("✅ Progress saved!");
      setTimeout(() => setSuccess(""), 3000);

      const { data: updatedData } = await supabase
        .from("progress")
        .select("weight_kg,body_fat_pct, date")
        .eq("user_id", user?.id)
        .order("date", { ascending: true });

      setWeightLogs(updatedData || []);
    }
  }

  const chartData = {
    labels: weightLogs.map((entry) =>
      new Date(entry.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Weight (kg)",
        data: weightLogs.map((entry) => entry.weight_kg),
        borderColor: "rgb(59, 130, 246)", // blue-600
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
        fill: true,
        yAxisID: "y1",
      },
      {
        label: "Body Fat (%)",
        data: weightLogs.map((entry) => entry.body_fat_pct),
        borderColor: "rgb(234, 88, 12)", // orange
        backgroundColor: "rgba(234, 88, 12, 0.2)",
        tension: 0.3,
        fill: true,
        yAxisID: "y2",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y1: {
        type: "linear",
        position: "left",
        title: { display: true, text: "Weight (kg)" },
      },
      y2: {
        type: "linear",
        position: "right",
        title: { display: true, text: "Body Fat (%)" },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        📊 Track Progress
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Weight (kg)</label>
          <input
            type="number"
            name="weight_kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Body Fat (%)</label>
          <input
            type="number"
            name="body_fat_pct"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Save Progress"}
        </button>

        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      </form>
      {weightLogs.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            📉 Weight Progress Chart
          </h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default page;
