"use client";

import { commonTopics, commonTypes } from "@/app/const/ielts-const";
import { Button, Chip, Input, Textarea } from "@/components";
import { CopyIcon, SearchIcon } from "@/components/icons";
import { useShowNoti } from "@/hooks";
import { copyToClipboard } from "@/utils/utils";
import { useState } from "react";

const GenerateTopicForm = () => {
  const [topic, setTopic] = useState("an example topic");
  const [keywords, setKeywords] = useState<string[]>(["Opinion", "Health"]);
  const [inputValue, setInputValue] = useState("");
  const { showSuccess, showError } = useShowNoti();

  const handleCopy = async () => {
    const isSuccess = await copyToClipboard(topic);

    if (isSuccess) {
      showSuccess({ message: "Copied to clipboard" });
    } else {
      showError({ message: "Failed to copy" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      setKeywords([...keywords, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteKeyword = (keyword: string) => {
    setKeywords(keywords.filter((item) => item !== keyword));
  };

  return (
    <div className="flex flex-col gap-4 text-slate-500">
      <div className="flex items-center gap-2">
        <div className="search-input relative min-w-[600px] rounded-full border border-border flex items-center px-4">
          <SearchIcon className="size-5 absolute top-1/2 right-3 -translate-y-1/2" />
          {renderKeywords(keywords, handleDeleteKeyword)}
          <Input
            className="py-2.5 border-none"
            placeholder="Type keywords and press Enter"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button label="Go" className="rounded-lg" />
      </div>
      {renderCommons("Common topics", commonTopics)}
      {renderCommons("Common types", commonTypes)}
      <div className="result">
        <p className="text-sm mb-2">Result</p>
        <div className="relative">
          <Textarea rows={4} defaultValue={topic} />
          <div
            className="absolute top-1.5 right-1.5 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            onClick={handleCopy}
          >
            <CopyIcon className="size-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

const renderKeywords = (
  keywords: string[],
  onDelete: (value: string) => void
) => {
  return (
    <div className="flex items-center gap-2">
      {keywords.map((item, index) => (
        <Chip
          key={index}
          label={item}
          variant="outlined"
          onDelete={() => onDelete(item)}
        />
      ))}
    </div>
  );
};

const renderCommons = (title: string, list: string[]) => {
  return (
    <div>
      <p className="font-medium text-sm mb-2">{title}</p>
      <div className="flex items-center gap-2">
        {list.map((item) => (
          <Chip key={item} label={item} variant="outlined" />
        ))}
      </div>
    </div>
  );
};

export default GenerateTopicForm;
