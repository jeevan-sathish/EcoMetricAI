import { RiSpeakAiFill } from "react-icons/ri";
import { MdPauseCircle } from "react-icons/md";
import { GrResume } from "react-icons/gr";
import { IoStopCircleSharp } from "react-icons/io5";
import { useState } from "react";

const SpeechBox = ({ suggestion }) => {
  const [speechStatus, setSpeechStatus] = useState("");

  function handleSpeak() {
    const speech = new SpeechSynthesisUtterance(suggestion);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
    setSpeechStatus("speak");
  }
  function handlePause() {
    window.speechSynthesis.pause();
    setSpeechStatus("pause");
  }
  function handleResume() {
    window.speechSynthesis.resume();
    setSpeechStatus("resume");
  }
  function handleStop() {
    window.speechSynthesis.cancel();
    setSpeechStatus("stop");
  }
  return (
    <div className="flex flex-row gap-4 p-2 text-[17px] text-gray-500 ">
      <RiSpeakAiFill
        onClick={handleSpeak}
        className={`${speechStatus === "speak" ? "text-green-400" : "text-gray-600"}`}
      />
      <MdPauseCircle
        onClick={handlePause}
        className={`${speechStatus === "pause" ? "text-green-400" : "text-gray-600"}`}
      />
      <GrResume
        onClick={handleResume}
        className={`${speechStatus === "resume" ? "text-green-400" : "text-gray-600"}`}
      />
      <IoStopCircleSharp
        onClick={handleStop}
        className={`${speechStatus === "stop" && "text-gray-600"}`}
      />
    </div>
  );
};

export default SpeechBox;
