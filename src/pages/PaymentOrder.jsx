import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentCard from "../components/PaymentCard";

const Button = ({ text, onClick, className, isWhite, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full sm:w-auto sm:px-36 py-3 rounded-2xl disabled:opacity-50 ${
      isWhite
        ? "bg-white text-black border border-black"
        : "bg-black/85 text-white"
    } ${className}`}
  >
    {text}
  </button>
);

const PaymentOrderPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [money, setMoney] = useState("");

  const back = () => {
    navigate(-1);
  };

  const createOrder = () => {
    navigate("/payment-success");
  };

  return (
    <div className="container max-w-md mx-auto p-4">
      <h2 className="text-3xl text-center font-bold">Вывод средств</h2>

      <div className="mt-7">
        <div className="mt-2">
          <input
            required
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            type="text"
            name="money"
            className="block w-full text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-transparent border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-500 shadow-sm placeholder-gray-400"
            placeholder="Сумма (₽)"
          />
        </div>
        <div className="flex justify-between w-full text-xs mt-2 px-2">
          <p>Доступно: 123 456 ₽</p>
          <p>Останется: 123 456 ₽</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-6 mb-6">
        <div
          onClick={() => setSelectedMethod(1)}
          className={`cursor-pointer rounded-xl ${
            selectedMethod === 1
              ? "border-black/90 border-[3px] "
              : "border-[3px] border-black/25 "
          }`}
        >
          <PaymentCard noOptions />
        </div>
        <div
          onClick={() => setSelectedMethod(2)}
          className={`cursor-pointer rounded-xl ${
            selectedMethod === 2
              ? "border-black/90 border-[3px] "
              : "border-[3px] border-black/25 "
          }`}
        >
          <PaymentCard noOptions />
        </div>
      </div>

      <Button
        text="Вывести"
        onClick={createOrder}
        disabled={selectedMethod === null || money === ""}
      />
      <Button text="Назад" className="mt-4" isWhite onClick={back} />
    </div>
  );
};

export default PaymentOrderPage;
