"use client";

import { Button, Textarea } from "@/components";
import { ChangeEvent, useState } from "react";
import GenerateTopicDialog from "./GenerateTopicDialog";
import TrackTimeDialog from "./TrackTimeDialog";

const WritingForm = () => {
  const [topic, setTopic] = useState("");
  const [essay, setEssay] = useState("");

  const handleChangeTopic = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTopic(e.target.value);
  };

  const handleChangeEssay = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEssay(e.target.value);
  };

  // Calculate word count
  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="topic">
        <label className="text-sm font-medium">Topic</label>
        <Textarea rows={4} value={topic} onChange={handleChangeTopic} />
        <div className="buttons mt-2 flex gap-2">
          <GenerateTopicDialog />
          <TrackTimeDialog />
        </div>
      </div>
      <div className="essay">
        <label className="text-sm font-medium">Essay</label>
        <Textarea rows={16} value={essay} onChange={handleChangeEssay} />
        <p>Word count: {wordCount}</p>
      </div>
      <div className="flex justify-center">
        <Button variant="primary" label="Submit" className="w-40" />
      </div>
    </div>
  );
};

export default WritingForm;
