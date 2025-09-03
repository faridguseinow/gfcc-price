import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "./style.scss";

export default function Search() {
  const [query, setQuery] = useState("");

  // Пример данных (потом можно подключить API / сервер)
  const data = [
    "Иван Иванов",
    "Петр Петров",
    "Golden Flowers - Документ 1",
    "Oasis - График отпусков",
    "Мария Смирнова",
  ];

  const filtered = data.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page">
      <header className="search-page__header">
        <h2>Поиск</h2>
        <div className="search-bar">
        <SearchIcon className="icon" />
        <input
          type="text"
          placeholder="Введите имя сотрудника или документ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className="clear-btn" onClick={() => setQuery("")}>
            <ClearIcon />
          </button>
        )}
      </div>
      </header>

      

      <div className="search-results">
        {filtered.length > 0 ? (
          filtered.map((item, idx) => (
            <div key={idx} className="search-item">
              {item}
            </div>
          ))
        ) : (
          <p className="no-results">Ничего не найдено</p>
        )}
      </div>
    </div>
  );
}
