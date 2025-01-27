import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

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

const AddPersonal = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("self_employed");

  const bankTypes = [
    { id: "self_employed", label: "Самозанятый" },
    { id: "person", label: "Физ. лицо" },
    { id: "individual", label: "ИП" },
  ];

  const savePersonal = () => {
    // Implement save logic
    console.log("Saving personal details");
  };

  const back = () => {
    navigate(-1);
  };

  const user = useAuthStore((state) => state.user);

  return (
    <div className="bg-gray-50 rounded-2xl p-2 max-w-2xl mx-auto">
      <h2 className="text-2xl font-medium text-gray-900">Добавление счета</h2>

      <form className="mt-8 space-y-6">
        {/* ФИО */}
        <div>
          <label className="text-sm font-medium text-gray-700">ФИО</label>
          <input
            value={user.fullName}
            readOnly
            type="text"
            className="mt-2 w-full px-3 py-2 bg-gray-100 text-gray-900 rounded-xl border-0 outline-none"
          />
        </div>

        {/* Тип счета */}
        <div>
          <label className="text-sm font-medium text-gray-700">Тип счета</label>
          <div className="mt-2 grid grid-cols-3 gap-4">
            {bankTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={`px-auto py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedType === type.id
                    ? "bg-black/80 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* БИК */}
        <div>
          <label className="text-sm font-medium text-gray-700">БИК</label>
          <input
            required
            type="number"
            className="mt-2 w-full px-3 py-2 bg-white text-gray-900 rounded-xl border border-gray-200 focus:outline-gray-700 focus:border-transparent"
            placeholder="000000000"
          />
        </div>

        {/* Р/С */}
        <div>
          <label className="text-sm font-medium text-gray-700">Р/С</label>
          <div className="relative mt-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              407
            </span>
            <input
              required
              type="number"
              className="w-full pl-12 pr-3 py-2 bg-white text-gray-900 rounded-xl border border-gray-200 focus:outline-gray-700 focus:border-transparent"
              placeholder="00000000000000000"
            />
          </div>
        </div>

        {/* Корр. счет */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Корреспондентский счет
          </label>
          <input
            required
            type="number"
            className="mt-2 w-full px-3 py-2 bg-white text-gray-900 rounded-xl border border-gray-200 focus:outline-gray-700 focus:border-transparent"
            placeholder="00000000000000000000"
          />
        </div>

        {/* Банк */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Наименование банка
          </label>
          <input
            required
            type="text"
            className="mt-2 w-full px-3 py-2 bg-white text-gray-900 rounded-xl border border-gray-200 focus:outline-gray-700 focus:border-transparent"
            placeholder="Введите название банка"
          />
        </div>

        <Button
          text="Сохранить"
          onClick={savePersonal}
          className="!mt-12 !-mb-2"
        />
        <Button
          text="Назад"
          className="border border-black mt-0"
          isWhite
          onClick={back}
        />
      </form>
    </div>
  );
};

export default AddPersonal;
