"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  };

  const overallRating = useMemo(() => {
    if (feedbackList && feedbackList.length > 0) {
      const totalRating = feedbackList.reduce(
        (sum, item) => sum + Number(item.rating),
        0
      );
      // console.log("total",totalRating);
      // console.log("length",feedbackList.length);
      return (totalRating / feedbackList.length).toFixed(1);
    }
    return 0;
  }, [feedbackList]);

  return (
    <div className="p-10 space-y-8 text-white">
      {feedbackList?.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500 my-5">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-green-400 glow-sm">🎉 Congratulations</h2>
            <h2 className="text-2xl font-semibold text-white">Here is your interview feedback</h2>
            <h2 className="text-lg text-gray-300">
              Your overall interview rating{" "}
              <strong
                className={`text-2xl font-bold ${overallRating >= 5 ? "text-green-400" : "text-red-500"
                  }`}
              >
                {overallRating}
                <span className="text-white text-base font-medium"> /10</span>
              </strong>
            </h2>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              Below are your interview questions with correct answers, your answers, and feedback for improvement.
            </p>
          </div>

          {/* Feedback List */}
          <div className="space-y-6">
            {feedbackList.map((item, index) => (
              <Collapsible key={index} className="rounded-xl border border-gray-700 overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                <CollapsibleTrigger className="p-4 bg-gradient-to-r from-blue-900/40 to-purple-900/40 text-left flex justify-between items-center w-full text-white hover:bg-blue-900/60 transition rounded-xl">
                  <span className="font-semibold text-base">{item.question}</span>
                  <ChevronDown className="h-5 w-5 text-gray-300" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="bg-slate-900/50 p-4 space-y-3 rounded-b-xl">
                    <h2 className="text-sm font-medium text-red-400 border border-red-500 rounded-lg p-2">
                      <strong>Rating:</strong> {item.rating}
                    </h2>
                    <h2 className="text-sm text-red-300 bg-red-900/30 border border-red-500 rounded-lg p-3">
                      <strong>Your Answer:</strong> {item.userAns}
                    </h2>
                    <h2 className="text-sm text-green-300 bg-green-900/20 border border-green-500 rounded-lg p-3">
                      <strong>Correct Answer:</strong> {item.correctAns}
                    </h2>
                    <h2 className="text-sm text-blue-300 bg-blue-900/20 border border-blue-500 rounded-lg p-3">
                      <strong>Feedback:</strong> {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </>
      )}

      {/* CTA Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => router.replace("/dashboard")}
          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
        >
          Go Home
        </Button>
      </div>
    </div>

  );
};

export default Feedback;
