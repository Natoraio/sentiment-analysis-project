import { useState } from "react";

interface IProps {
  state: string;
  setState: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextField: React.FC<IProps> = (props) => {
  const [wordCount, setWordCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = e.target.value.trim().split(/\s+/);
    const count = words.filter((word) => word.length > 0).length;

    if (count <= 80) {
      setWordCount(count);
      props.setState(e);
    }
  };

  return (
    <div className="relative w-full mb-2">
      <textarea
        className={`resize-none w-full p-2 bg-[#F4F5FF] rounded-3xl text-sm border-2 border-[#5E62CC] focus:outline-none placeholder-gray-500 ${
          wordCount > 80 ? "border-red-500" : ""
        }`}
        value={props.state}
        onChange={handleInputChange}
        placeholder="Copy and paste your text for sentiment analysis here"
        style={{ height: "300px", color: props.state ? "black" : "gray" }}
      />
      <p
        className={`text-sm absolute right-2 ${
          wordCount > 80 ? "text-red-500" : "text-gray-500"
        }`}
      >
        {wordCount} / 80 words
      </p>
    </div>
  );
};

export default TextField;
