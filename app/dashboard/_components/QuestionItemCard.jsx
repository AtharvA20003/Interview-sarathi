import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

const QuestionItemCard = ({ question }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/pyq/" + question?.mockId);
  };
  return (
    <div className="group relative p-5 rounded-2xl border border-gray-800 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 hover:from-slate-800 hover:to-slate-700 transition-all duration-500 overflow-hidden">

      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

      {/* Blur Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500 -z-10"></div>

      {/* Card Content */}
      <div className="relative z-10">
        <h2 className="text-lg font-semibold text-white">{question?.jobPosition}</h2>
        <h3 className="text-sm text-blue-400 mt-1">
          {question?.jobExperience} Years of Experience
        </h3>
        <h4 className="text-xs text-gray-400 mt-1">
          Created At: {question?.createdAt}
        </h4>

        <div className="mt-4">
          <Button
            onClick={onStart}
            size="sm"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-200"
          >
            Start
          </Button>
        </div>
      </div>

      {/* Sparkle for Aesthetic Touch */}
      <Sparkles className="absolute top-3 right-3 w-4 h-4 text-blue-400 opacity-60 animate-pulse" />
    </div>

  );
};

export default QuestionItemCard;
