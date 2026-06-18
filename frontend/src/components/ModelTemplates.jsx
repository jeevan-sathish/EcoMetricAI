import useCarStore from "@/store/useCarStore";
import useSingleDataStore from "@/store/useSingleDataStore";
import { IoLogoModelS } from "react-icons/io";
import { FaHandPointDown } from "react-icons/fa6";
import { ThreeDots } from "react-loader-spinner";
import LoadingSkeleton from "./LoadingSkeleton";

const ModelTemplates = () => {
  const { cars } = useCarStore();
  const { setSingleData } = useSingleDataStore();
  const size = cars.length;

  return (
    <div className="h-screen bg-black border border-b-gray-500">
      <header className="w-full h-10 bg-gray-800  flex flex-row  items-center justify-center gap-4 px-4 border-b border-green-700">
        <FaHandPointDown className="text-yellow-300" />
        <h1 className="text-md font-bold text-gray-400">
          Available Varients Models
        </h1>
        <p className="text-sm text-gray-400 ">
          Size:{" "}
          <span className="font-bold  text-2xl text-green-600">{size}</span>
        </p>
      </header>
      <div className="bg-black">
        {cars.length > 0 ? (
          <div
            className={`w-full h-[90vh] bg-black flex flex-col border-2xl ${size > 3 ? "overflow-y-scroll" : ""}`}
          >
            {cars &&
              cars.map((ele, i) => (
                <div
                  key={i}
                  className="w-[90%] p-3 bg-gray-800  text-white m-3 hover:shadow-2xl shadow-green-900  cursor-pointer transition duration-200 rounded-[10px]"
                  onClick={() => setSingleData(ele)}
                >
                  <div className="w-full p-2 bg-black flex flex-row gap-2 items-center text-[12px] rounded-[10px]">
                    <IoLogoModelS className="text-[18px] text-red-700" />
                    <span className="text-red-600">Model:</span>
                    <span className="text-green-800 font-bold">
                      {ele.model}
                    </span>
                    <p className="text-yellow-500">
                      combined-mpg: {ele.combmpg}
                    </p>
                  </div>

                  <p>
                    <span className="font-bold">Brand:</span> {ele.brand}
                  </p>
                  <p>
                    <span className="font-bold">Model:</span> {ele.model}
                  </p>
                  <p>
                    <span className="font-bold">Vehicle Class:</span>{" "}
                    {ele.vehicleclass}
                  </p>
                  <p>
                    <span className="font-bold">Fuel Type:</span> {ele.fueltype}
                  </p>
                  <p>
                    <span className="font-bold">Co2 Emission:</span>{" "}
                    {ele.co2emission}
                  </p>
                </div>
              ))}
          </div>
        ) : (
          <div className="w-full h-[90vh] bg-black flex flex-col border-2xl  items-center">
            {/* <ThreeDots
              visible={true}
              height="140"
              width="140"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />

            <p className="text-white">no models selected</p> */}

            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelTemplates;
