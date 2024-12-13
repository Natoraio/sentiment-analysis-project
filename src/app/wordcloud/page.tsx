"use client";









// FOR TESTING


















import React, { useEffect, useRef, useState } from 'react';
import { Group } from '@visx/group';
import { Text } from '@visx/text';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

interface Word {
  text: string;
  size: number;
}

interface WordCloudProps {
  words: Word[];
}

const WordCloud: React.FC<WordCloudProps> = ({ words }) => {
  const [layout, setLayout] = useState<cloud.Word[]>([]);
  const width = 600; // Width of the word cloud
  const height = 800; // Height of the word cloud
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const wordCloudLayout = cloud()
      .size([width, height])
      .words(
        words.map(word => ({
          text: word.text,
          size: word.size,
        }))
      )
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 90 : 0))
      .fontSize(d => d.size || 10) // Ensure a default size if size is undefined
      .on('end', setLayout);

    wordCloudLayout.start();
  }, [words]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <Group top={height / 2} left={width / 2}>
        {layout.map((word, index) => (
          <Text
            key={index}
            x={word.x}
            y={word.y}
            fontSize={word.size}
            textAnchor="middle"
            fill="black"
            transform={`translate(${word.x}, ${word.y}) rotate(${word.rotate})`}
          >
            {word.text}
          </Text>
        ))}
      </Group>
    </svg>
  );
};

const App: React.FC = () => {
  const words: Word[] = [
    { text: 'React', size: 50 },
    { text: 'Visx', size: 40 },
    { text: 'WordCloud', size: 30 },
    { text: 'JavaScript', size: 45 },
    { text: 'D3', size: 35 },
    { text: 'Data', size: 25 },
    { text: 'Visualization', size: 20 },
  ];

  return (
    <div>
      <h1>Word Cloud with Visx</h1>
      <WordCloud words={words} />
    </div>
  );
};

export default App;