import Nav from "@/layouts/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Analysis from "@/pages/Analysis";
import Footer from "@/layouts/Footer";
import ErrorPage from "@/pages/ErrorPage";

const App = () => {
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
