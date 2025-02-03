import React from "react";
import { Calendar } from "lucide-react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";

registerLocale("ru", ru);

const DateInput = ({ value, onChange, disabled, min }) => {
  const selectedDate = value ? new Date(value) : null;
  const minDate = min ? new Date(min) : null;

  const CustomInput = React.forwardRef(({ onClick }, ref) => (
    <div className=" w-full" onClick={onClick} ref={ref}>
      <div
        className={`bg-gray-50 border p-2 border-gray-500 text-gray-900 text-sm rounded-lg block w-full h-9 mb-2 text-center relative ${
          !selectedDate ? "text-gray-400" : ""
        }`}
      >
        <span>
          {selectedDate
            ? selectedDate.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "Выберите дату окончания"}
        </span>
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      </div>
    </div>
  ));

  return (
    <div className="relative w-full">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          onChange({ target: { value: date.toISOString().split("T")[0] } });
        }}
        disabled={disabled}
        minDate={minDate}
        dateFormat="dd.MM.yyyy"
        locale="ru"
        customInput={<CustomInput />}
        popperModifiers={[
          {
            name: "preventOverflow",
            options: {
              mainAxis: true,
              altAxis: true,
            },
          },
        ]}
        wrapperClassName="w-full"
        className="w-full"
      />
    </div>
  );
};

export default DateInput;
