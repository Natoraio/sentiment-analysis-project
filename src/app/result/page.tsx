"use client";

import Button from "@/components/button";
import { WordCloudChart } from "@/components/wordCloudChart";
import { analyse } from "@/lib/sentiment.api";
import { createFeedback, Sentiment } from "@/lib/supabase.api";
import Image from "next/image";
import { useSearchParams, redirect } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface IResult {
  sentiment: "negative" | "neutral" | "positive";
  score: number;
  attentions: { word: string; score: number }[];
}

const ResultPage = () => {
  const [result, setResult] = useState<IResult>();
  const [isVote, setIsVote] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const text = searchParams.get("text");

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "#38A617"; // green
      case "negative":
        return "#CB3333"; // red
      default:
        return "black";
    }
  };

  const voteButtons = [
    { label: "negative", styles: "bg-[#CB3333] hover:bg-[#ED5555]" },
    { label: "neutral", styles: "bg-black hover:bg-[#444444]" },
    { label: "positive", styles: "bg-[#38A617] hover:bg-[#5AC839]" },
  ];

  const voteHandler = (vote: Sentiment) => {
    setIsVote(true);

    Swal.fire({
      title: "Success",
      text: "your vote has been submitted",
      icon: "success",
    });

    createFeedback(text!, result!.sentiment as Sentiment, vote);
  };

  useEffect(() => {
    analyse(text!).then((result) => setResult(result));
  }, [text]);

  return result ? (
    <div>
      <header className="bg-[#5E62CC] text-white p-5 text-center w-full flex justify-between items-center">
        <button
          className=" text-white px-4 py-1 rounded hover:bg-white hover:text-black transition-all"
          onClick={() => redirect("/")}
        >
          Back to Home
        </button>
        <h1>NTN Sentiment Analyzer</h1>
        <div></div>
      </header>
      <main className="px-60 py-5">
        <h2 className="mb-5">Inputted text: </h2>
        <section className="mb-5">
          <div className="border rounded-lg p-4">{text}</div>
        </section>
        <h2 className="mb-5">Overall sentiment: </h2>
        <div className="flex items-center border rounded-lg p-4">
          <h2>It is determined that the sentiment of the given text is: </h2>
          <h2
            className="text-3xl font-semibold ml-10"
            style={{ color: getSentimentColor(result.sentiment) }}
          >
            {result.sentiment} ({Math.round(result.score * 1000) / 1000})
          </h2>
        </div>

        <WordCloudChart
          data={result.attentions.map((a) => ({
            text: a.word,
            value: Math.round(a.score * 100),
          }))}
        />

        <div>
          <h2 className="mb-5">What do you think?</h2>
          <div className="border rounded-lg p-4 flex flex-row justify-evenly">
            {isVote ? (
              <p>Thank you for your feedback :D</p>
            ) : (
              voteButtons.map((item) => (
                <Button
                  key={item.label}
                  displayText={item.label}
                  onClickHandler={() => voteHandler(item.label as Sentiment)}
                  styles={item.styles}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <Image src="/loading.svg" alt="Loading" width={200} height={200} />
    </div>
  );
};

const SuspenseResultPage = () => (
  <Suspense>
    <ResultPage />
  </Suspense>
);

export default SuspenseResultPage;
