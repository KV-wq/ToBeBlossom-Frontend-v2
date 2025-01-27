import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";
import WebApp from "@twa-dev/sdk";

const Button = ({ text, type = "button", disabled, loading }) => (
  <button
    type={type}
    disabled={disabled || loading}
    className={`w-full sm:w-auto sm:px-36 py-3 bg-black/85 text-white rounded-2xl disabled:opacity-50 mt-4`}
  >
    {loading ? "Подождите..." : text}
  </button>
);

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const phone = useAuthStore((state) => state.phone);
  const setUser = useAuthStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    firstname: "",
    secondname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    if (!phone) {
      navigate("/", { replace: true });
    }
    window.scrollTo({ top: 0 });
  }, [phone, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Получаем Telegram user ID из WebApp
      const telegramUser = WebApp.initDataUnsafe.user;
      if (!telegramUser?.id) {
        throw new Error("Не удалось получить данные пользователя Telegram");
      }

      const userData = {
        phone,
        telegramId: telegramUser.id,
        fullName:
          `${formData.secondname} ${formData.firstname} ${formData.lastname}`.trim(),
        email: formData.email,
      };

      const response = await authService.register(userData);

      // Сохраняем данные пользователя в store
      setUser(response.user);

      // Редирект на профиль
      navigate("/profile");
    } catch (err) {
      setError(
        err.response?.data?.message || "Ошибка регистрации. Попробуйте позже"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!phone) return null;

  return (
    <div className="container min-h-screen px-2 py-4 pb-safe">
      <h2 className="text-4xl font-bold text-start">Создать аккаунт</h2>
      <p className="text-gray-500 mt-2 mb-8">Введите данные для регистрации</p>

      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

      <form className="mt-5" onSubmit={register}>
        <div className="grid grid-cols-1 gap-6">
          <input
            required
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="block w-full text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-transparent border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-500 shadow-sm placeholder-gray-400"
            placeholder="Имя"
            disabled={loading}
          />
          <input
            required
            type="text"
            name="secondname"
            value={formData.secondname}
            onChange={handleChange}
            className="block w-full text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-transparent border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-500 shadow-sm placeholder-gray-400"
            placeholder="Фамилия"
            disabled={loading}
          />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="block w-full text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-transparent border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-500 shadow-sm placeholder-gray-400"
            placeholder="Отчество (при наличии)"
            disabled={loading}
          />
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full text-gray-800 text-lg rounded-2xl bg-white py-3 px-4 border border-transparent border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-gray-500 shadow-sm placeholder-gray-400"
            placeholder="Email"
            disabled={loading}
          />
        </div>

        <p className="text-center font-extralight text-xs text-gray-600 mt-6">
          Нажимая кнопку "Продолжить", вы даете{" "}
          <span className="text-black underline">
            согласие на обработку персональных данных
          </span>{" "}
          и соглашаетесь с <span className="text-black underline">офертой</span>
        </p>

        <Button
          text="Продолжить"
          type="submit"
          disabled={
            !formData.firstname || !formData.secondname || !formData.email
          }
          loading={loading}
        />
      </form>
    </div>
  );
};

export default Register;
