import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

const Login = () => {
  const [token, setToken] = useState("");

  function handleGoogleLogin(response) {
    setToken(response.credential);
  }
  return (
    <div className="w-[25%] h-[300px] rounded-2xl bg-black flex flex-col items-center justify-center gap-3 absolute top-[25%]">
      <h1>Google Login</h1>
      <p>EcoMetricAI</p>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => console.log("login vfailed")}
      />
      {token ? "succesful" : "failed"}
    </div>
  );
};

export default Login;
