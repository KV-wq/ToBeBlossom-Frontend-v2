import { useLocation, useNavigate } from "react-router-dom";
import { Home, User, Tag, RussianRuble } from "lucide-react";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Главная",
      path: "/home",
      icon: Home,
    },
    {
      title: "Аккаунт",
      path: "/profile",
      icon: User,
    },
    {
      title: "Промокоды",
      path: "/promocodes",
      icon: Tag,
    },
    {
      title: "Продажи",
      path: "/statistics",
      icon: RussianRuble,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
      <div className="max-w-[600px] mx-auto flex justify-between px-6 py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1"
            >
              <Icon
                className={`w-6 h-6 transition-colors ${
                  isActive ? "text-gray-900" : "text-gray-400"
                }`}
              />
              <span
                className={`text-xs transition-colors ${
                  isActive ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
