import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PhoneInput from "./pages/PhoneInput";
import Verification from "./pages/Verification";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Statistics from "./pages/Statistics";
import Promocodes from "./pages/Promocodes";
import AddPromocode from "./pages/AddPromocode";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<PhoneInput />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/promocodes" element={<Promocodes />} />
          <Route path="/add-promocode" element={<AddPromocode />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
