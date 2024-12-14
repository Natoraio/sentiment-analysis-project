"use client";

interface IProps {
  displayText: string;
  onClickHandler: () => void;
  styles?: string;
}

const Button: React.FC<IProps> = (props) => {
  return (
    <div className="flex justify-center ">
      <button
        className={`inline-flex items-center bg-[#5E62CC] hover:bg-[#A1A4F8] text-white rounded-full px-9 py-2 whitespace-nowrap ${props.styles}`}
        onClick={props.onClickHandler}
      >
        {props.displayText}
      </button>
    </div>
  );
};

export default Button;
