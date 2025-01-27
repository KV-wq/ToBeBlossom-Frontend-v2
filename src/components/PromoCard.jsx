import React, { useState, useEffect } from "react";
import { usePromocodeStore } from "../store/promocodeStore";
import { debounce } from "lodash";
import { Check } from "lucide-react";

const PromoCard = ({ promocode }) => {
  const [showCopied, setShowCopied] = useState(false);
  const [notes, setNotes] = useState(promocode.notes || "");
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const updatePromocode = usePromocodeStore((state) => state.updatePromocode);

  useEffect(() => {
    setNotes(promocode.notes || "");
  }, [promocode.notes]);

  const copyPromoCode = () => {
    navigator.clipboard.writeText(promocode.code);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1500);
  };

  const debouncedSave = debounce(async (newNotes) => {
    try {
      setIsSaving(true);
      await updatePromocode(promocode._id, {
        ...promocode,
        notes: newNotes,
      });
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 1500);
    } catch (error) {
      console.error("Error updating notes:", error);
    } finally {
      setIsSaving(false);
    }
  }, 1000);

  // Очистка debounce при размонтировании
  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    debouncedSave(newNotes);
  };

  const toggleActive = async () => {
    try {
      await updatePromocode(promocode._id, {
        ...promocode,
        status: {
          ...promocode.status,
          isActive: !promocode.status.isActive,
        },
      });
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 relative">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-lg font-medium text-gray-900">
            {promocode.code}
          </span>
          <p className="text-sm text-gray-500 mt-0.5">
            от {new Date(promocode.status.validFrom).toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Всего заказов: {promocode.statistics.usageCount} • Выкуплено:{" "}
            {promocode.statistics.usageCount} <br />
            Начислено: {promocode.statistics.totalRewards.toLocaleString()} ₽
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
            {promocode.rewards.stylist}%
          </p>
          <p className="text-xs text-gray-500">
            Средний чек:{" "}
            {(
              promocode.statistics.totalSales /
              (promocode.statistics.usageCount || 1)
            ).toLocaleString()}{" "}
            ₽
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-sm text-gray-500">Скидка клиенту</p>
          <p className="text-lg font-medium text-gray-900">
            {promocode.rewards.client}%
          </p>
          <p className="text-xs text-gray-500">
            Конверсия:{" "}
            {Math.round((promocode.statistics.usageCount / 100) * 100)}%
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <input
          type="text"
          readOnly
          value={`Действует до ${new Date(
            promocode.status.validUntil
          ).toLocaleDateString()}`}
          className="w-full px-3 py-2 bg-gray-50 text-sm text-center rounded-xl"
        />
        <div className="relative">
          <input
            type="text"
            placeholder="Заметки для себя"
            value={notes}
            onChange={handleNotesChange}
            maxLength={200}
            className="w-full px-3 py-2 bg-gray-50 text-sm text-center rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {(isSaving || showSaved) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isSaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-500 border-t-transparent" />
              ) : (
                showSaved && <Check className="h-4 w-4 text-green-500" />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button
          onClick={toggleActive}
          className={`w-full py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
            promocode.status.isActive
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          {promocode.status.isActive
            ? "Промокод активен"
            : "Промокод не активен"}
        </button>
      </div>
    </div>
  );
};

export default PromoCard;
