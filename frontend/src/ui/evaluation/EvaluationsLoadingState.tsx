const EvaluationsLoadingState = () => {
  return (
    <div className="my-8 space-y-6">
      <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-6"></div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <div className="h-6 bg-gray-200 w-3/4 rounded-md animate-pulse"></div>
              <div className="h-4 bg-gray-200 w-1/4 rounded-md animate-pulse mt-2"></div>
            </div>
            <div className="bg-gray-200 rounded-full h-16 w-16 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EvaluationsLoadingState;
