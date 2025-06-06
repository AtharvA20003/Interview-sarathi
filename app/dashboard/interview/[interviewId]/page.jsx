"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import Link from "next/link";
import { useContext } from 'react';
import { WebCamContext } from "../../layout";

const Interview = ({ params }) => {
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const [interviewData, setInterviewData] = useState();
  // const [webCamEnabled, setWebCamEnabled] = useState(false);
  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };
  return (
    <div className="my-12 space-y-8">
      <h2 className="font-bold text-3xl text-center text-white">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Interview Details */}
        <div className="flex flex-col gap-6">
          <div className="relative p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 hover:from-slate-800 hover:to-slate-700 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl opacity-0 hover:opacity-30 transition duration-500 -z-10" />
            <div className="relative z-10 space-y-4 text-white">
              <h2 className="text-lg">
                <strong className="text-blue-400">Job Role / Position:</strong> {interviewData?.jobPosition}
              </h2>
              <h2 className="text-lg">
                <strong className="text-purple-400">Tech Stack / Description:</strong> {interviewData?.jobDesc}
              </h2>
              <h2 className="text-lg">
                <strong className="text-cyan-400">Experience:</strong> {interviewData?.jobExperience} Years
              </h2>
            </div>
          </div>

          {/* Info Box */}
          <div className="relative p-6 rounded-2xl border border-yellow-400 bg-yellow-100/5 backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/10 to-yellow-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            <div className="relative z-10 text-yellow-300 space-y-2">
              <h2 className="flex items-center gap-2 font-semibold">
                <Lightbulb className="text-yellow-400" />
                Information
              </h2>
              <p className="text-yellow-200 text-sm mt-2">
                {process.env.NEXT_PUBLIC_INFORMATION}
              </p>
            </div>
          </div>
        </div>

        {/* Webcam Section */}
        <div className="flex flex-col items-center gap-6">
          {webCamEnabled ? (
            <div className="p-6 rounded-2xl border border-gray-700 bg-slate-800 shadow-inner">
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                height={300}
                width={300}
                mirrored={true}
              />
            </div>
          ) : (
            <div className="p-20 rounded-2xl border border-gray-700 bg-slate-800 text-gray-500">
              <WebcamIcon className="h-32 w-32 mx-auto" />
            </div>
          )}
          <Button
            onClick={() => setWebCamEnabled((prev) => !prev)}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
          </Button>
        </div>
      </div>

      {/* Start Interview Button */}
      <div className="flex justify-center md:justify-end">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl transition-all duration-300">
            Start Interview
          </Button>
        </Link>
      </div>
    </div>

  );
};

export default Interview;
