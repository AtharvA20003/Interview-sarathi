"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Plus, X, Briefcase, Code, Clock, Sparkles } from 'lucide-react';

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt = `
  Job Positions: ${jobPosition}, 
  Job Description: ${jobDesc}, 
  Years of Experience: ${jobExperience}. 
  Based on this information, please provide 5 interview questions with answers in JSON format, ensuring "Question" and "Answer" are fields in the JSON.
`;

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "")
      .trim();
    console.log(JSON.parse(MockJsonResp));
    // const parsedResp = MockJsonResp
    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD"),
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("Inserted ID:", resp);

      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0]?.mockId);
      }
    } else {
      console.log("ERROR");
    }
    setLoading(false);
  };

  return (
    <div className="relative">
      {/* Add New Card */}
      <div
        className="group relative p-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 hover:from-slate-800 hover:to-slate-700 transition-all duration-500 cursor-pointer overflow-hidden"
        onClick={() => setOpenDialog(true)}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500 -z-10"></div>
        
        <div className="relative z-10 flex flex-col items-center space-y-4">
          <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 group-hover:scale-110 transition-transform duration-300">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Start New Interview</h2>
            <p className="text-gray-400 text-sm">Create your personalized mock interview</p>
          </div>
        </div>
        
        {/* Sparkle effects */}
        <Sparkles className="absolute top-4 right-4 w-5 h-5 text-blue-400 opacity-60 animate-pulse" />
        <Sparkles className="absolute bottom-6 left-6 w-4 h-4 text-purple-400 opacity-40 animate-pulse delay-1000" />
      </div>

      {/* Modal Overlay */}
      {openDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-slate-900 rounded-3xl border border-gray-700 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header with gradient */}
            <div className="relative p-8 pb-6 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-t-3xl">
              <button
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-200"
                onClick={() => setOpenDialog(false)}
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Interview Setup</h2>
              </div>
              <p className="text-gray-300 text-lg">Let's prepare your personalized mock interview experience</p>
            </div>

            <div className="p-8 pt-6 space-y-6">
              {/* Job Position */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-blue-400 font-medium">
                  <Briefcase className="w-4 h-4" />
                  <span>Job Role / Position</span>
                </label>
                <Input
                  type="text"
                  className="w-full p-4 rounded-xl bg-slate-800 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
                  placeholder="e.g., Full Stack Developer, Frontend Engineer"
                  required
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>

              {/* Job Description */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-purple-400 font-medium">
                  <Code className="w-4 h-4" />
                  <span>Tech Stack & Skills</span>
                </label>
                <textarea
                  className="w-full p-4 rounded-xl bg-slate-800 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-200 min-h-[120px] resize-none"
                  placeholder="e.g., React, Node.js, Python, MongoDB, AWS, Docker..."
                  required
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                />
              </div>

              {/* Experience */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-cyan-400 font-medium">
                  <Clock className="w-4 h-4" />
                  <span>Years of Experience</span>
                </label>
                <Input
                  type="number"
                  min="0"
                  max="50"
                  className="w-full p-4 rounded-xl bg-slate-800 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                  placeholder="e.g., 2"
                  required
                  value={jobExperience}
                  onChange={(e) => setJobExperience(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  className="flex-1 py-3 px-6 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 font-medium"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </button>
                <button
                  onClick={onSubmit}
                  disabled={loading}
                  type="submit"
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Generating Interview...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Start Interview</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    // <div>
    //   <div
    //     className="p-10 rounded-lg border bg-secondary hover:scale-105 hover:shadow-sm transition-all cursor-pointer"
    //     onClick={() => setOpenDialog(true)}
    //   >
    //     <h2 className=" text-lg text-center">+ Add New</h2>
    //   </div>
    //   <Dialog open={openDialog}>
    //     <form onSubmit={onSubmit}>
    //     <DialogContent className="max-w-2xl">
    //     <DialogClose asChild>
    //       <button
    //         className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
    //         aria-label="Close" onClick={() => setOpenDialog(false)}
    //       >
    //         {/* <p className="w-6 h-6 z-50" > &nbsp; </p> */}
    //       </button>
    //     </DialogClose>
    //       <DialogHeader>
    //         <DialogTitle className="text-2xl">
    //           Tell us more about your job interviewing
    //         </DialogTitle>
    //         <DialogDescription>
    //             <div className="my-3">
    //               <h2>
    //                 Add Details about your job position, job descritpion and
    //                 years of experience
    //               </h2>

    //               <div className="mt-7 my-3">
    //                 <label className="text-[#00aaff]">Job Role/job Position</label>
    //                 <Input
    //                   className="mt-1"
    //                   placeholder="Ex. Full stack Developer"
    //                   required
    //                   onChange={(e) => setJobPosition(e.target.value)}
    //                 />
    //               </div>
    //               <div className="my-5">
    //                 <label className="text-[#00aaff]">
    //                   Job Description/ Tech stack (In Short)
    //                 </label>
    //                 <Textarea
    //                   className="placeholder-opacity-50"
    //                   placeholder="Ex. React, Angular, Nodejs, Mysql, Nosql, Python"
    //                   required
    //                   onChange={(e) => setJobDesc(e.target.value)}
    //                 />
    //               </div>
    //               <div className="my-5">
    //                 <label className="text-[#00aaff]">Years of Experience</label>
    //                 <Input
    //                   className="mt-1"
    //                   placeholder="Ex. 5"
    //                   max="50"
    //                   type="number"
    //                   required
    //                   onChange={(e) => setJobExperience(e.target.value)}
    //                 />
    //               </div>
    //             </div>
    //             <div className="flex gap-5 justify-end">
    //               <Button
    //                 type="button"
    //                 variant="goast"
    //                 onClick={() => setOpenDialog(false)}
    //               >
    //                 Cancel
    //               </Button>
    //               <Button type="submit" disabled={loading}>
    //                 {loading ? (
    //                   <>
    //                     <LoaderCircle className="animate-spin" />
    //                     Generating From AI
    //                   </>
    //                 ) : (
    //                   "Start Interview"
    //                 )}
    //               </Button>
    //             </div>
    //         </DialogDescription>
    //       </DialogHeader>
    //     </DialogContent>
    //     </form>
    //   </Dialog>
       
    // </div>
  );
};

export default AddNewInterview;
