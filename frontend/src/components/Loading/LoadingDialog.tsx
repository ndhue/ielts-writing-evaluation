"use client";

import { useState, useEffect } from "react";
import {
  CauldronIcon,
  MagicCrystalIcon,
  MagicianIcon,
  ManaIcon,
  WizardIcon,
} from "../icons";

const data = [
  {
    loadingMessage: "Scoring in progress… get ready for awesome results!",
    tip: "💡 Tip: Using linking words like 'However', 'In addition', and 'On the other hand' can boost your coherence score!",
    icon: <MagicCrystalIcon />,
  },
  {
    loadingMessage: "We’re giving your essay a little magic touch…",
    tip: "💡 Tip: Vary your vocabulary! Instead of always saying 'important', try 'crucial', 'essential', or 'significant.'",
    icon: <MagicianIcon />,
  },
  {
    loadingMessage: "Turning your ideas into feedback magic…",
    tip: "💡 Tip: Don’t forget to paraphrase the question in your introduction — it shows good understanding and boosts your Task Achievement!",
    icon: <ManaIcon />,
  },
  {
    loadingMessage: "Good things take time… we’re almost there!",
    tip: "💡 Tip: Support your ideas with clear examples — it makes your argument stronger and more convincing!",
    icon: <WizardIcon />,
  },
  {
    loadingMessage: "Your words are being read carefully… hang tight!",
    tip: "💡 Tip: Avoid repeating the same words too often — use synonyms to show off your lexical range!",
    icon: <CauldronIcon />,
  },
];

const LoadingDialog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-layer z-50">
      <div className="fixed w-[510px] h-[280px] rounded-[10px] bg-purple-600 py-8 px-12 text-white text-center">
        <div className="flex flex-col justify-center items-center">
          <p className="font-semibold text-[22px]">
            {data[currentIndex].loadingMessage}
          </p>
          <div className="flex space-x-1 my-4">
            <span className="size-2 bg-white rounded-full animate-bounce"></span>
            <span className="size-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="size-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
          <div className="animate-pulse my-2 [&>svg]:size-12">{data[currentIndex].icon}</div>
          <p className="mt-2 text-xs">{data[currentIndex].tip}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingDialog;
