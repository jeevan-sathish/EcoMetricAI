import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] text-white text-center px-4">
      <h1 className="text-8xl font-bold text-green-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-400 mt-2 text-sm">
        The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-semibold transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
