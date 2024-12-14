"use client";

import React, { useEffect, useState } from "react";
import WordCloud from "react-d3-cloud";

export interface WordData {
  text: string;
  value: number;
}

interface IWordCloudChartProps {
  data: WordData[];
}

export function WordCloudChart(props: IWordCloudChartProps) {
  const [data, setData] = useState(undefined as unknown as WordData[]);
  const [max, setMax] = useState(100);
  useEffect(() => {
    const values = props.data.map((r) => {
      return r.value;
    });
    console.log("props.data", props.data);
    setMax(Math.max(...values));
    setData(props.data);
  }, [props.data]);

  // @ts-expect-error idk
  const fontSize = (word) => (100 * word.value) / max;
  const rotate = () => 0; // word.value % 90;

  if (data === undefined) {
    return <div>Loading..</div>;
  }

  return (
    <WordCloud
      width={1000}
      height={400}
      data={data}
      fontSize={fontSize}
      rotate={rotate}
      padding={3}
      spiral="rectangular"
      random={Math.random}
    />
  );
}
