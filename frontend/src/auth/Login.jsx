import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProfileStore from "../store/useProfileStore";
import { jwtDecode } from "jwt-decode";

const Login = ({ toggleFunction }) => {
  const { setName, setEmail, setProfilePicture } = useProfileStore();
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  function handleGoogleLogin(response) {
    if (response.credential) {
      const user = jwtDecode(response.credential);
      console.log(user);
      setToken(response.credential);
      setName(user.name);
      setEmail(user.email);
      setProfilePicture(user.picture);
      console.log(user.picture);
      navigate("/Analysis");
    }
  }
  localStorage.setItem("outhToken", token);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md h-[400px] bg-gray-900/90 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl text-white flex flex-col items-center p-8 hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center gap-2 mb-8">
          <FcGoogle className="text-6xl" />
          <div>
            <h1 className="text-3xl font-bold">Google Sign In</h1>
            <p className="text-gray-400 text-sm">Continue to EcoMetric AI</p>
          </div>
        </div>

        <div className="mt-4">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Login Failed")}
            width={300}
            shape="pill"
          />
        </div>

        <p className="text-center text-sm text-gray-400 mt-8 leading-6">
          Sign in securely with your Google account to access AI-powered vehicle
          analysis, sustainability insights, and personalized recommendations.
        </p>

        {/* <div className="mt-6 flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              token ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-sm">
            {token ? "Login Successful" : "Waiting for Login"}
          </span>
        </div> */}

        <button
          onClick={toggleFunction}
          className="mt-auto w-full py-3 rounded-xl bg-gray-600 text-black font-semibold hover:bg-red-400 transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Login;
