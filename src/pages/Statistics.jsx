import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Statistics = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const periods = [
    { value: "all", label: "За все время" },
    { value: "today", label: "Сегодня" },
    { value: "week", label: "Эта неделя" },
    { value: "month", label: "Этот месяц" },
    { value: "month30", label: "За 30 дней" },
  ];

  const stats = {
    orders: {
      total: 1654789,
      count: 126,
      avgCheck: 13133,
      commission: 54789,
      commissionPercent: 7.75,
      growth: 12.5,
    },
  };

  const orders = [
    {
      id: "123456789",
      date: "23.01.25",
      details: [
        { type: "order", text: "3 товара • 14 231 ₽ • -7%" },
        { type: "purchase", text: "Выкуп: 2 товара • 10 123 ₽" },
        { type: "return", text: "Возврат: 1 товар • 4 123 ₽" },
        { type: "payment", text: "Начислено: 2 123 ₽ (15%)" },
      ],
      status: "paid",
      promoCode: "PROMO17",
    },
    {
      id: "123456790",
      date: "22.01.25",
      details: [{ type: "order", text: "2 товара • 8 450 ₽ • -10%" }],
      status: "processing",
      promoCode: "PROMO10",
    },
    {
      id: "234567901",
      date: "11.01.25",
      details: [
        { type: "order", text: "3 товара • 10 231 ₽ • -7%" },
        { type: "purchase", text: "Выкуп: 3 товара • 10 123 ₽" },
        { type: "payment", text: "Начислено: 1 567 ₽ (15%)" },
      ],
      status: "paid",
      promoCode: "PROMO19",
    },
  ];

  const formatMoney = (value) => value.toLocaleString() + " ₽";

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center mb-6 mt-3">
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
          Статистика продаж
        </h1>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-2xl p-5 mb-6">
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {formatMoney(stats.orders.total)}
            </h3>
            <p className="text-sm text-gray-500">Общая выручка</p>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg font-medium text-gray-900">
                {formatMoney(stats.orders.commission)}
              </h3>
              <span className="text-sm text-green-500">
                +{stats.orders.growth}%
              </span>
            </div>
            <p className="text-sm text-gray-500">Ваши начисления</p>
          </div>

          <div className="col-span-2 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Заказов: {stats.orders.count}
              </span>
              <span className="text-gray-500">
                Средний чек: {formatMoney(stats.orders.avgCheck)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row mb-6">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="flex-1 px-3 py-2 bg-white rounded-xl border border-gray-200 focus:outline-gray-600"
        >
          {periods.map((period) => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </select>

        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Поиск заказа или промокода"
          className="flex-1 px-3 py-2 bg-white rounded-xl border border-gray-200 focus:outline-gray-600 mt-4"
        />
      </div>

      {/* Orders */}
      <div className="space-y-4 mb-10">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-gray-900">#{order.id}</span>
              <span className="text-sm text-gray-500">{order.date}</span>
            </div>

            <div className="space-y-2 mb-4">
              {order.details.map((detail, idx) => (
                <p
                  key={idx}
                  className={`text-sm ${
                    detail.type === "order"
                      ? "text-gray-600"
                      : detail.type === "purchase"
                      ? "text-blue-700"
                      : detail.type === "return"
                      ? "text-red-600"
                      : detail.type === "payment"
                      ? "text-green-600"
                      : ""
                  }`}
                >
                  {detail.text}
                </p>
              ))}
            </div>

            <div className="flex justify-between">
              <span className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-full">
                {order.promoCode}
              </span>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  order.status === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {order.status === "paid" ? "Начислен" : "В обработке"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
