const Toast = ({ message }) => {
  return (
    <div className=" ">
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 text-white shadow-lg border border-zinc-700 animate-pulse">
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
