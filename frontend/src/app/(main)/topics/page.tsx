"use client";

import { TopicsList } from "@/ui/topic";
import { ToastContainer } from "react-toastify";

const TopicsPage = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        draggable
        pauseOnHover
      />
      <div className="my-8 max-w-4xl mx-auto">
        <h1 className="font-bold text-3xl mb-6 text-slate-800">
          Your Generated Topics
        </h1>
        <TopicsList />
      </div>
    </>
  );
};

export default TopicsPage;
