import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bikes from "./pages/Bikes";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Tyre from "./pages/Tyre";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/tyres" element={<Tyre />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
