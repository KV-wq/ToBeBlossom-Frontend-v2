import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CodeVerification = () => {
  const [timerValue, setTimerValue] = useState(45);
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [code, setCode] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const adjustViewport = () => {
    const viewportMeta = document.querySelector("meta[name=viewport]");
    viewportMeta?.setAttribute(
      "content",
      `width=device-width, initial-scale=1, maximum-scale=1, height=${window.innerHeight}`
    );
  };

  const handleInput = (event, index) => {
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

    adjustViewport();
    window.addEventListener("resize", adjustViewport);
    window.scrollTo({ top: 0 });

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", adjustViewport);
    };
  }, []);

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-start leading-tight">
        Подтвердите <br />
        номер
      </h2>

      <p className="text-gray-500 mt-2">Введите код из SMS-сообщения</p>

      <div className="mt-11">
        <p className="text-center text-3xl font-semibold">+7 (000) 555-55-55</p>

        <div className="mt-4 text-center">
          <span className="underline cursor-pointer">
            Отправить SMS повторно
          </span>
          {timerValue > 0 && (
            <p className="text-black/70 mt-1">можно через {timerValue} сек.</p>
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
              className={
                "w-14 h-14 sm:w-16 sm:h-16 text-center text-lg border border-gray-300 rounded-lg focus:outline-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none mr-1 ml-1"
              }
            />
          ))}
        </div>

        <div className="flex flex-col items-center">
          <button
            className="w-full sm:w-auto sm:px-36 py-3 bg-black/85 text-white rounded-2xl disabled:opacity-50 mb-4"
            disabled={code.length !== 4}
            onClick={() => navigate("/register")}
          >
            Подтвердить
          </button>

          <button
            className="text-black/70 underline"
            onClick={() => navigate(-1)}
          >
            Изменить номер телефона
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeVerification;
