"use client";

import { Button, Textarea } from "@/components";
import { ClockIcon, FantasyIcon } from "@/components/icons";
import { ChangeEvent, useState } from "react";

const WritingForm = () => {
  const [topic, setTopic] = useState("");
  const [essay, setEssay] = useState("");

  const handleChangeTopic = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTopic(e.target.value);
  };

  const handleChangeEssay = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEssay(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="topic">
        <label className="text-sm font-medium">Topic</label>
        <Textarea rows={4} value={topic} onChange={handleChangeTopic} />
        <div className="buttons mt-2 flex gap-2">
          <Button
            variant="icon"
            icon={<FantasyIcon />}
            label="Generate topic"
            className="border-none bg-purple-400 text-purple-600 px-2.5 py-1.5 rounded-full hover:bg-purple-300 hover:text-purple-500"
          />
          <Button
            variant="icon"
            icon={<ClockIcon />}
            label="Track time"
            className="border-none bg-purple-600 text-purple-50 px-2.5 py-1.5 rounded-full hover:bg-purple-500"
          />
        </div>
      </div>
      <div className="essay">
        <label className="text-sm font-medium">Essay</label>
        <Textarea rows={16} value={essay} onChange={handleChangeEssay} />
        <p>Word count: 0</p>
      </div>
      <div className="flex justify-center">
        <Button variant="primary" label="Submit" className="w-40" />
      </div>
    </div>
  );
};

export default WritingForm;
