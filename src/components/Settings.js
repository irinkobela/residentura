import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const Settings = ({ onClose }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 16); // Default font size

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-mode', !isDarkMode);
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => Math.min(prevSize + 1, 20)); // Max font size 20px
    document.documentElement.style.fontSize = `${fontSize + 1}px`;
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => Math.max(prevSize - 1, 12)); // Min font size 12px
    document.documentElement.style.fontSize = `${fontSize - 1}px`;
  };

  // Apply initial settings on component mount
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [isDarkMode, fontSize]);

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <button className="settings-close-button" onClick={onClose}>&times;</button>
        <h2>Settings</h2>
        <div className="setting-item">
          <span>Dark Mode:</span>
          <label className="switch">
            <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="setting-item">
          <span>Font Size:</span>
          <button onClick={decreaseFontSize}>A-</button>
          <button onClick={increaseFontSize}>A+</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
