const DashboardSkeleton = () => {
    return (
      <div className="min-h-screen bg-base-200 px-4 py-6 md:px-10 animate-pulse">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div>
            <div className="h-8 w-40 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-52 bg-gray-300 rounded"></div>
          </div>
  
          <div className="flex gap-3">
            <div className="h-10 w-32 bg-gray-300 rounded-xl"></div>
            <div className="h-10 w-24 bg-gray-300 rounded-xl"></div>
          </div>
        </div>
  
        {/* Streak Card */}
        <div className="bg-base-100 p-6 rounded-2xl shadow mb-8 border border-base-300 flex justify-between items-center">
          <div>
            <div className="h-3 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 w-20 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 w-32 bg-gray-300 rounded"></div>
          </div>
          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        </div>
  
        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div
              key={i}
              className="bg-base-100 p-5 rounded-2xl shadow border border-base-300"
            >
              {/* Date */}
              <div className="h-4 w-24 bg-gray-300 rounded mb-4"></div>
  
              {/* Exercises */}
              <div className="space-y-3">
                {[1, 2].map((_, j) => (
                  <div
                    key={j}
                    className="bg-base-200 p-3 rounded-xl border border-base-300"
                  >
                    <div className="h-4 w-28 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 w-20 bg-gray-300 rounded mb-1"></div>
                    <div className="h-3 w-16 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default DashboardSkeleton;