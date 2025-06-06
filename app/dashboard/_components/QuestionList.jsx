"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import QuestionItemCard from "./QuestionItemCard";
import { Skeleton } from "@/components/ui/skeleton";

const QuestionList = () => {
  const { user } = useUser();
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true); // 🔥 Add this

  useEffect(() => {
    if (user) {
      GetQuestionList();
    }
  }, [user]);

  const GetQuestionList = async () => {
    try {
      const result = await db
        .select()
        .from(Question)
        .where(eq(Question.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Question.id));

      setQuestionList(result);
    } catch (error) {
      console.error("Failed to load questions:", error);
    } finally {
      setLoading(false); // 🔥 Mark loading done
    }
  };

  if (loading) {
    return (
      <div className="my-10 flex flex-col gap-5">
        <Skeleton className="w-full sm:w-[20rem] h-10 rounded-full bg-muted animate-pulse" />
        <Skeleton className="w-full sm:w-[20rem] h-10 rounded-full bg-muted animate-pulse" />
        <Skeleton className="w-full sm:w-[20rem] h-10 rounded-full bg-muted animate-pulse" />
      </div>
    );
  }

  if (questionList.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-10">
        You have not asked about any PYQs.
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {questionList.map((question, index) => (
          <QuestionItemCard key={index} question={question} />
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
