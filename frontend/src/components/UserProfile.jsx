import useGreetStore from "@/store/useGreetStore";
import { CgProfile } from "react-icons/cg";

const UserProfile = ({ handleProfToggle }) => {
  const { name, email, profile_picture } = useGreetStore();
  return (
    <div className="w-[280px] h-[250px] bg-gray-800 z-50 shadow-2xl shadow-gray-700 absolute top-[10%] left-[81%] rounded-2xl flex flex-col gap-1 items-center">
      <div className="rounded-2xl w-[90%] bg-black p-2 flex justify-center items-center m-3">
        {profile_picture ? (
          <img
            src={profile_picture}
            alt=""
            width={100}
            height={100}
            className="rounded-full border-4 items-center border-black m-1 hover:scale-90 transition duration-100"
          />
        ) : (
          <CgProfile className="text-[100px] text-white" />
        )}
        <div className="rounded-2xl ">
          <p className="text-center p-1  text-[16px] text-amber-50 u">
            {name ? name : "guest"}
          </p>
        </div>
      </div>
      <p className="text-white">{email}</p>
      <button
        onClick={handleProfToggle}
        className="w-30 p-2 mt-[10px] text-center bg-black text-white rounded-2xl hover:bg-red-400"
      >
        cancel
      </button>
    </div>
  );
};

export default UserProfile;
