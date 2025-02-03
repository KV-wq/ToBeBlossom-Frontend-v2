import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";

const CodeVerification = () => {
  const [timerValue, setTimerValue] = useState(45);
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const phone = useAuthStore((state) => state.phone);

  useEffect(() => {
    if (!phone) {
      navigate("/", { replace: true });
    }
  }, [phone, navigate]);

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    const numbers = phone.replace(/\D/g, "").slice(-10);
    return `+7 (${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(
      6,
      8
    )}-${numbers.slice(8)}`;
  };

  const handleInput = (event, index) => {
    setError("");
    let value = event.target.value.replace(/[^0-9]/g, "").substring(0, 1);
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setCode(newDigits.join(""));

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const resendCode = async () => {
    if (timerValue > 0) return;

    setLoading(true);
    setError("");
    try {
      await authService.sendVerificationCode(phone);
      setTimerValue(0);
      setDigits(["", "", "", ""]);
      setCode("");
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка отправки кода");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await authService.verifyCode(phone, code);

      if (response.tokens) {
        localStorage.setItem("token", response.tokens.accessToken);
        useAuthStore.getState().setUser(response.user, response.tokens);
      }

      if (response.isNewUser) {
        navigate("/register");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Неверный код");
      setDigits(["", "", "", ""]);
      setCode("");
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerValue((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    window.scrollTo({ top: 0 });

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!phone) return null;

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-start leading-tight">
        Подтвердите <br />
        номер
      </h2>

      <p className="text-gray-500 mt-2">Введите код из SMS-сообщения</p>

      {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}

      <div className="mt-11">
        <p className="text-center text-3xl font-semibold">
          {formatPhoneNumber(phone)}
        </p>

        <div className="mt-4 text-center">
          {timerValue > 0 ? (
            <>
              <span className="text-gray-500">Отправить SMS повторно</span>
              <p className="text-gray-500 mt-1">
                можно через {timerValue} сек.
              </p>
            </>
          ) : (
            <span
              className="cursor-pointer text-black/90 underline"
              onClick={resendCode}
            >
              Отправить SMS повторно
            </span>
          )}
        </div>

        <div className="flex justify-center my-12 px-4">
          {digits.map((digit, index) => (
            <input
              key={index}
              type="number"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              disabled={loading}
              className="w-14 h-14 sm:w-16 sm:h-16 text-center text-lg border border-gray-300 rounded-lg focus:outline-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none mr-1 ml-1"
            />
          ))}
        </div>

        <div className="flex flex-col items-center">
          <button
            className="w-full sm:w-auto sm:px-36 py-3 bg-black/85 text-white rounded-2xl disabled:opacity-50 mb-4"
            disabled={code.length !== 4 || loading}
            onClick={verifyCode}
          >
            {loading ? "Проверка..." : "Подтвердить"}
          </button>

          <button
            className="text-black/70 underline"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Изменить номер телефона
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeVerification;
