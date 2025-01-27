import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import PrivateRoute from "./components/PrivateRoute";
import { useAuthStore } from "./store/authStore";

function App() {
  const { pathname } = useLocation();
  const initialize = useAuthStore((state) => state.initialize);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const showMenu = !["/", "/verification", "/register"].includes(pathname);

  if (
    isAuthenticated &&
    ["/", "/verification", "/register"].includes(pathname)
  ) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 relative">
        {showMenu && <Menu />}
        <Routes>
          <Route path="/" element={<PhoneInput />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/promocodes" element={<Promocodes />} />
            <Route path="/add-promocode" element={<AddPromocode />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            <Route path="/payment-order" element={<PaymentOrder />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/add-personal" element={<AddPersonal />} />
          </Route>
        </Routes>
        {showMenu && <div className="w-full h-[60px]" />}
      </main>
    </div>
  );
}

export default App;
