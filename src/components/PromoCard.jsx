import React, { useState } from "react";
import { usePromocodeStore } from "../store/promocodeStore";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const PromoCard = ({ promocode }) => {
  const [showCopied, setShowCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const updatePromocode = usePromocodeStore((state) => state.updatePromocode);

  const { _id, code, rewards, status, statistics } = promocode;

  const copyPromoCode = () => {
    navigator.clipboard.writeText(code);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1500);
  };

  const toggleActive = async () => {
    try {
      setLoading(true);
      await updatePromocode(_id, {
        status: {
          ...status,
          isActive: !status.isActive,
        },
      });
    } catch (error) {
      console.error("Error toggling promocode status:", error);
      // Здесь можно добавить отображение ошибки пользователю
    } finally {
      setLoading(false);
    }
  };

  // Форматирование чисел и дат
  const formatNumber = (num) => new Intl.NumberFormat("ru-RU").format(num);
  const formatDate = (date) =>
    format(new Date(date), "d MMM yy", { locale: ru });

  const handleNotesUpdate = async (newNotes) => {
    try {
      await updatePromocode(promocode._id, {
        ...promocode,
        notes: newNotes,
      });
    } catch (error) {
      console.error("Error updating notes:", error);
    }
  };

  // Расчет конверсии
  const conversionRate =
    statistics.usageCount > 0
      ? Math.round((statistics.usageCount / 100) * 100)
      : 0;

  // Расчет среднего чека
  const averageCheck =
    statistics.usageCount > 0
      ? Math.round(statistics.totalSales / statistics.usageCount)
      : 0;

  return (
    <div className="bg-white rounded-2xl p-4 relative">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-lg font-medium text-gray-900">{code}</span>
          <p className="text-sm text-gray-500 mt-0.5">
            от {formatDate(status.validFrom)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Всего заказов: {statistics.usageCount} • Выкуплено:{" "}
            {statistics.usageCount} <br />
            Начислено: {formatNumber(statistics.totalRewards)} ₽
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
          <p className="text-lg font-medium text-gray-900">
            {rewards.stylist}%
          </p>
          <p className="text-xs text-gray-500">
            Средний чек: {formatNumber(averageCheck)} ₽
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-sm text-gray-500">Скидка клиенту</p>
          <p className="text-lg font-medium text-gray-900">{rewards.client}%</p>
          <p className="text-xs text-gray-500">Конверсия: {conversionRate}%</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <input
          type="text"
          readOnly
          value={`Действует до ${formatDate(status.validUntil)}`}
          className="w-full px-3 py-2 bg-gray-50 text-sm text-center rounded-xl"
        />
        <input
          type="text"
          value={promocode.notes || ""}
          onChange={(e) => handleNotesUpdate(e.target.value)}
          placeholder="Заметки для себя"
          className="w-full px-3 py-2 bg-gray-50 text-sm text-center rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button
          onClick={toggleActive}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
            status.isActive
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          } ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
        >
          {loading
            ? "Обновление..."
            : status.isActive
            ? "Промокод активен"
            : "Промокод не активен"}
        </button>
      </div>
    </div>
  );
};

export default PromoCard;
