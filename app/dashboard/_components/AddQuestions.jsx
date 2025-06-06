"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, PlusCircle } from "lucide-react";
import { chatSession } from "@/utils/GeminiAIModal";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { Question } from "@/utils/schema";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const AddQuestions = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [typeQuestion, setTypeQuestion] = useState("");
  const [company, setCompany] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const prompt = `
      Job Position: ${jobPosition},
      Job Description: ${jobDesc},
      Years of Experience: ${jobExperience},
      Type of Questions: ${typeQuestion},
      Company: ${company},
      Provide 5 interview questions with answers in JSON format as:
      [
        {
          "Question": "...",
          "Answer": "..."
        }
      ]
    `;

    try {
      const result = await chatSession.sendMessage(prompt);
      const cleanText = result.response
        .text()
        .replace(/```json|```/g, "")
        .trim();

      if (cleanText) {
        const inserted = await db.insert(Question).values({
          mockId: uuidv4(),
          MockQuestionJsonResp: cleanText,
          jobPosition,
          jobDesc,
          jobExperience,
          typeQuestion,
          company,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD"),
        }).returning({ mockId: Question.mockId });

        if (inserted?.[0]?.mockId) {
          setOpenDialog(false);
          router.push(`/dashboard/pyq/${inserted[0].mockId}`);
        }
      } else {
        alert("AI did not return valid questions. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpenDialog(true)}
        className={cn(
          "w-full py-3 text-lg font-semibold rounded-xl",
          "bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500",
          "text-white shadow-lg transition-all duration-300",
          "hover:scale-105 hover:shadow-2xl hover:brightness-110"
        )}
      >
        <PlusCircle className="mr-3 h-6 w-6 animate-pulse" />
        Add New Questions
      </Button>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-background border border-muted">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              AI-Powered Question Generator
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Fill out the details below to generate interview questions.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-white block mb-1">Job Role / Position</label>
              <Input
                value={jobPosition}
                onChange={handleInputChange(setJobPosition)}
                placeholder="e.g. Full Stack Developer"
                required
              />
            </div>

            <div>
              <label className="text-sm text-white block mb-1">Job Description / Tech Stack</label>
              <Textarea
                value={jobDesc}
                onChange={handleInputChange(setJobDesc)}
                placeholder="e.g. React, Node.js, SQL"
                required
              />
            </div>

            <div>
              <label className="text-sm text-white block mb-1">Type of Questions</label>
              <Input
                value={typeQuestion}
                onChange={handleInputChange(setTypeQuestion)}
                placeholder="e.g. DSA, System Design"
                required
              />
            </div>

            <div>
              <label className="text-sm text-white block mb-1">Target Company</label>
              <Input
                value={company}
                onChange={handleInputChange(setCompany)}
                placeholder="e.g. Google, Amazon"
                required
              />
            </div>

            <div>
              <label className="text-sm text-white block mb-1">Years of Experience</label>
              <Input
                type="number"
                value={jobExperience}
                onChange={handleInputChange(setJobExperience)}
                placeholder="e.g. 3"
                required
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Questions"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddQuestions;
