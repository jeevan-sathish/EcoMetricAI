import useSingleDataStore from "../store/useSingleDataStore";
const DashboardCardSD = ({ title, value, icon: Icon, color }) => {
  const { singleData } = useSingleDataStore();

  return (
    <div
      className={`p-2 bg-black text-yellow-600 rounded-2xl border border-gray-600 hover:shadow-xl transition duration-300 ${
        singleData ? "min-h-20 flex items-center" : ""
      }`}
    >
      <div className="flex gap-4  items-center">
        <div className={`p-3 rounded-full bg-gray-100 ${color} text-center`}>
          <Icon className="text-2xl font-extrabold " />
        </div>
        <div>
          <h3 className="text-sm text-gray-300 ">{title}</h3>
          <p className="text-[13px] font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCardSD;
