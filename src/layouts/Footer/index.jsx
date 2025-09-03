// components/FooterNav.jsx
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

export default function FooterNav() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/home");
        break;
      case 1:
        navigate("/search");
        break;
      case 2:
        navigate("/vacations");
        break;
      case 3:
        navigate("/folders");
        break;
      default:
        break;
    }
  };

  return (
    <Paper elevation={8} className="footer-nav">
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Главная" icon={<HomeIcon />} />
        <BottomNavigationAction label="Поиск" icon={<SearchIcon />} />
        <BottomNavigationAction label="Отпуск" icon={<CalendarTodayIcon />} />
        <BottomNavigationAction label="Документы" icon={<DescriptionIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
