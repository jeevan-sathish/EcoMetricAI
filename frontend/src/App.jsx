import React from "react";
import Nav from "@/layouts/Nav";
import { Route, Routes } from "react-router-dom";

import Footer from "@/layouts/Footer";

import useProfileStore from "./store/useProfileStore";
import api from "./services/api";
import { lazy, Suspense } from "react";
import { Comment } from "react-loader-spinner";
import ProtectedRoute from "./auth/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Analysis = lazy(() => import("./pages/Analysis"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const App = () => {
  const { setName, setEmail, setProfilePicture } = useProfileStore();

  async function fetchuserProfile() {
    const token = localStorage.getItem("access_token");
    try {
      if (!token) return;
      const userprofileData = await api.get("/profile/profileData");
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
  }, []);
  return (
    <div className="w-full h-full">
      <Nav />

      <main>
        <Suspense
          fallback={
            <div className="flex h-[70vh] items-center justify-center">
              <Comment
                visible={true}
                height="60"
                width="60"
                color="#ffffff"
                backgroundColor="#22c55e"
              />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/Analysis"
              element={
                <ProtectedRoute>
                  <Analysis />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default App;
