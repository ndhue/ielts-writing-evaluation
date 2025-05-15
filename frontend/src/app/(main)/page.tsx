import { MainTitle, ScoreBox, WritingForm } from "@/ui/home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        draggable
        pauseOnHover
      />
      <MainTitle />
      <div className="grid grid-cols-5 gap-4 my-4">
        <div className="col-span-3">
          <WritingForm />
        </div>
        <div className="col-span-2 flex flex-col gap-6">
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="font-semibold text-gray-800">
              Est. Overall Band Score
            </div>
            <div className="text-5xl font-bold text-purple-600">
              {0.5}
            </div>
            <div className="text-xs text-gray-600 mt-1">(+/- 0.5)</div>
          </div>
          <ScoreBox label="Grammar" score={0} />
          <ScoreBox label="Grammar" score={0} />
          <ScoreBox label="Grammar" score={0} />
          <ScoreBox label="Grammar" score={0} />
        </div>
      </div>
    </>
  );
}
