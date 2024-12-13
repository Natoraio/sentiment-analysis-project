"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import SubButton from "@/components/subButton";
import TextField from "@/components/textField";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleAnalyze = async () => {
    const res = await fetch("/api/analysis", {
      method: "POST",
      body: JSON.stringify({ text: inputValue }),
    });
    const { result } = await res.json();

    console.log(result);
  };
  const handleFileUpload = (file: File) => {
    console.log("File uploaded:", file);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="flex-[2_2_0%] p-8 sm:p-20 rounded-tr-3xl"
        style={{ backgroundColor: "#5E62CC" }}
      >
        <main className="flex flex-col gap-8 items-center sm:items-start">
          <Image
            src="/images/main_illus.png"
            alt="Main Illustration"
            width={500}
            height={300}
          />
        </main>
      </div>
      <div className="flex-[3_3_0%] bg-white p-8 sm:p-20">
        <footer className="flex flex-col gap-6 items-center justify-center text-center">
          <h1 className="text-2xl text-black">NTN Sentimental Analyzer</h1>
          <p className="px-12 text-sm text-center mt-3">
            Sentiment analysis is a natural language processing (NLP) technique
            used to distinguish and categorize the emotional tones or attitudes
            expressed in a sample of text. We’ll use the dataset obtained and
            extracted from X to train the analysis model.
          </p>
          <div className="mt-3 w-full max-w-xl">
            <TextField state={inputValue} setState={handleInputChange} />
          </div>
          <Button displayText="Analyze" onClickHandler={handleAnalyze} />
          <SubButton displayText="Upload file" onFileUpload={handleFileUpload} />
        </footer>
      </div>
    </div>
  );
}
