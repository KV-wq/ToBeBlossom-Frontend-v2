import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ text, onClick, className, isWhite }) => (
  <button
    onClick={onClick}
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
  const [range, setRange] = useState(10);
  const [promoName, setPromoName] = useState("");
  const [limitDate, setLimitDate] = useState("");
  const [notes, setNotes] = useState("");

  const savePromocode = () => {
    // Implement save logic
    console.log("Saving promocode", {
      name: promoName,
      range,
      limitDate,
      notes,
    });
  };

  const back = () => {
    navigate(-1);
  };

  return (
    <div className="container max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold">Создать промокод</h2>

      <div className="flex gap-3 mt-7">
        <input
          type="text"
          placeholder="Название"
          value={promoName}
          onChange={(e) => setPromoName(e.target.value)}
          className="bg-gray-50 border p-2 border-gray-500 text-gray-900 text-sm rounded-lg block w-full h-11 mb-2 text-center"
        />
        <button className="w-24 h-11 bg-lime-300 rounded-xl transition-all active:scale-95 active:translate-y-1 font-semibold">
          ОК
        </button>
      </div>

      <input
        id="range"
        type="range"
        value={range}
        onChange={(e) => setRange(Number(e.target.value))}
        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-8 mb-4"
        min="5"
        step="5"
        max="20"
      />

      <div className="mb-6 mt-4 flex gap-3">
        <div className="w-full rounded-xl border border-black/85 px-3 py-1">
          <p>Ваш доход</p>
          <p className="text-lg font-semibold">{range}%</p>
        </div>
        <div className="w-full rounded-xl border border-black/85 px-3 py-1">
          <p>Скидка клиенту</p>
          <p className="text-lg font-semibold">{25 - range}%</p>
        </div>
      </div>

      <input
        type="number"
        placeholder="Дата лимита действия"
        value={limitDate}
        onChange={(e) => setLimitDate(e.target.value)}
        className="bg-gray-50 border p-2 border-gray-500 text-gray-900 text-sm rounded-lg block w-full h-9 mb-2 text-center"
      />
      <input
        type="text"
        placeholder="Заметки для себя"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="bg-gray-50 border p-2 border-gray-500 text-gray-900 text-sm rounded-lg block w-full h-9 mb-2 text-center"
      />

      <Button text="Создать" className="mt-5" onClick={savePromocode} />
      <Button text="Назад" className="mt-3" isWhite onClick={back} />
    </div>
  );
};

export default AddPromocode;
