import Nav from "@/components/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Footer from "@/components/Footer";
import Error404 from "@/pages/Error404";

const App = () => {
  return (
    <div className="w-full h-full">
      <Nav />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Error404" element={<Error404 />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
