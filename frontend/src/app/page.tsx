import { CriterionScoreCircle, LoadingDialog, ScoreCircle } from "@/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";

export default function Home() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        draggable
        pauseOnHover
      />
      <div className="w-[400px] h-screen gap-4 flex justify-center items-center">
        <ScoreCircle score={8.5} />
        <CriterionScoreCircle score={5.0} />
        <CriterionScoreCircle score={7.0} color="#4ac7c4" />
        <LoadingDialog />
      </div>
    </>
  );
}
