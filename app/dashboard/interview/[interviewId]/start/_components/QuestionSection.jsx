

import { Lightbulb, Volume2, Play, Hash } from "lucide-react";
import React from "react";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-4 lg:p-6 shadow-2xl">
        {/* Background Effects */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 animate-pulse"></div>
        
        <div className="relative z-10">
          {/* Question Navigation Pills */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
            {mockInterviewQuestion &&
              mockInterviewQuestion.map((question, index) => (
                <div
                  key={index}
                  className={`relative group px-3 py-2 rounded-xl text-center text-xs md:text-sm font-medium cursor-pointer transition-all duration-300 transform hover:scale-105 md:block hidden ${
                    activeQuestionIndex == index
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600/30"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Hash className="w-3 h-3" />
                    <span>{index + 1}</span>
                  </div>
                  {activeQuestionIndex == index && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse"></div>
                  )}
                </div>
              ))}
          </div>

          {/* Main Question */}
          <div className="relative mb-4">
            <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-4 lg:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-400 text-sm font-medium">
                      Question {activeQuestionIndex + 1} of {mockInterviewQuestion.length}
                    </span>
                  </div>
                  <h2 className="text-base md:text-lg lg:text-xl font-semibold text-slate-100 leading-relaxed">
                    {mockInterviewQuestion[activeQuestionIndex]?.Question}
                  </h2>
                </div>
                
                {/* Speech Button */}
                <button
                  onClick={() =>
                    textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)
                  }
                  className="group relative p-2.5 bg-gradient-to-br from-slate-600 to-slate-700 hover:from-purple-500 hover:to-pink-500 border border-slate-500/30 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                >
                  <Volume2 className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors duration-300" />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/20 group-hover:to-pink-400/20 transition-all duration-300"></div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-800 text-slate-200 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Listen
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Note Section */}
          <div className="relative md:block hidden">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <Lightbulb className="w-5 h-5 text-blue-400" />
                  <div className="absolute inset-0 text-blue-400 animate-pulse opacity-50">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-semibold text-blue-300 text-lg">Pro Tip</h3>
              </div>
              <p className="text-blue-200/90 text-sm leading-relaxed">
                {process.env.NEXT_PUBLIC_QUESTION_NOTE || 
                 "Take your time to think through your answer. Structure your response with specific examples and demonstrate your problem-solving approach."}
              </p>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-6 w-4 h-4 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default QuestionSection;