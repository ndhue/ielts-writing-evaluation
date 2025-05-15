import { CopyIcon, TrashIcon } from "@/components/icons";

const TopicCard = () => {
  return (
    <div className="text-slate-500 text-sm font-light">
      <p className="mb-2">24/04/2025 08:30</p>
      <div className="flex gap-4 items-center">
        <div className="group relative p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <TrashIcon className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="bg-white m-1 ring ring-slate-200 shadow-md rounded-2xl p-4 flex items-start gap-4">
          <div className="flex flex-col gap-3">
            <span>
              <span className="text-purple-600 font-medium mr-2">Topic:</span>
              Interviews form the basic criteria for most large companies.
              However, some people think that the interview is not a reliable
              method of choosing whom to employ and there are other better
              methods.
            </span>
            <div className="flex items-center">
              <span className="text-purple-600 font-medium mr-2">Keyword:</span>
            </div>
          </div>
          <div className="group relative p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <CopyIcon className="size-6 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
