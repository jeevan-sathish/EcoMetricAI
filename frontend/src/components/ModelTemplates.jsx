import useCarStore from "@/store/useCarStore";
import useSingleDataStore from "@/store/useSingleDataStore";
import { IoLogoModelS } from "react-icons/io";
import { FaHandPointDown } from "react-icons/fa6";
import { ThreeDots } from "react-loader-spinner";

const ModelTemplates = () => {
  const { cars } = useCarStore();
  const { setSingleData } = useSingleDataStore();
  const size = cars.length;

  return (
    <div className="h-screen bg-white">
      <header className="w-full h-14 bg-green-100 flex flex-row items-center justify-center gap-4 px-4 border-b border-green-700">
        <FaHandPointDown />
        <h1 className="text-md font-bold">Available Varients Models</h1>
        <p className="text-sm text-gray-600">
          Size:{" "}
          <span className="font-bold  text-2xl text-green-600">{size}</span>
        </p>
      </header>
      <div className="bg-green-200">
        {cars.length > 0 ? (
          <div className="w-full h-[90vh] bg-green-200 flex flex-col border-2xl overflow-y-scroll">
            {cars &&
              cars.map((ele, i) => (
                <div
                  key={i}
                  className="w-[90%] p-3 bg-green-100 m-3 hover:shadow-2xl shadow-green-300  cursor-pointer transition duration-200 rounded-[10px]"
                  onClick={() => setSingleData(ele)}
                >
                  <div className="w-full p-2 bg-red-200 flex flex-row gap-2 items-center text-[12px]">
                    <IoLogoModelS className="text-[18px]" />
                    <span className="text-red-600">Model:</span> {ele.model}
                    <p>combined-mpg: {ele.combmpg}</p>
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
          <div className="w-full h-[90vh] bg-green-200 flex flex-col border-2xl justify-center items-center">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <p>no models selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelTemplates;
