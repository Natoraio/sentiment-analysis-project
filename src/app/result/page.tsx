"use client";

import { WordCloudChart } from "@/components/wordCloudChart";
import { useSearchParams, redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface IResult {
  sentiment: "negative" | "neutral" | "positive";
  score: number;
  attentions: { word: string; score: number }[];
}

const ResultPage = () => {
  const [result, setResult] = useState<IResult>();
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/analysis", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      const { result } = await res.json();

      setResult(result);
    };

    fetchData();
  }, [text]);

  return (
    result && (
      <div>
        <header className="bg-[#5E62CC] text-white p-5 text-center w-full flex justify-between items-center">
          <button
            className=" text-white px-4 py-1 rounded hover:{bg-white}"
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
        </main>
      </div>
    )
  );
};

export default ResultPage;
