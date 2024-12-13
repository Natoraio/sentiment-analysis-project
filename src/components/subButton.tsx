"use client";

import React, { useRef } from 'react';

interface IProps {
  displayText: string;
  onFileUpload: (file: File) => void;
}

const SubButton: React.FC<IProps> = ({ displayText, onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="flex justify-center mb-2">
      <button
        className="inline-flex items-center bg-[#FFFFFF] border-solid border-2 border-[#5E62CC] hover:bg-[#A1A4F8] text-[#5E62CC] rounded-full px-9 py-2 whitespace-nowrap"
        onClick={handleButtonClick}
      >
        {displayText}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default SubButton;