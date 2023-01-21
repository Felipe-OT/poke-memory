import React from "react";


interface IDifficultButton {
    title: string,
    changeDifficult: (title: string) => void,
    selectedDifficult: string
}

const DifficultButton = ({title, changeDifficult, selectedDifficult}:IDifficultButton) => {
  return (
    <button
      onClick={() => changeDifficult(title)}
      disabled={selectedDifficult == title ? true : false}
      className="px-12 py-2 bg-[#52a0a7] text-white text-xl font-semibold rounded-full border-2 disabled:bg-[#32858D] disabled:border-[#52a0a7]"
    >
      <span>{title}</span>
    </button>
  );
};

export default DifficultButton;
