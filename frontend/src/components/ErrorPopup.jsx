const ErrorPopup = ({ error }) => {
  return (
    <div className="w-[400px] h-[300px] bg-white rounded-2xl">
      <h1>{error}</h1>
    </div>
  );
};

export default ErrorPopup;
