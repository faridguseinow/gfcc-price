import React from "react";
import "./style.scss";

export default function EmployeeCard({ data, onChange, onDelete }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({ ...data, photo: reader.result }); // сохраняем фото в base64
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="employee-card">

      <div className="employee-card__field">
        <label>Фото:</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        {data.photo && (
          <img src={data.photo} alt="Фото сотрудника" width={100} />
        )}
      </div>

      <div className="employee-card__field">
        <label>ФИО:</label>
        <input
          type="text"
          name="fio"
          value={data.fio}
          onChange={handleChange}
        />
      </div>

      <div className="employee-card__field">
        <label>Отдел:</label>
        <select
          name="department"
          value={data.department}
          onChange={handleChange}
        >
          <option value="">—</option>
          <option>Офис</option>
          <option>Касса</option>
          <option>Ворота(1,2,3,4)</option>
          <option>Горшечные</option>
          <option>Упаковка</option>
          <option>Склад Молоково</option>
          <option>Ст. смена</option>
          <option>Баку Офис</option>
          <option>Ворота(5-6-7) + Склад</option>
          <option>Заказы 2 этаж</option>
          <option>Сборка</option>
          <option>Цветы Китай</option>
          <option>Витрина</option>
          <option>Роза Эквадор</option>
          <option>Роза Кения</option>
          <option>Роза на воде</option>
          <option>Экзотика</option>
          <option>Стажеры</option>
          <option>Уборка</option>
          <option>Закупщик</option>
          <option>Краснодар</option>
          <option>Разное</option>
          <option>Водитель</option>
          <option>Транспорт</option>
          <option>Магазин</option>
          <option>Кухня</option>
          <option>Бухгалтерия</option>
          <option>Студент</option>
        </select>
      </div>

      <div className="employee-card__field">
        <label>Смена:</label>
        <select name="shift" value={data.shift} onChange={handleChange}>
          <option value="">—</option>
          <option>Дневная (12ч)</option>
          <option>Ночная (12ч)</option>
        </select>
      </div>

      <div className="employee-card__field">
        <label>Организация:</label>
        <select
          name="organization"
          value={data.organization}
          onChange={handleChange}
        >
          <option>Golden Flowers</option>
          <option>Oasis</option>
        </select>
      </div>

      <div className="employee-card__field">
        <label>Зарплата ($):</label>
        <input
          type="number"
          name="salary"
          value={data.salary}
          onChange={handleChange}
        />
      </div>

      <div className="employee-card__field">
        <label>Дата начала отпуска:</label>
        <input
          type="date"
          name="vacationStart"
          value={data.vacationStart}
          onChange={handleChange}
        />
      </div>

      <div className="employee-card__field">
        <label>Дата окончания отпуска:</label>
        <input
          type="date"
          name="vacationEnd"
          value={data.vacationEnd}
          onChange={handleChange}
        />
      </div>

      <div className="employee-card__field">
        <label>Статус:</label>
        <select
          name="status"
          value={data.status}
          onChange={handleChange}
        >
          <option>Работает</option>
          <option>Уволен</option>
        </select>
      </div>

      {data.status === "Уволен" && (
        <div className="employee-card__field">
          <label>Причина увольнения:</label>
          <input
            type="text"
            name="dismissalReason"
            value={data.dismissalReason}
            onChange={handleChange}
          />
        </div>
      )}

      <button className="delete-btn" onClick={onDelete}>
        Удалить сотрудника
      </button>
    </div>
  );
}
