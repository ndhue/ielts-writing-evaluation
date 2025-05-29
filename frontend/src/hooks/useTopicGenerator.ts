"use client";

import { useAuth, useShowNoti } from "@/hooks";
import { copyToClipboard } from "@/utils/utils";
import { useState } from "react";

export interface GeneratedTopic {
  topic_id: string;
  topic: string;
  description: string;
  keywords: string[];
  created_by?: string;
  created_at?: string;
}

export function useTopicGenerator() {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTopic, setGeneratedTopic] = useState<GeneratedTopic | null>(
    null
  );
  const { showSuccess, showError } = useShowNoti();
  const { authFetch, isAuthenticated } = useAuth();

  const handleCopy = async () => {
    const isSuccess = await copyToClipboard(topic);

    if (isSuccess) {
      showSuccess({ message: "Copied to clipboard" });
    } else {
      showError({ message: "Failed to copy" });
    }
  };

  const addKeyword = (keyword: string) => {
    if (!keywords.includes(keyword.trim()) && keyword.trim() !== "") {
      setKeywords([...keywords, keyword.trim()]);
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((item) => item !== keyword));
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      addKeyword(inputValue);
      setInputValue("");
    }
  };

  const clearKeywords = () => {
    setKeywords([]);
  };

  const generateTopic = async () => {
    if (keywords.length === 0) {
      showError({ message: "Please add at least one keyword" });
      return;
    }

    if (!isAuthenticated) {
      showError({ message: "Please login to generate topics" });
      return;
    }

    setIsLoading(true);
    setTopic("");
    setDescription("");
    setGeneratedTopic(null);

    try {
      const response = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/topic/generate`,
        {
          method: "POST",
          body: JSON.stringify({ keywords }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate topic");
      }

      const result = await response.json();

      if (result.success && result.data) {
        setTopic(result.data.topic);
        setDescription(result.data.description);
        setGeneratedTopic(result.data);
        showSuccess({ message: "Topic generated successfully" });
      } else {
        throw new Error("No topic was generated");
      }
    } catch (error) {
      console.error("Generate topic error:", error);
      showError({
        message:
          error instanceof Error ? error.message : "Failed to generate topic",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    topic,
    description,
    keywords,
    inputValue,
    isLoading,
    generatedTopic,
    isAuthenticated,
    addKeyword,
    removeKeyword,
    handleInputChange,
    handleKeyDown,
    clearKeywords,
    generateTopic,
    handleCopy,
  };
}

export default useTopicGenerator;
