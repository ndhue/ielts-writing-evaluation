"use client";

import { Button } from "@/components";
import { ClockIcon, PlayIcon, RefreshIcon } from "@/components/icons";
import { useDisclosure, useShowNoti } from "@/hooks";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

const commonTimes = [20, 30, 40, 60];

const TrackTimeDialog = () => {
  const { showInfo } = useShowNoti();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [customMinutes, setCustomMinutes] = useState<number | "">("");
  const [timer, setTimer] = useState({
    duration: 0, // in seconds
    isRunning: false,
    startTime: 0,
    elapsedTime: 0,
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Close when clicking outside the dialog
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Timer logic
  const startTimer = (minutes = 0) => {
    const duration = minutes * 60; // convert to seconds
    setTimer({
      duration,
      isRunning: true,
      startTime: Date.now(),
      elapsedTime: timer.isRunning
        ? timer.elapsedTime + (Date.now() - timer.startTime)
        : timer.elapsedTime,
    });
    setIsPaused(false);
    onClose();
  };

  const stopTimer = () => {
    setTimer((prev) => ({
      ...prev,
      isRunning: false,
      elapsedTime: prev.elapsedTime + (Date.now() - prev.startTime),
    }));
    setIsPaused(true);
  };

  const continueTimer = () => {
    setTimer((prev) => ({
      ...prev,
      isRunning: true,
      startTime: Date.now(),
    }));
    setIsPaused(false);
  };

  const resetTimer = () => {
    setTimer({
      duration: 0,
      isRunning: false,
      startTime: 0,
      elapsedTime: 0,
    });
    setIsPaused(false);
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer.isRunning) {
      interval = setInterval(() => {
        const elapsed = timer.elapsedTime + (Date.now() - timer.startTime);
        const totalSeconds = Math.floor(elapsed / 1000);

        // Update current time to force re-render
        setCurrentTime(totalSeconds);

        if (timer.duration > 0 && totalSeconds >= timer.duration) {
          stopTimer();
          showInfo({
            message: "Time's up! Please submit your essay.",
            position: "top-center",
          });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer, showInfo]);

  const displayTime = timer.isRunning
    ? formatTime(
        Math.floor((timer.elapsedTime + (Date.now() - timer.startTime)) / 1000)
      )
    : timer.elapsedTime > 0
    ? formatTime(Math.floor(timer.elapsedTime / 1000))
    : null;

  const handleStartTracking = () => {
    startTimer(0); // Start tracking without time limit
  };

  const handleStartTimer = (minutes: number) => {
    startTimer(minutes);
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setCustomMinutes("");
    } else {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue > 0) {
        setCustomMinutes(numValue);
      }
    }
  };

  const handleCustomTimeSubmit = () => {
    if (customMinutes !== "" && customMinutes > 0) {
      startTimer(customMinutes);
    }
  };

  return (
    <>
      {timer.isRunning ? (
        <Button
          type="button"
          variant="icon"
          label={displayTime || "Stop"}
          onClick={stopTimer}
          className="border-none bg-red-500 text-purple-50 py-1.5 rounded-full hover:bg-red-600 w-29"
          key={currentTime}
        />
      ) : isPaused ? (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="icon"
            icon={<PlayIcon />}
            label="Continue"
            onClick={continueTimer}
            className="border-none bg-green-600 text-purple-50 py-1.5 rounded-full hover:bg-green-500 w-29"
          />
          <Button
            type="button"
            variant="icon"
            icon={<RefreshIcon />}
            label="Reset"
            onClick={resetTimer}
            className="border-none bg-purple-600 text-purple-50 px-2.5 py-1.5 rounded-full hover:bg-purple-500"
          />
        </div>
      ) : (
        <Button
          type="button"
          variant="icon"
          icon={<ClockIcon />}
          label={displayTime || "Track time"}
          className="border-none bg-purple-600 text-purple-50 py-1.5 rounded-full hover:bg-purple-500 w-29"
          onClick={onOpen}
        />
      )}
      <div
        className={cn("fixed inset-0 bg-[#7A69D1] opacity-60 z-40", {
          hidden: !isOpen,
        })}
      />
      <div
        className={cn("fixed z-50 inset-0 flex items-center justify-center", {
          hidden: !isOpen,
        })}
      >
        <div ref={dialogRef} className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold mb-4">Track Writing Time</h2>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Set a time limit</p>
              <div className="flex flex-wrap gap-2">
                {commonTimes.map((time) => (
                  <Button
                    key={time}
                    label={`${time} min`}
                    onClick={() => handleStartTimer(time)}
                    className="rounded-full px-4"
                    type="button"
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Custom time</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={customMinutes}
                  onChange={handleCustomTimeChange}
                  min="1"
                  className="border border-gray-300 rounded-md px-3 py-2 w-24"
                  placeholder="Minutes"
                />
                <Button
                  type="button"
                  label="Start"
                  onClick={handleCustomTimeSubmit}
                  disabled={customMinutes === "" || customMinutes <= 0}
                  className="rounded-md"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm font-medium mb-2">
                Or just track time spent
              </p>
              <Button
                type="button"
                label="Start tracking"
                onClick={handleStartTracking}
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackTimeDialog;
