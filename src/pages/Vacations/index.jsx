import React, { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import "./style.scss";

// Пример отпусков сотрудников
const vacations = [
  { name: "Иван Иванов", start: "2025-09-05", end: "2025-09-10" },
  { name: "Мария Смирнова", start: "2025-09-15", end: "2025-09-20" },
  { name: "Петр Петров", start: "2025-09-18", end: "2025-09-25" },
];

// Проверка: входит ли дата в отпуск
const isVacationDay = (date) => {
  return vacations.some((v) =>
    dayjs(date).isBetween(dayjs(v.start), dayjs(v.end), "day", "[]")
  );
};

export default function Vacations() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <div className="vacations-page">
      <header className="vacations-header">
        <h2>График отпусков</h2>
      </header>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          slots={{
            day: (props) => {
              const { day, outsideCurrentMonth, ...other } = props;
              const isVacation = isVacationDay(day);

              return (
                <PickersDay
                  {...other}
                  day={day}
                  outsideCurrentMonth={outsideCurrentMonth}
                  className={
                    isVacation
                      ? "vacation-day"
                      : outsideCurrentMonth
                      ? "outside-month"
                      : ""
                  }
                />
              );
            },
          }}
        />
      </LocalizationProvider>

      <div className="vacations-list">
        <h3>Отпуска сотрудников:</h3>
        {vacations.map((v, i) => (
          <div key={i} className="vacation-item">
            <span className="name">{v.name}</span>
            <span className="dates">
              {dayjs(v.start).format("DD.MM.YYYY")} –{" "}
              {dayjs(v.end).format("DD.MM.YYYY")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
