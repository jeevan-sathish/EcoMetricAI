import { RiSpeakAiFill } from "react-icons/ri";
import { MdPauseCircle } from "react-icons/md";
import { GrResume } from "react-icons/gr";
import { IoStopCircleSharp } from "react-icons/io5";

const SpeechBox = ({ suggestion }) => {
  function handleSpeak() {
    const speech = new SpeechSynthesisUtterance(suggestion);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  }
  function handlePause() {
    window.speechSynthesis.pause();
  }
  function handleResume() {
    window.speechSynthesis.resume();
  }
  function handleStop() {
    window.speechSynthesis.cancel();
  }
  return (
    <div className="flex flex-row gap-4 p-2 text-[17px] ">
      <RiSpeakAiFill
        onClick={handleSpeak}
        className="text-white hover:text-green-400 "
      />
      <MdPauseCircle
        onClick={handlePause}
        className="text-white hover:text-yellow-300"
      />
      <GrResume
        onClick={handleResume}
        className="text-white hover:text-green-200"
      />
      <IoStopCircleSharp
        onClick={handleStop}
        className="text-white hover:text-red-500"
      />
    </div>
  );
};

export default SpeechBox;
