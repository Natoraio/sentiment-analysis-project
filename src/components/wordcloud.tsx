import React, { useEffect, useRef, useState } from 'react';
import { Group } from '@visx/group';
import { Text } from '@visx/text';
import cloud from 'd3-cloud';

interface Word {
  text: string;
  size: number;
  sentiment: string;
}

interface WordCloudProps {
  words: Word[];
  width: number;
  height: number;
}

const getColor = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return '#38A617'; // green
    case 'negative':
      return '#CB3333'; // red
    default:
      return 'black';
  }
};

const WordCloud: React.FC<WordCloudProps> = ({ words, width, height }) => {
  const [layout, setLayout] = useState<cloud.Word[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const padding = 40; // Increased padding within the group

  useEffect(() => {
    const maxFontSize = 100;
    const minFontSize = 10;
    const maxWeight = Math.max(...words.map(word => word.size));
    const minWeight = Math.min(...words.map(word => word.size));

    const scaleFontSize = (size: number) => {
      return ((size - minWeight) / (maxWeight - minWeight)) * (maxFontSize - minFontSize) + minFontSize;
    };

    const wordCloudLayout = cloud()
      .size([width - 2 * padding, height - 2 * padding]) // Account for padding
      .words(
        words.map(word => ({
          text: word.text,
          size: scaleFontSize(word.size),
          sentiment: word.sentiment,
        }))
      )
      .padding(2) // Increase padding for more space between words
      .rotate(() => 0) // Make all texts horizontal
      .fontSize(d => d.size || 10) // Ensure a default size if size is undefined
      .on('end', (calculatedLayout) => {
        // Update layout after calculation
        setLayout(calculatedLayout);
      });

    wordCloudLayout.start();
  }, [words, width, height]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <Group top={padding} left={padding}>
        {layout.map((word, index) => (
          <Text
            key={index}
            x={word.x}
            y={word.y}
            fontSize={word.size}
            textAnchor="middle"
            fill={getColor((word as any).sentiment)}
            transform={`translate(${word.x}, ${word.y})`}
          >
            {word.text}
          </Text>
        ))}
      </Group>
    </svg>
  );
};

export default WordCloud;
