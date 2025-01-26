import React from "react";
import { useNavigate } from "react-router-dom";

// Custom Button component with specified style
const Button = ({ text, onClick, className, ...props }) => (
  <button
    onClick={onClick}
    className={`w-full sm:w-auto sm:px-36 py-3 bg-black/85 text-white rounded-2xl disabled:opacity-50 ${className}`}
    {...props}
  >
    {text}
  </button>
);

const HomePage = () => {
  const navigate = useNavigate();

  const stats = {
    earnings: {
      total: 1234567,
      withdrawn: 234567,
      returns: 234567,
      pending: 234567,
      soon: 234567,
    },
    sales: {
      orders: 17,
      avgCheck: 23000,
      upt: 1.7,
    },
    returns: {
      full: 7,
      partial: 3,
      items: 12,
    },
    promos: {
      total: 7,
      active: 2,
      inactive: 3,
    },
  };

  const formatMoney = (value) => value.toLocaleString() + " ₽";

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-5 mt-3">
        <img src="/assets/logo.svg" alt="Logo" className="h-8 w-full" />
      </div>

      {/* User Info */}
      <div className="flex items-center justify-between mb-8 bg-white rounded-2xl p-4">
        <div>
          <h1 className="text-xl font-medium text-gray-900">
            Иванов Иван Иванович
          </h1>
          <p className="text-sm text-gray-500 mt-1">Стилист</p>
        </div>
        <img
          src="/assets/Icons/verified.svg"
          className="w-6 h-6"
          alt="Verified"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Main Stats */}
        <div className="bg-white rounded-2xl p-4 sm:col-span-2">
          <div className="flex justify-between px-1">
            <div>
              <span className="text-sm text-gray-500">Начислено всего</span>
              <p className="text-xl font-medium text-gray-900">
                {formatMoney(stats.earnings.total)}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Доступно к выводу</span>
              <p className="text-xl font-medium text-gray-900">
                {formatMoney(stats.earnings.pending)}
              </p>
            </div>
          </div>
        </div>

        {/* Sales Stats */}
        <div className="bg-white rounded-2xl p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Продажи</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Заказов</span>
              <span className="text-sm font-medium text-gray-900">
                {stats.sales.orders}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Средний чек</span>
              <span className="text-sm font-medium text-gray-900">
                {formatMoney(stats.sales.avgCheck)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">UPT</span>
              <span className="text-sm font-medium text-gray-900">
                {stats.sales.upt}
              </span>
            </div>
          </div>
        </div>

        {/* Promos Stats */}
        <div className="bg-white rounded-2xl p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Промокоды</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Всего</span>
              <span className="text-sm font-medium text-gray-900">
                {stats.promos.total}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Активных</span>
              <span className="text-sm font-medium text-gray-900">
                {stats.promos.active}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Неактивных</span>
              <span className="text-sm font-medium text-gray-900">
                {stats.promos.inactive}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="space-y-3">
        <Button
          text="Личный кабинет"
          onClick={() => navigate("/profile")}
          className="!bg-white !text-gray-900 border shadow-md !border-gray-200"
        />
        <Button
          text="Статистика продаж"
          onClick={() => navigate("/statistics")}
          className="!bg-blue-500 !hover:bg-blue-600"
        />
        <Button
          text="Промокоды"
          onClick={() => navigate("/promocodes")}
          className="hover:bg-gray-900"
        />
      </div>
    </div>
  );
};

export default HomePage;
