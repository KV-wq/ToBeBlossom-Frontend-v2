import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PhoneInput = () => {
  const [formattedNumber, setFormattedNumber] = useState("");
  const navigate = useNavigate();

  const handleInput = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.substring(0, 10);
    setFormattedNumber(formatNumber(value));
  };

  const formatNumber = (value) => {
    if (value.length === 0) return "";
    if (value.length <= 3) return `(${value}`;
    if (value.length <= 6) return `(${value.slice(0, 3)}) ${value.slice(3)}`;
    if (value.length <= 8)
      return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
      6,
      8
    )}-${value.slice(8)}`;
  };

  const submitForm = (e) => {
    e.preventDefault();
    navigate("/verification");
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-start leading-tight text-nowrap">
        Введите
        <br />
        номер телефона
      </h2>

      <p className="text-gray-500 mt-2 mb-8">
        Введите номер в указанном формате
      </p>

      <form className="mt-16" onSubmit={submitForm}>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
            <img src="src/assets/russia.svg" alt="flag" />
            <span className="text-gray-900 text-lg font-medium ml-2">+7</span>
          </div>
          <input
            type="tel"
            id="phone-input"
            className="block w-full ps-[4.8rem] text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-transparent border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-500 shadow-sm placeholder-gray-400"
            value={formattedNumber}
            onChange={handleInput}
            placeholder="(000) 555-55-55"
            pattern="^\(\d{3}\) \d{3}-\d{2}-\d{2}$"
            required
          />
        </div>
        <button
          type="submit"
          disabled={formattedNumber.length !== 15}
          className="mt-5 w-full bg-black/90 text-white py-3 px-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Продолжить
        </button>
      </form>
    </div>
  );
};

export default PhoneInput;
