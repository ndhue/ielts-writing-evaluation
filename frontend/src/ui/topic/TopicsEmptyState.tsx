import { Button } from "@/components";
import { useRouter } from "next/navigation";

const TopicsEmptyState = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center py-12 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-medium text-slate-700 mb-2">No topics yet</h3>
      <p className="text-slate-500 mb-6">
        You haven&apos;t generated any topics. Start creating your first IELTS
        topic.
      </p>
      <Button
        label="Generate Topic"
        onClick={() => router.push("/")}
        className="rounded-md"
      />
    </div>
  );
};

export default TopicsEmptyState;
