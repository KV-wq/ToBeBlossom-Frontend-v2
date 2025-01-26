import React, { useEffect } from "react";

const Button = ({ text, type = "button" }) => (
  <button
    type={type}
    className={`w-full sm:w-auto sm:px-36 py-3 bg-black/85 text-white rounded-2xl disabled:opacity-50 mt-4`}
  >
    {text}
  </button>
);

const Register = () => {
  const register = (e) => {
    e.preventDefault();

    window.location.href = "/profile";
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="container min-h-screen pb-safe">
      <h2 className="text-4xl font-bold text-start">Создать аккаунт</h2>
      <p className="text-gray-500 mt-2 mb-8">Введите данные для регистрации</p>

      <form className="mt-5" onSubmit={register}>
        <div className="grid grid-cols-1 gap-6">
          <input
            required
            type="text"
            name="firstname"
            className="block w-full text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-transparent border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-500 shadow-sm placeholder-gray-400"
            placeholder="Имя"
          />
          <input
            required
            type="text"
            name="secondname"
            className="block w-full text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-transparent border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-500 shadow-sm placeholder-gray-400"
            placeholder="Фамилия"
          />
          <input
            type="text"
            name="lastname"
            className="block w-full text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-transparent border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-500 shadow-sm placeholder-gray-400"
            placeholder="Отчество (при наличии)"
          />
          <input
            required
            type="email"
            name="email"
            className="block w-full text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-transparent border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-500 shadow-sm placeholder-gray-400"
            placeholder="Email"
          />
        </div>

        <p className="text-center font-extralight text-xs text-gray-600 mt-6">
          Нажимая кнопку "Продолжить", вы даете{" "}
          <span className="text-black underline">
            согласие на обработку персональных данных
          </span>{" "}
          и соглашаетесь с <span className="text-black underline">офертой</span>
        </p>

        <Button text="Продолжить" type="submit" />
      </form>
    </div>
  );
};

export default Register;
