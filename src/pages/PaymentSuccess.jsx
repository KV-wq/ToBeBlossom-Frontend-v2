import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ text, onClick, className }) => (
  <button
    onClick={onClick}
    className={`w-full sm:w-auto sm:px-36 py-3 bg-black/85 text-white rounded-2xl disabled:opacity-50 ${className}`}
  >
    {text}
  </button>
);

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Заявка принята
        </h2>
        <p className="text-3xl font-bold text-gray-900 mb-4">123 456 ₽</p>
        <p className="text-gray-500 mb-8">
          Средства поступят на ваш счёт
          <br />в течение 3-х рабочих дней
        </p>

        <Button text="Готово" onClick={back} />
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
