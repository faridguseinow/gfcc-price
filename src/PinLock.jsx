import { useState } from "react";
import "./App.scss";

import Logo from './assets/icons/apple-touch-icon.png'

const CORRECT_PIN = "6666";

export default function PinLock({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleDigitClick = (digit) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);

      // Авторазблокировка при 4 цифрах
      if (newPin.length === 4) {
        if (newPin === CORRECT_PIN) {
          setTimeout(() => onUnlock(), 150); // небольшой лаг для UX
        } else {
          setError(true);
          setTimeout(() => {
            setPin("");
            setError(false);
          }, 600);
        }
      }
    }
  };

  const handleClear = () => setPin("");

  return (
    <div className="pin-lock">
      <img src={Logo} alt="logo"/>
      <p>Приложение для руководства Golden Flowers</p>
      <h1>Введите PIN</h1>
      <div className={`pin-dots ${error ? "error" : ""}`}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={i < pin.length ? "filled" : ""}></span>
        ))}
      </div>
      <div className="pin-pad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "clear", 0].map((item, idx) => (
          <button
            key={idx}
            className="digit-btn"
            onClick={() =>
              item === "clear" ? handleClear() : handleDigitClick(item)
            }
          >
            {item === "clear" ? "✕" : item}
          </button>
        ))}
      </div>
    </div>
  );
}
