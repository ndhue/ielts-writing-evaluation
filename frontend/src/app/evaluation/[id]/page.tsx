"use client";
import { Button } from "@/components";
import { useShowNoti } from "@/hooks";
import React from "react";

const Evaluation = () => {
  const { showSuccess } = useShowNoti();
  return (
    <div>
      <Button onClick={() => showSuccess({ message: "this is a message" })} />
    </div>
  );
};

export default Evaluation;
