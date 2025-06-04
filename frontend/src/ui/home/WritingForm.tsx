"use client";

import { Button, LoadingDialog, Textarea } from "@/components";
import { AIEvaluation, useEssayEvaluation } from "@/hooks/useEssayEvaluation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GenerateTopicDialog from "./GenerateTopicDialog";
import TrackTimeDialog from "./TrackTimeDialog";

const formSchema = z.object({
  topic: z.string().min(10, "Topic must be at least 10 characters"),
  essay: z.string().min(100, "Essay must be at least 100 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const WritingForm = ({
  handleShowEvaluation,
}: {
  handleShowEvaluation: (result: AIEvaluation | null) => void;
}) => {
  const { submitEssay, isSubmitting, isAuthenticated } = useEssayEvaluation();
  const [wordCount, setWordCount] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      essay: "",
    },
  });

  const essayText = watch("essay");

  // Count words when essay changes
  const countWords = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  // Update word count on essay change
  useState(() => {
    if (essayText) {
      setWordCount(countWords(essayText));
    }
  });

  const onSubmit = (data: FormValues) => {
    submitEssay(data, {
      onSuccess: (result) => handleShowEvaluation(result.evaluation),
    });
  };

  return (
    <div className="bg-white px-6 py-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="topic mb-4">
          <label
            htmlFor="topic"
            className="block font-medium text-gray-700 mb-1"
          >
            Topic
          </label>
          <Textarea
            {...register("topic")}
            placeholder="Enter the writing topic here..."
            className="border border-gray-300 rounded-md"
            rows={3}
            disabled={isSubmitting}
          />
          {errors.topic && (
            <p className="text-red-500 text-xs mt-1">{errors.topic.message}</p>
          )}

          <div className="buttons mt-2 flex gap-2">
            <GenerateTopicDialog />
            <TrackTimeDialog />
          </div>
        </div>

        <div className="essay">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="essay" className="block font-medium text-gray-700">
              Essay
            </label>
            <span className="text-xs text-gray-500">
              {wordCount} words{" "}
              {isAuthenticated ? "" : "(Login to save your results)"}
            </span>
          </div>
          <Textarea
            {...register("essay")}
            placeholder="Write your essay here..."
            className="border border-gray-300 rounded-md"
            rows={12}
            disabled={isSubmitting}
            onChange={(e) => setWordCount(countWords(e.target.value))}
          />
          {errors.essay && (
            <p className="text-red-500 text-xs mt-1">{errors.essay.message}</p>
          )}
        </div>

        <div className="mt-6">
          <Button
            variant="primary"
            label={isSubmitting ? "Evaluating..." : "Evaluate Essay"}
            className="w-full py-3 rounded-md text-base font-medium"
            disabled={isSubmitting}
            type="submit"
          />
        </div>
      </form>

      {/* Loading Dialog */}
      {isSubmitting && <LoadingDialog />}
    </div>
  );
};

export default WritingForm;
