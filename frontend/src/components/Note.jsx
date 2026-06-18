import { RiErrorWarningFill } from "react-icons/ri";
const Note = (props) => {
  return (
    <div className="rounded-2xl p-5 text-sm flex flex-row items-center justify-center bg-gray-800">
      <RiErrorWarningFill className="text-[20px] text-yellow-600 mr-5" />
      <p className="text-gray-400">
        <span className="font-bold ">Note: </span>
        {props.note}
      </p>
    </div>
  );
};

export default Note;
