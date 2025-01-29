import React, { useState } from "react";

function Calendar() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Handlers for navigation
  function prevMonth() {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  }

  function nextMonth() {
    setCurrentMonth((nextMonth) => (nextMonth === 11 ? 0 : nextMonth + 1));
    setCurrentYear((nextYear) =>
      currentMonth === 11 ? nextYear + 1 : nextYear
    );
  }

  // Helper to check if a day is today
  const isToday = (day) => {
    return (
      day === currentDate.getDate() &&
      currentMonth === currentDate.getMonth() &&
      currentYear === currentDate.getFullYear()
    );
  };

  return (
    <div className="p-6 grid place-items-center w-[100%] min-w-[27rem] h-[calc(55%-2rem)] bg-[#111214] rounded-2xl">
      {/* Header */}
      <div className="pl-4  gap-x-4 w-[100%] flex items-center justify-between">
        <h2 className="text-[2rem] font-[300] text-[#bbb]">
          {monthsOfYear[currentMonth]}
        </h2>
        <h2 className="text-[2rem] font-[300] text-[#bbb]">{currentYear}</h2>
        <div className="flex gap-x-4 ml-auto">
          <i
            onClick={prevMonth}
            className="rounded-full text-[#b88efc] cursor-pointer bx bx-chevron-left w-[3.5rem] h-[3.5rem] flex justify-center items-center bg-[#2c3542]"
          ></i>
          <i
            onClick={nextMonth}
            className="rounded-full text-[#b88efc] cursor-pointer bx bx-chevron-right w-[3.5rem] h-[3.5rem] flex justify-center items-center bg-[#2c3542]"
          ></i>
        </div>
      </div>

      {/* Weekdays */}
      <div className="flex w-[100%] mt-4 mb-0">
        {daysOfWeek.map((day, index) => (
          <span
            key={index}
            className="w-[calc(100%/7)] text-[1.3rem] font-[300] uppercase text-[#78879e] flex justify-center"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Days */}
      <div className="flex flex-wrap w-[100%]">
        {/* Empty days for alignment */}
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <span
            key={`empty-${index}`}
            className="w-[calc(100%/7)] aspect-square"
          ></span>
        ))}

        {/* Actual days */}
        {[...Array(daysInMonth)].map((_, day) => (
          <span
            key={day + 1}
            className={`flex justify-center items-center cursor-pointer w-[calc(100%/7)] aspect-square text-[1.3rem] text-[#ddd] ${
              isToday(day + 1)
                ? "text-[2rem] text-[#fff] bg-gradient-to-r from-[#b88efc] to-[#6877f4] rounded-full"
                : ""
            }`}
          >
            {day + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
