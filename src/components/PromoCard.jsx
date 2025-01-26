import React, { useState } from "react";

const PromoCard = ({ promoId }) => {
  const [showCopied, setShowCopied] = useState(false);
  const [isActive, setIsActive] = useState(promoId !== 2);

  const copyPromoCode = () => {
    navigator.clipboard.writeText("PROMO32");
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1500);
  };

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="bg-white rounded-2xl p-4 relative">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-lg font-medium text-gray-900">PROMO32</span>
          <p className="text-sm text-gray-500 mt-0.5">от 12.01.25</p>
          <p className="text-xs text-gray-500 mt-1">
            Всего заказов: 126 • Выкуплено: 98 <br />
            Начислено: 45 600 ₽
          </p>
        </div>
        <div className="relative">
          <button
            onClick={copyPromoCode}
            className="p-2 hover:bg-gray-50 rounded-xl active:scale-95 transition-transform"
          >
            <img src="/assets/Icons/copy.svg" className="w-5 h-5" alt="Copy" />
          </button>

          <div
            className={`absolute right-0 -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity duration-300 ${
              showCopied ? "opacity-100" : "opacity-0"
            }`}
          >
            Промокод скопирован
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-sm text-gray-500">Ваш доход</p>
          <p className="text-lg font-medium text-gray-900">5%</p>
          <p className="text-xs text-gray-500">Средний чек: 12 400 ₽</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-sm text-gray-500">Скидка клиенту</p>
          <p className="text-lg font-medium text-gray-900">20%</p>
          <p className="text-xs text-gray-500">Конверсия: 78%</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <input
          type="text"
          readOnly
          value="Действует до 12.02.25"
          className="w-full px-3 py-2 bg-gray-50 text-sm text-center rounded-xl"
        />
        <input
          type="text"
          placeholder="Заметки для себя"
          className="w-full px-3 py-2 bg-gray-50 text-sm text-center rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button
          onClick={toggleActive}
          className={`w-full py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
            isActive
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          {isActive ? "Промокод активен" : "Промокод не активен"}
        </button>
      </div>
    </div>
  );
};

export default PromoCard;
