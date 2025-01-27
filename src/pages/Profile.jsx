import React from "react";
import { useNavigate } from "react-router-dom";
import PaymentCard from "../components/PaymentCard";
import MyData from "../components/MyData";
import WebApp from "@twa-dev/sdk";
import { useAuthStore } from "../store/authStore";

const Profile = () => {
  const navigate = useNavigate();
  const addPersonal = () => {
    navigate("/add-personal");
  };

  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-2xl mx-auto p-2 pt-5">
      {/* Header */}
      <div className="flex mb-8 justify-start">
        <img src="/assets/logo.svg" height="30" width="225" alt="Logo" />
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-2xl p-4 mb-6">
        <div className="flex items-center">
          <img
            src={
              WebApp?.initDataUnsafe?.user?.photo_url || "/assets/avatar.jpg"
            }
            className="w-16 h-16 rounded-full"
            alt="Avatar"
          />
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-medium text-gray-900">
                {user.fullname}
              </h1>
              <img
                src="/assets/Icons/verified.svg"
                className="w-7 h-7"
                alt="Verified"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">Стилист</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/home")}
          className="w-full sm:w-auto sm:px-3 py-2 mt-5 bg-black/80 text-white rounded-2xl disabled:opacity-50"
        >
          Посмотреть статистику
        </button>
      </div>

      {/* Earnings */}
      <div className="bg-white rounded-2xl p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Доступно к выводу</p>
            <p className="text-2xl font-medium text-gray-900 mt-1">12 345 ₽</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Скоро поступит</p>
            <p className="text-2xl font-medium text-gray-900 mt-1">23 456 ₽</p>
          </div>
        </div>

        <div className="grid grid-rows-1 gap-4">
          <button
            className="w-full sm:w-auto sm:px-36 py-3 bg-white text-black border border-stone-600 rounded-2xl disabled:opacity-50"
            onClick={() => navigate("/payment-history")}
          >
            История выплат
          </button>
          <button
            className="w-full sm:w-auto sm:px-36 py-3 bg-black/80 text-white rounded-2xl disabled:opacity-50"
            onClick={() => navigate("/payment-order")}
          >
            Вывести средства
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl p-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Способы вывода</h2>
          <button
            onClick={addPersonal}
            className="w-5/12 sm:w-auto sm:px-36 py-2 bg-white text-black border border-stone-600 rounded-2xl disabled:opacity-50"
          >
            Добавить
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <PaymentCard />
          <PaymentCard />
        </div>
      </div>

      <MyData />
    </div>
  );
};

export default Profile;
