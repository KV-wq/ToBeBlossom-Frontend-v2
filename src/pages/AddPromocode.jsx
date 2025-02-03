import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePromocodeStore } from "../store/promocodeStore";
import DateInput from "../components/DateInput";

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

const AddPromocode = () => {
  const navigate = useNavigate();
  const createPromocode = usePromocodeStore((state) => state.createPromocode);

  const [range, setRange] = useState(10);
  const [promoName, setPromoName] = useState("");
  const [limitDate, setLimitDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Валидация данных
  const validateForm = () => {
    if (!promoName) {
      setError("Введите название промокода");
      return false;
    }
    if (!limitDate) {
      setError("Выберите дату окончания действия");
      return false;
    }
    const selectedDate = new Date(limitDate);
    if (selectedDate < new Date()) {
      setError("Дата окончания не может быть в прошлом");
      return false;
    }
    return true;
  };

  const savePromocode = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const promocodeData = {
        code: promoName,
        rewards: {
          stylist: range,
          client: 25 - range,
        },
        status: {
          isActive: true,
          validFrom: new Date().toISOString(),
          validUntil: new Date(limitDate).toISOString(),
        },
        notes: notes,
      };

      await createPromocode(promocodeData);
      navigate("/promocodes");
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка при создании промокода");
    } finally {
      setLoading(false);
    }
  };

  function generate(length = 6) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let promoCode = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      promoCode += characters.charAt(randomIndex);
    }
    return promoCode;
  }

  const generatePromoCode = () => {
    setPromoName(generate().toUpperCase());
  };

  const back = () => {
    if (promoName || notes || limitDate) {
      if (
        window.confirm(
          "Вы уверены, что хотите выйти? Несохраненные данные будут потеряны."
        )
      ) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  // Получаем минимальную допустимую дату (сегодня)
  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div className="container max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold">Создать промокод</h2>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="mt-7">
        <input
          type="text"
          placeholder="Название"
          value={promoName}
          maxLength={10}
          onChange={(e) => setPromoName(e.target.value.toUpperCase())}
          className="bg-gray-50 uppercase font-semibold border mr-3 p-2 border-gray-500 text-gray-900 text-sm rounded-lg block w-full h-11 mb-2 text-center"
        />
        <button
          onClick={generatePromoCode}
          disabled={loading}
          className="w-full h-11 bg-lime-300 rounded-xl transition-all active:scale-95 active:translate-y-1 font-semibold disabled:opacity-50"
        >
          Сгенерировать
        </button>
      </div>

      <input
        id="range"
        type="range"
        value={range}
        onChange={(e) => setRange(Number(e.target.value))}
        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-8 mb-4"
        min="5"
        step="1"
        max="20"
        disabled={loading}
      />

      <div className="mb-6 mt-4 flex">
        <div className="w-full rounded-xl border border-black/85 px-3 py-1 mr-2">
          <p>Ваш доход</p>
          <p className="text-lg font-semibold">{range}%</p>
        </div>
        <div className="w-full rounded-xl border border-black/85 px-3 py-1">
          <p>Скидка клиенту</p>
          <p className="text-lg font-semibold">{25 - range}%</p>
        </div>
      </div>

      {/* <input
        type="date"
        min={minDate}
        value={limitDate}
        onChange={(e) => setLimitDate(e.target.value)}
        className="bg-gray-50 border p-2 border-gray-500 text-gray-900 text-sm rounded-lg block w-full h-9 mb-2 text-center"
        disabled={loading}
      /> */}

      <DateInput
        value={limitDate}
        onChange={(e) => setLimitDate(e.target.value)}
        min={minDate}
        disabled={loading}
      />

      <textarea
        type="text"
        placeholder="Заметки для себя"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        maxLength={200}
        className="bg-gray-50 border p-2 border-gray-500 text-gray-900 text-sm rounded-lg block w-full h-16 mb-2 text-center"
        disabled={loading}
      />

      <Button
        text={loading ? "Создание..." : "Создать"}
        className="mt-5"
        onClick={savePromocode}
        disabled={loading}
      />
      <Button
        text="Назад"
        className="mt-3"
        isWhite
        onClick={back}
        disabled={loading}
      />
    </div>
  );
};

export default AddPromocode;
