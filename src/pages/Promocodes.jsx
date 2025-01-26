import React from "react";
import { useNavigate } from "react-router-dom";
import PromoCard from "../components/PromoCard";

const Button = ({ text, onClick, className }) => (
  <button
    onClick={onClick}
    className={`w-full sm:w-auto sm:px-36 py-3 bg-black/85 text-white rounded-2xl disabled:opacity-50 ${className}`}
  >
    {text}
  </button>
);

const Promocodes = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-2">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/home")}
          className="p-2 hover:bg-gray-50 rounded-xl"
        >
          <img
            src="/assets/Icons/arrow.svg"
            className="w-6 h-6 rotate-90"
            alt="Back"
          />
        </button>
        <h1 className="text-2xl font-medium text-gray-900 ml-3">
          Мои промокоды
        </h1>
      </div>

      <Button
        text="Создать промокод"
        className="!my-6"
        onClick={() => navigate("/add-promocode")}
      />

      <div className="flex flex-col gap-5">
        {[1, 2, 3].map((index) => (
          <PromoCard key={index} promoId={index} />
        ))}
      </div>
    </div>
  );
};

export default Promocodes;
