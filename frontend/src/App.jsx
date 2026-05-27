import Nav from "@/components/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Footer from "@/components/Footer";
import ErrorPage from "@/pages/ErrorPage";

const App = () => {
  return (
    <div className="w-full h-full">
      <Nav />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ErrorPage" element={<ErrorPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
