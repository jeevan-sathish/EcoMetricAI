import React from "react";
import Nav from "@/layouts/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Analysis from "@/pages/Analysis";
import Footer from "@/layouts/Footer";
import ErrorPage from "@/pages/ErrorPage";
import useProfileStore from "./store/useProfileStore";
import api from "./services/api";

const App = () => {
  const { setName, setEmail, setProfilePicture } = useProfileStore();
  const token = localStorage.getItem("access_token");
  async function fetchuserProfile() {
    try {
      if (!token) window.location.reload();
      const userprofileData = await api.get("/profile/profileData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setName(userprofileData.data.name);
      setEmail(userprofileData.data.email);
      setProfilePicture(userprofileData.data.picture);
    } catch (error) {
      console.log("Error fetching user profile", error);
    }
  }

  React.useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      fetchuserProfile();
    }
  }, [token]);
  return (
    <div className="w-full h-full">
      <Nav />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Analysis" element={<Analysis />} />
          <Route path="/ErrorPage" element={<ErrorPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
