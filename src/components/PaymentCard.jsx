import React, { useState } from "react";

const Button = ({ text, isWhite, className, onClick }) => (
  <button
    onClick={onClick}
    className={`
      ${isWhite ? "bg-white text-black" : "bg-black/90 text-white"} 
      px-2 py-1 rounded text-xs flex-1 
      ${className}
    `}
  >
    {text}
  </button>
);

const PaymentCard = ({ noOptions = false }) => {
  const [deleteIsVisible, setDeleteIsVisible] = useState(false);

  return (
    <div className="bg-white border-2 border-black/10 p-3 rounded-lg text-black text-center text-xs relative">
      <div
        className={`flex justify-between ${noOptions ? "!justify-center" : ""}`}
      >
        {!noOptions && (
          <img
            src="/assets/Icons/bin.svg"
            className="size-5"
            onClick={() => setDeleteIsVisible(true)}
            alt="Delete"
          />
        )}
        <img src="/assets/Icons/bank.svg" className="size-10" alt="Bank" />
        {!noOptions && (
          <img src="/assets/Icons/pencil.svg" className="size-5" alt="Edit" />
        )}
      </div>

      <p className="mt-2 font-semibold">Физ. лицо, самозанятый</p>
      <p className="mt-2 text-nowrap">123 456 ..... 7890</p>

      {deleteIsVisible && (
        <div
          className="absolute bg-stone-900 text-white inset-0 rounded-lg px-2"
          data-aos="flip-right"
          data-aos-duration="400"
        >
          <p className="font-semibold mt-5">Вы точно хотите удалить?</p>
          <div className="flex gap-1 mt-2">
            <Button isWhite className="h-7" text="Да" />
            <Button
              isWhite
              className="h-7"
              text="Нет"
              onClick={() => setDeleteIsVisible(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;
