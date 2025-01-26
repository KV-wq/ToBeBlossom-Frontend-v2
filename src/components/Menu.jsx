import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { title: "Главная", path: "/home" },
    { title: "Аккаунт", path: "/profile" },
    { title: "Промокоды", path: "/promocodes" },
    { title: "Продажи", path: "/statistics" },
  ];

  return (
    <div className="fixed top-12 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-8 h-8 focus:outline-none"
      >
        <span
          className={`absolute block w-6 h-0.5 bg-black transform transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
          }`}
        ></span>
        <span
          className={`absolute block w-6 h-0.5 bg-black transform transition-all duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`absolute block w-6 h-0.5 bg-black transform transition-all duration-300 ${
            isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
          }`}
        ></span>
      </button>

      <div
        className={`absolute top-12 right-0 w-48 bg-white rounded-xl shadow-lg py-2 transform transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              navigate(item.path);
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
