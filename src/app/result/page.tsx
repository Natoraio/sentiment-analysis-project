"use client";

import React from "react";
import WordCloud from "@/components/wordcloud";

interface Sentiment {
  word: string;
  sentiment: string;
  weight: number;
}

interface Result {
  text: string;
  sentiments: Sentiment[];
  overallSentiment: string;
  confidenceScore: number;
}

const result: Result = {
  text: "I love the new design but the performance is terrible.",
  sentiments: [
    { word: "love", sentiment: "positive", weight: 0.9 },
    { word: "design", sentiment: "positive", weight: 0.7 },
    { word: "performance", sentiment: "negative", weight: 0.8 },
    { word: "terrible", sentiment: "negative", weight: 0.9 },
  ],
  overallSentiment: "negative",
  confidenceScore: 0.61,
};

const getColor = (sentiment: string, weight: number) => {
  const opacity = weight;
  switch (sentiment) {
    case "positive":
      return `rgba(56, 166, 23, ${opacity})`; // green
    case "negative":
      return `rgba(203, 51, 51, ${opacity})`; // red
    default:
      return `rgba(0, 0, 0, ${opacity})`; // black
  }
};

const getOverallSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return "#38A617"; // green
    case "negative":
      return "#CB3333"; // red
    default:
      return "black";
  }
};

const ResultPage: React.FC = () => {
  const words = result.sentiments.map((sentiment) => ({
    text: sentiment.word,
    size: sentiment.weight,
    sentiment: sentiment.sentiment,
  }));

  return (
    <div>
      <header className="bg-[#5E62CC] text-white p-5 text-center w-full flex justify-between items-center">
        <button
          className=" text-white px-4 py-1 rounded hover:{bg-white}"
          onClick={() => (window.location.href = "/")}
        >
          Back to Home
        </button>
        <h1>NTN Sentiment Analyzer</h1>
        <div></div>
      </header>
      <main className="px-60 py-5">
        <h2 className="mb-5">Inputted text: </h2>
        <section className="mb-5">
          <div className="border rounded-lg p-4">
            <p>
              {result.text.split(" ").map((word, index) => {
                const sentiment = result.sentiments.find(
                  (s) => s.word === word.toLowerCase()
                );
                const color = sentiment
                  ? getColor(sentiment.sentiment, sentiment.weight)
                  : "black";
                return (
                  <span
                    key={index}
                    style={{ color, fontWeight: sentiment ? "bold" : "normal" }}
                  >
                    {word}{" "}
                  </span>
                );
              })}
            </p>
          </div>
        </section>
        <h2 className="mb-5">Overall sentiment: </h2>
        <div className="flex items-center border rounded-lg p-4">
          <h2>It is determined that the sentiment of the given text(s) is: </h2>
          <h2
            className="text-3xl font-semibold ml-10"
            style={{ color: getOverallSentimentColor(result.overallSentiment) }}
          >
            {result.overallSentiment} ({result.confidenceScore})
          </h2>
        </div>
        <div className="mt-5 w-full h-[400px] flex items-center">
          <WordCloud words={words} width={1000} height={350} />
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
