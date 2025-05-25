"use client";

import { Button, Chip, Input, Textarea } from "@/components";
import { CopyIcon, SearchIcon } from "@/components/icons";
import { commonTopics, commonTypes } from "@/const/ielts-const";
import { useTopicGenerator } from "@/hooks/useTopicGenerator";

const GenerateTopicForm = () => {
  const {
    topic,
    description,
    keywords,
    inputValue,
    isLoading,
    addKeyword,
    removeKeyword,
    handleInputChange,
    handleKeyDown,
    generateTopic,
    handleCopy,
  } = useTopicGenerator();

  return (
    <div className="flex flex-col gap-4 text-slate-500 w-[650px]">
      <div className="flex items-center gap-2">
        <div className="search-input relative min-w-[600px] rounded-full border border-border flex items-center px-4">
          <SearchIcon className="size-5 absolute top-1/2 right-3 -translate-y-1/2" />
          <Input
            className="py-2.5 border-none"
            placeholder="Type keyword and press Enter"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
        </div>
        <Button
          label="Go"
          className="rounded-lg"
          onClick={generateTopic}
          disabled={isLoading || keywords.length === 0}
        />
      </div>
      {renderKeywords(keywords, removeKeyword)}

      {renderCommons("Common topics", commonTopics, addKeyword)}
      {renderCommons("Common types", commonTypes, addKeyword)}
      <div className="result">
        <p className="text-sm mb-2">Result</p>
        <div className="relative">
          <Textarea
            rows={6}
            value={
              topic
                ? `${topic}\n\n${description}`
                : "Generated topic will appear here..."
            }
            disabled={true}
            className={topic ? "text-slate-700" : "text-slate-400 italic"}
          />
          {topic && (
            <div
              className="absolute top-1.5 right-1.5 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              onClick={handleCopy}
            >
              <CopyIcon className="size-5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const renderKeywords = (
  keywords: string[],
  onDelete: (value: string) => void
) => {
  if (keywords.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
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

const renderCommons = (
  title: string,
  list: string[],
  onAdd: (item: string) => void
) => {
  return (
    <div>
      <p className="font-medium text-sm mb-2">{title}</p>
      <div className="flex items-center gap-2 flex-wrap">
        {list.map((item) => (
          <Chip
            key={item}
            label={item}
            variant="outlined"
            className="cursor-pointer hover:bg-purple-50"
            onClick={() => onAdd(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default GenerateTopicForm;
