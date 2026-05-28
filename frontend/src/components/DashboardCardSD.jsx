const DashboardCardSD = ({ title, value, icon: Icon, color }) => {
  return (
    <div className=" p-2 bg-white rounded-2xl border border-gray-600 hover:shadow-xl transition duration-300">
      <div className="flex gap-4  items-center">
        <div className={`p-3 rounded-full bg-gray-100 ${color}`}>
          <Icon className="text-2xl font-extrabold " />
        </div>
        <div>
          <h3 className="text-sm text-gray-500 ">{title}</h3>
          <p className="text-[15px] font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCardSD;
