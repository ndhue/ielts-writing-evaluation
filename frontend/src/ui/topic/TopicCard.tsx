import { Chip } from "@/components";
import { CopyIcon, TrashIcon } from "@/components/icons";
import { Topic, useShowNoti, useTopics } from "@/hooks";
import { copyToClipboard } from "@/utils/utils";
import { format } from "date-fns";
import { useState } from "react";
import RemoveTopicDialog from "./RemoveTopicDialog";

interface TopicCardProps {
  topic: Topic;
}

const TopicCard = ({ topic }: TopicCardProps) => {
  const { topic: topicText, keywords, created_at, description } = topic;
  const { showSuccess, showError } = useShowNoti();
  const { removeTopic } = useTopics();
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleCopy = async () => {
    const isSuccess = await copyToClipboard(topicText);

    if (isSuccess) {
      showSuccess({ message: "Copied to clipboard" });
    } else {
      showError({ message: "Failed to copy" });
    }
  };

  const handleRemoveClick = () => {
    setShowRemoveDialog(true);
  };

  const handleRemoveConfirm = async () => {
    setIsRemoving(true);
    const success = await removeTopic(topic._id);
    if (success) {
      setShowRemoveDialog(false);
    }
    setIsRemoving(false);
  };

  return (
    <>
      <div className="text-slate-500 text-sm font-light">
        <p className="mb-2">
          {format(new Date(created_at), "dd/MM/yyyy hh:MM")}
        </p>
        <div className="flex gap-4 items-center">
          <div
            className="group relative p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
            onClick={handleRemoveClick}
          >
            <TrashIcon className="w-6 h-6 cursor-pointer text-red-500 hover:text-red-600" />
          </div>
          <div className="bg-white m-1 ring ring-slate-200 shadow-md rounded-2xl p-4 flex items-start gap-4">
            <div className="flex flex-col gap-3">
              <span>
                <span className="text-purple-600 font-medium mr-2">Topic:</span>
                {topicText}
              </span>
              <span>
                <span className="text-purple-600 font-medium mr-2">
                  Description:
                </span>
                {description}
              </span>
              <div className="flex items-center">
                <span className="text-purple-600 font-medium mr-2">
                  Keyword:
                </span>
                {renderKeywords(keywords)}
              </div>
            </div>
            <div
              className="group relative p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
              onClick={handleCopy}
            >
              <CopyIcon className="size-6 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <RemoveTopicDialog
        open={showRemoveDialog}
        onClose={() => setShowRemoveDialog(false)}
        onConfirm={handleRemoveConfirm}
        isLoading={isRemoving}
        topicTitle={topicText}
      />
    </>
  );
};

const renderKeywords = (keywords: string[]) => {
  if (keywords.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {keywords.map((item, index) => (
        <Chip key={index} label={item} variant="outlined" />
      ))}
    </div>
  );
};

export default TopicCard;
