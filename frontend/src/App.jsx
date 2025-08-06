import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bikes from "./pages/Bikes";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Tyre from "./pages/Tyre";
import LoginPage from "./pages/LoginPage";
import ContactUs from "./pages/ContactUs";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/bikes" element={<Bikes />} />
          <Route path="/tyres" element={<Tyre />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;