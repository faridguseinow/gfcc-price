import React, { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./style.scss";

export default function Folders() {
  const [path, setPath] = useState(["C:", "Users", "Documents"]);

  // пример структуры (потом замените на данные с сервера)
  const mockData = {
    "C:/Users/Documents": [
      { name: "Reports", type: "folder" },
      { name: "Contracts", type: "folder" },
      { name: "readme.txt", type: "file" },
      { name: "vacation_plan.xlsx", type: "file" },
    ],
    "C:/Users/Documents/Reports": [
      { name: "report_2024.pdf", type: "file" },
      { name: "report_2025.pdf", type: "file" },
    ],
  };

  const currentPath = path.join("/");
  const items = mockData[currentPath] || [];

  const openFolder = (folderName) => {
    setPath([...path, folderName]);
  };

  const goBack = () => {
    if (path.length > 1) {
      setPath(path.slice(0, -1));
    }
  };

  return (
    <div className="folders-page">
      <header className="folders-header">
        <button className="back-btn" onClick={goBack}>
          <ArrowBackIcon />
        </button>
        <h2>{path.join(" / ")}</h2>
      </header>

      <div className="folders-grid">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`folder-item ${item.type}`}
            onClick={() => item.type === "folder" && openFolder(item.name)}
          >
            {item.type === "folder" ? (
              <FolderIcon className="icon folder" />
            ) : (
              <InsertDriveFileIcon className="icon file" />
            )}
            <span>{item.name}</span>
          </div>
        ))}

        {items.length === 0 && (
          <p className="empty-msg">Папка пуста или не найдена</p>
        )}
      </div>
    </div>
  );
}
