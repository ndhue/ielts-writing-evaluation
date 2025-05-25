"use client";

import { useAuth } from "@/hooks";
import { useTopics } from "@/hooks/useTopics";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TopicCard from "./TopicCard";
import TopicsEmptyState from "./TopicsEmptyState";
import TopicsLoadingState from "./TopicsLoadingState";

const TopicsList = () => {
  const { topics, isLoading } = useTopics();
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated && mounted) {
      router.push("/auth");
    }
  }, [isAuthenticated, isLoading, mounted, router]);

  if (isLoading) {
    return <TopicsLoadingState />;
  }

  if (!topics || topics.length === 0) {
    return <TopicsEmptyState />;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {topics.map((topic) => (
        <TopicCard key={topic._id} topic={topic} />
      ))}
    </div>
  );
};

export default TopicsList;
