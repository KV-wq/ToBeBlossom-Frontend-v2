import React from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, Tooltip } from "recharts";
import { TrendingUp, ShoppingCart, RefreshCw, Tag } from "lucide-react";
import { useAuthStore } from "../store/authStore";

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

  const salesData = [
    { name: "Сентябрь", sales: 0 },
    { name: "Октябрь", sales: 0 },
    { name: "Ноябрь", sales: 0 },
    { name: "Декабрь", sales: 0 },
    { name: "Январь", sales: 0 },
    // { name: "Февраль", sales: 0 },
  ];

  const stats = {
    earnings: {
      total: 0,
      withdrawn: 0,
      returns: 0,
      pending: 0,
      soon: 0,
    },
    sales: {
      orders: 0,
      avgCheck: 0,
      upt: 0,
      growth: 0,
    },
    returns: {
      full: 0,
      partial: 0,
      items: 0,
      percentage: 0,
    },
    promos: {
      total: 0,
      active: 0,
      inactive: 0,
      conversion: 0,
    },
  };

  const formatMoney = (value) => value.toLocaleString() + " ₽";

  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-xl mx-auto p-2 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-5 mt-3">
        <img src="/assets/logo.svg" alt="Logo" width="225" height="30" />
      </div>

      {/* User Info */}
      <div className="flex items-center justify-between mb-8 bg-white rounded-2xl p-4 shadow-sm">
        <div>
          <h1 className="text-xl font-medium text-gray-900">{user.fullName}</h1>
          <p className="text-sm text-gray-500 mt-1">Стилист</p>
        </div>
        <img src="/assets/Icons/verified.svg" width={27} />
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-2xl p-4 mb-8 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900 flex items-center">
              <TrendingUp className="mr-2 w-5 h-5 text-blue-500" />
              Динамика продаж
            </h3>
            <p className="text-xl font-bold text-gray-900">
              {formatMoney(
                salesData.reduce((sum, item) => sum + item.sales, 0)
              )}
            </p>
          </div>
          <span className="text-sm text-green-500">+{stats.sales.growth}%</span>
        </div>
        <LineChart
          width={290}
          height={100}
          data={salesData}
          className="mx-auto -translate-y-7"
        >
          <XAxis dataKey="name" hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Main Stats */}
        <div className="bg-white rounded-2xl p-4 sm:col-span-2 shadow-sm">
          <div className="flex justify-between px-1">
            <div>
              <span className="text-sm text-gray-500 flex items-center">
                <ShoppingCart className="mr-2 w-4 h-4 text-blue-500" />
                Начислено всего
              </span>
              <p className="text-xl font-medium text-gray-900">
                {formatMoney(stats.earnings.total)}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500 flex items-center justify-end">
                <RefreshCw className="mr-2 w-4 h-4 text-green-500" />
                Доступно к выводу
              </span>
              <p className="text-xl font-medium text-gray-900">
                {formatMoney(stats.earnings.pending)}
              </p>
            </div>
          </div>
        </div>

        {/* Sales Stats */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <ShoppingCart className="mr-2 w-5 h-5 text-blue-500" />
            Продажи
          </h3>
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
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Tag className="mr-2 w-5 h-5 text-purple-500" />
            Промокоды
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Всего</span>
              <span className="text-sm font-medium text-gray-900">
                {stats.promos.total}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Активных</span>
              <span className="text-sm font-medium text-green-600">
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
          className="!bg-blue-500 hover:!bg-blue-600"
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
