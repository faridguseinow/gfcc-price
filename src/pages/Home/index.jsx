import React, { useState, useEffect } from "react";
import "./style.scss";
import EmployeeCard from "../../components/EmployeeCard";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [employees, setEmployees] = useState(() => {
    // Загружаем из localStorage при старте
    const saved = localStorage.getItem("employees");
    return saved ? JSON.parse(saved) : [];
  });

  // Сохраняем в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  // Список из 7 дней
  const generateWeek = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return date;
    });
  };

  const days = generateWeek();

  const formatDay = (date) =>
    date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      weekday: "short",
    });

  const addEmployee = () => {
    setEmployees([
      ...employees,
      {
        fio: "",
        photo: "",
        department: "",
        shift: "",
        organization: "Golden Flowers",
        salary: "",
        vacationStart: "",
        vacationEnd: "",
        status: "Работает",
        dismissalReason: "",
      },
    ]);
  };

  const updateEmployee = (index, updatedData) => {
    const newEmployees = [...employees];
    newEmployees[index] = updatedData;
    setEmployees(newEmployees);
  };

  const deleteEmployee = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1>Главная</h1>

        <div className="date-carousel">
          {days.map((day) => {
            const isSelected =
              day.toDateString() === selectedDate.toDateString();
            return (
              <div
                key={day.toISOString()}
                className={`date-carousel__item ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => setSelectedDate(day)}
              >
                {formatDay(day)}
              </div>
            );
          })}
        </div>
      </div>

      <button className="add-btn" onClick={addEmployee}>
        + Добавить сотрудника
      </button>

      <div className="employee-list">
        {employees.length > 0 ? (
          employees.map((emp, i) => (
            <EmployeeCard
              key={i}
              data={emp}
              onChange={(updated) => updateEmployee(i, updated)}
              onDelete={() => deleteEmployee(i)}
            />
          ))
        ) : (
          <p>Нет сотрудников. Добавьте первого!</p>
        )}
      </div>
    </div>
  );
}
