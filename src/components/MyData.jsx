import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";

const Button = ({ text, className, disabled, type = "button", onClick }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`w-full sm:w-auto sm:px-36 py-3 bg-black/85 text-white rounded-2xl disabled:opacity-50 ${className}`}
  >
    {text}
  </button>
);

const MyData = () => {
  const [checked, setChecked] = useState(false);
  const [selectedType, setSelectedType] = useState("self_employed");
  const user = useAuthStore((state) => state.user);

  const types = [
    { id: "self_employed", label: "Самозанятый" },
    { id: "person", label: "Физ. лицо" },
    { id: "individual", label: "ИП" },
  ];

  const updateData = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <div className="container max-w-md mx-auto">
      <h2 className="text-3xl font-medium text-gray-900 mb-8">Мои данные</h2>

      <form onSubmit={updateData} className="space-y-6">
        {/* ФИО */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              {user.fullName.split(" ")[0]}
            </label>
            <input
              value="Иванов"
              readOnly
              type="text"
              className="mt-1 block w-full text-gray-800 text-lg rounded-2xl bg-gray-100 py-3 px-4 border border-transparent focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              {user.fullName.split(" ")[1]}
            </label>
            <input
              value="Иван"
              readOnly
              type="text"
              className="mt-1 block w-full text-gray-800 text-lg rounded-2xl bg-gray-100 py-3 px-4 border border-transparent focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              {user.fullName.split(" ")[2]}
            </label>
            <input
              value="Иванович"
              readOnly
              type="text"
              className="mt-1 block w-full text-gray-800 text-lg rounded-2xl bg-gray-100 py-3 px-4 border border-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Контакты */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              defaultValue={user.email}
              className="mt-1 block w-full text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Телефон</label>
            <input
              type="tel"
              defaultValue={user.phone}
              className="mt-1 block w-full text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-700"
            />
          </div>
        </div>

        {/* Тип */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Тип регистрации
          </label>
          <div className="grid grid-cols-3 gap-4">
            {types.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={`py-2 px-1 rounded-xl text-xs font-medium transition-colors ${
                  selectedType === type.id
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Документы */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">ИНН</label>
            <input
              type="text"
              className="mt-1 block w-full text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">СНИЛС</label>
            <input
              type="text"
              className="mt-1 block w-full text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Адрес регистрации
            </label>
            <input
              type="text"
              className="mt-1 block w-full text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">ОГРНИП</label>
            <input
              type="text"
              className="mt-1 block w-full text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-700"
            />
          </div>
        </div>

        {/* Agreement */}
        <label
          htmlFor="tick"
          className="mt-8 mb-4 relative text-black flex cursor-pointer items-start gap-3"
        >
          <div className="relative">
            <input
              id="tick"
              name="tick"
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              className="appearance-none absolute z-10 w-5 h-5 cursor-pointer"
            />
            <div className="w-5 h-5 border-2 border-black rounded absolute top-0 left-0 pointer-events-none"></div>
            {checked && (
              <svg
                className="absolute top-0 left-0 w-5 h-5 pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="3"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </div>
          <p className="text-xs text-gray-700 font-extralight [user-select:none] leading-tight ml-5">
            Даю{" "}
            <span className="underline">
              согласие на обработку персональных <br /> данных
            </span>{" "}
            и соглашаюсь <span className="underline">с офертой</span>
          </p>
        </label>

        <Button
          text="Изменить"
          className="!mb-12"
          disabled={!checked}
          type="submit"
        />
      </form>
    </div>
  );
};

export default MyData;
