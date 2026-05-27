import { CiStreamOn } from "react-icons/ci";
import useGreetStore from "@/store/useGreetStore";

const Nav = () => {
  const { name } = useGreetStore();
  const GreetName = name || "Guest";

  return (
    <div className="w-full h-16 bg-green-500 flex items-center shadow-md px-4">
      <div className="text-2xl font-medium text-black tracking-wide">
        EcoMetric-AI
      </div>

      <div className="flex-1 flex justify-end">
        {name && <p className="text-black font-medium">Welcome {GreetName}</p>}
      </div>
    </div>
  );
};

export default Nav;
