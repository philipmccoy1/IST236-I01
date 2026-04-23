import React, { createContext, useMemo, useState } from 'react';
import Colors from '../constants/colors';

export const ThemeContext = createContext({
  darkMode: false,
  setDarkMode: () => {},
  themeColors: Colors.light,
});

export default function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const themeColors = useMemo(() => {
    return darkMode ? Colors.dark : Colors.light;
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
}