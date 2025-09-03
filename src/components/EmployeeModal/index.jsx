import React from "react";
import "./style.scss";

export default function EmployeeModal({ employee, onClose, onChange, onDelete }) {
  if (!employee) return null; // если данных нет, модалка не рендерится

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange && onChange({ ...employee, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      onChange && onChange({ ...employee, photo: photoURL });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Редактирование сотрудника</h2>

        {/* Фото сотрудника */}
        <div className="modal__field">
          <label>Фото:</label>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          {employee.photo && (
            <img
              src={employee.photo}
              alt="Фото сотрудника"
              className="modal__photo"
            />
          )}
        </div>

        <div className="modal__field">
          <label>ФИО:</label>
          <input
            type="text"
            name="fio"
            value={employee.fio || ""}
            onChange={handleChange}
          />
        </div>

        <div className="modal__field">
          <label>Отдел:</label>
          <select
            name="department"
            value={employee.department || ""}
            onChange={handleChange}
          >
            <option>Офис</option>
            <option>Транспорт</option>
          </select>
        </div>

        <div className="modal__field">
          <label>Организация:</label>
          <select
            name="organization"
            value={employee.organization || ""}
            onChange={handleChange}
          >
            <option>Golden Flowers</option>
            <option>Oasis</option>
          </select>
        </div>

        <div className="modal__field">
          <label>Зарплата ($):</label>
          <input
            type="number"
            name="salary"
            value={employee.salary || ""}
            onChange={handleChange}
          />
        </div>

        <div className="modal__field">
          <label>Статус:</label>
          <select
            name="status"
            value={employee.status || ""}
            onChange={handleChange}
          >
            <option>Работает</option>
            <option>В отпуске</option>
            <option>Уволен</option>
          </select>
        </div>

        {employee.status === "Уволен" && (
          <div className="modal__field">
            <label>Причина увольнения:</label>
            <input
              type="text"
              name="dismissalReason"
              value={employee.dismissalReason || ""}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="modal__actions">
          <button className="save-btn" onClick={onClose}>
            Сохранить
          </button>
          <button className="delete-btn" onClick={onDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
