import { Button } from "@/components";
import { useRouter } from "next/navigation";

const EvaluationsEmptyState = () => {
  const router = useRouter();

  return (
    <div className="my-8 text-center py-12 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">No Evaluations Yet</h1>
      <p className="text-gray-600 mb-6">
        You haven&apos;t submitted any essays for evaluation yet.
      </p>
      <Button
        label="Write an Essay"
        onClick={() => router.push("/")}
        className="mx-auto"
      />
    </div>
  );
};

export default EvaluationsEmptyState;
