import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import PhoneInput from "./pages/PhoneInput";
import Verification from "./pages/Verification";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Statistics from "./pages/Statistics";
import Promocodes from "./pages/Promocodes";
import AddPromocode from "./pages/AddPromocode";
import PaymentHistory from "./pages/PaymentHistory";
import PaymentOrder from "./pages/PaymentOrder";
import PaymentSuccess from "./pages/PaymentSuccess";
import AddPersonal from "./pages/AddPersonal";
import Menu from "./components/Menu";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 relative">
        <Menu />
        <Routes>
          <Route path="/" element={<PhoneInput />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/promocodes" element={<Promocodes />} />
          <Route path="/add-promocode" element={<AddPromocode />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/payment-order" element={<PaymentOrder />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/add-personal" element={<AddPersonal />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
