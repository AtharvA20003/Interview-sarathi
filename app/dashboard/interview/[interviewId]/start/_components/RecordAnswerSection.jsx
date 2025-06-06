// "use client";

// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import React, { useContext, useEffect, useState, useRef } from "react";
// import Webcam from "react-webcam";
// import { Mic } from "lucide-react";
// import { toast } from "sonner";
// import { chatSession } from "@/utils/GeminiAIModal";
// import { db } from "@/utils/db";
// import { UserAnswer } from "@/utils/schema";
// import { useUser } from "@clerk/nextjs";
// import moment from "moment";
// import { WebCamContext } from "@/app/dashboard/layout";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const RecordAnswerSection = ({
//   mockInterviewQuestion,
//   activeQuestionIndex,
//   interviewData,
// }) => {
//   const [userAnswer, setUserAnswer] = useState("");
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

//   useEffect(() => {
//     if (!isRecording && userAnswer.length > 10) {
//       updateUserAnswer();
//     }
//   }, [userAnswer]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);
//       chunksRef.current = [];

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = async () => {
//         const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
//         await transcribeAudio(audioBlob);
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Error starting recording:", error);
//       toast("Error starting recording. Please check your microphone permissions.");
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const transcribeAudio = async (audioBlob) => {
//     try {
//       setLoading(true);
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
//       // Convert audio blob to base64
//       const reader = new FileReader();
//       reader.readAsDataURL(audioBlob);
//       reader.onloadend = async () => {
//         const base64Audio = reader.result.split(',')[1];
        
//         const result = await model.generateContent([
//           "Transcribe the following audio:",
//           { inlineData: { data: base64Audio, mimeType: "audio/webm" } },
//         ]);

//         const transcription = result.response.text();
//         setUserAnswer((prevAnswer) => prevAnswer + " " + transcription);
//         setLoading(false);
//       };
//     } catch (error) {
//       console.error("Error transcribing audio:", error);
//       toast("Error transcribing audio. Please try again.");
//       setLoading(false);
//     }
//   };

//   const updateUserAnswer = async () => {
//     try {
//       setLoading(true);
//       const feedbackPrompt =
//         "Question:" +
//         mockInterviewQuestion[activeQuestionIndex]?.Question +
//         ", User Answer:" +
//         userAnswer +
//         " , Depends on question and user answer for given interview question" +
//         " please give us rating for answer and feedback as area of improvement if any " +
//         "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

//       const result = await chatSession.sendMessage(feedbackPrompt);

//       let MockJsonResp = result.response.text();
//       console.log(MockJsonResp);

//       // Removing possible extra text around JSON
//       MockJsonResp = MockJsonResp.replace("```json", "").replace("```", "");

//       // Attempt to parse JSON
//       let jsonFeedbackResp;
//       try {
//         jsonFeedbackResp = JSON.parse(MockJsonResp);
//       } catch (e) {
//         throw new Error("Invalid JSON response: " + MockJsonResp);
//       }

//       const resp = await db.insert(UserAnswer).values({
//         mockIdRef: interviewData?.mockId,
//         question: mockInterviewQuestion[activeQuestionIndex]?.Question,
//         correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
//         userAns: userAnswer,
//         feedback: jsonFeedbackResp?.feedback,
//         rating: jsonFeedbackResp?.rating,
//         userEmail: user?.primaryEmailAddress?.emailAddress,
//         createdAt: moment().format("YYYY-MM-DD"),
//       });

//       if (resp) {
//         toast("User Answer recorded successfully");
//       }
//       setUserAnswer("");
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       toast("An error occurred while recording the user answer");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center overflow-hidden">
//       <div className="flex flex-col justify-center items-center rounded-lg p-5 bg-black mt-4 w-[30rem] ">
//         {webCamEnabled ? (
//           <Webcam
//             mirrored={true}
//             style={{ height: 250, width: "100%", zIndex: 10 }}
//           />
//         ) : (
//           <Image src={"/camera.jpg"} width={200} height={200} alt="Camera placeholder" />
//         )}
//       </div>
//       <div className="md:flex mt-4 md:mt-8 md:gap-5">
//         <div className="my-4 md:my-0">
//           <Button onClick={() => setWebCamEnabled((prev) => !prev)}>
//             {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
//           </Button>
//         </div>
//         <Button
//           variant="outline"
//           onClick={isRecording ? stopRecording : startRecording}
//           disabled={loading}
//         >
//           {isRecording ? (
//             <h2 className="text-red-400 flex gap-2 ">
//               <Mic /> Stop Recording...
//             </h2>
//           ) : (
//             " Record Answer"
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default RecordAnswerSection;

"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useContext, useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { Mic, MicOff, Video, VideoOff, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { WebCamContext } from "@/app/dashboard/layout";
import { GoogleGenerativeAI } from "@google/generative-ai";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [userAnswer]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      toast("Error starting recording. Please check your microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];
        
        const result = await model.generateContent([
          "Transcribe the following audio:",
          { inlineData: { data: base64Audio, mimeType: "audio/webm" } },
        ]);

        const transcription = result.response.text();
        setUserAnswer((prevAnswer) => prevAnswer + " " + transcription);
        setLoading(false);
      };
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast("Error transcribing audio. Please try again.");
      setLoading(false);
    }
  };

  const updateUserAnswer = async () => {
    try {
      setLoading(true);
      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.Question +
        ", User Answer:" +
        userAnswer +
        " , Depends on question and user answer for given interview question" +
        " please give us rating for answer and feedback as area of improvement if any " +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);

      let MockJsonResp = result.response.text();
      console.log(MockJsonResp);

      MockJsonResp = MockJsonResp.replace("```json", "").replace("```", "");

      let jsonFeedbackResp;
      try {
        jsonFeedbackResp = JSON.parse(MockJsonResp);
      } catch (e) {
        throw new Error("Invalid JSON response: " + MockJsonResp);
      }

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.Question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
        userAns: userAnswer,
        feedback: jsonFeedbackResp?.feedback,
        rating: jsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD"),
      });

      if (resp) {
        toast("User Answer recorded successfully");
      }
      setUserAnswer("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast("An error occurred while recording the user answer");
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 py-8 sm:py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AI Mock Interview
            </h1>
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
          </div>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Practice your interview skills with our AI-powered assistant
          </p>
        </div>

        {/* Video Section */}
        <div className="relative mb-6 sm:mb-8">
          <div className="relative mx-auto w-full max-w-2xl">
            {/* Video Container */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse"></div>
              
              <div className="relative p-4 sm:p-6">
                {webCamEnabled ? (
                  <div className="relative">
                    <Webcam
                      mirrored={true}
                      className="w-full h-40 sm:h-48 lg:h-64 object-cover rounded-2xl shadow-lg"
                    />
                    {/* Recording Indicator */}
                    {isRecording && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Recording
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 sm:h-48 lg:h-64 text-slate-400">
                    <div className="relative mb-3">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center shadow-lg">
                        <VideoOff className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></div>
                    </div>
                    <p className="text-base sm:text-lg font-medium text-slate-300 mb-1">Camera Disabled</p>
                    <p className="text-xs sm:text-sm text-slate-500 text-center max-w-xs">
                      Enable your camera for a more interactive experience
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Camera Toggle */}
          <Button
            onClick={() => setWebCamEnabled((prev) => !prev)}
            className="relative group w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border border-slate-600 rounded-2xl font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center gap-3 text-sm sm:text-base">
              {webCamEnabled ? (
                <>
                  <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                  Disable Camera
                </>
              ) : (
                <>
                  <VideoOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  Enable Camera
                </>
              )}
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
          </Button>

          {/* Recording Button */}
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={loading}
            className={`relative group w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              isRecording
                ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white"
            }`}
          >
            <div className="flex items-center gap-3 text-sm sm:text-base">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                  Processing...
                </>
              ) : isRecording ? (
                <>
                  <MicOff className="w-5 h-5 sm:w-6 sm:h-6" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                  Start Recording
                </>
              )}
            </div>
            {/* Animated border for recording button */}
            <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
              isRecording 
                ? "bg-gradient-to-r from-red-400/20 to-red-600/20 animate-pulse" 
                : "bg-gradient-to-r from-purple-400/0 to-pink-600/0 group-hover:from-purple-400/20 group-hover:to-pink-600/20"
            }`}></div>
          </Button>
        </div>

        {/* Status Indicator */}
        {(isRecording || loading) && (
          <div className="mt-8 flex justify-center">
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl px-6 py-3 flex items-center gap-3">
              {isRecording && (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-300 text-sm font-medium">Listening...</span>
                </>
              )}
              {loading && !isRecording && (
                <>
                  <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                  <span className="text-slate-300 text-sm font-medium">Processing your response...</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordAnswerSection;