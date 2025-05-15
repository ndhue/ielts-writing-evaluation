import { TopicCard } from "@/ui/topic";

const TopicsPage = () => {
  return (
    <div className="my-4">
      <h1 className="font-bold text-3xl mb-4">Generated Topic History</h1>
      <div className="flex flex-col items-center justify-center gap-8 w-[70%] mx-auto">
        <TopicCard />
      </div>
    </div>
  );
};

export default TopicsPage;
