const TopicsLoadingState = () => {
  return (
    <div className="w-full">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="mb-6 bg-white rounded-lg shadow-md border border-gray-200 p-6 animate-pulse"
        >
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-slate-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-purple-100 rounded w-16"></div>
            <div className="h-6 bg-purple-100 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopicsLoadingState;
