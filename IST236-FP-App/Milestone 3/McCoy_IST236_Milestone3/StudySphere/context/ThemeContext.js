import React, { createContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getThemeColors } from '../constants/colors';

const SETTINGS_KEY = 'studysphere_theme_settings';

export const ThemeContext = createContext({
  darkMode: false,
  setDarkMode: () => {},
  notifications: true,
  setNotifications: () => {},
  dailyReminder: false,
  setDailyReminder: () => {},
  selectedTheme: 'Blue',
  setSelectedTheme: () => {},
  themeColors: getThemeColors(false, 'Blue'),
  isThemeReady: false,
});

export default function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('Blue');
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const savedSettings = await AsyncStorage.getItem(SETTINGS_KEY);

        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);

          setDarkMode(!!parsedSettings.darkMode);
          setNotifications(
            typeof parsedSettings.notifications === 'boolean'
              ? parsedSettings.notifications
              : true
          );
          setDailyReminder(
            typeof parsedSettings.dailyReminder === 'boolean'
              ? parsedSettings.dailyReminder
              : false
          );
          setSelectedTheme(parsedSettings.selectedTheme || 'Blue');
        }
      } catch (error) {
        console.log('Error loading theme settings:', error);
      } finally {
        setIsThemeReady(true);
      }
    }

    loadSettings();
  }, []);

  useEffect(() => {
    async function saveSettings() {
      if (!isThemeReady) return;

      try {
        const settingsToSave = {
          darkMode,
          notifications,
          dailyReminder,
          selectedTheme,
        };

        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsToSave));
      } catch (error) {
        console.log('Error saving theme settings:', error);
      }
    }

    saveSettings();
  }, [darkMode, notifications, dailyReminder, selectedTheme, isThemeReady]);

  const themeColors = useMemo(() => {
    return getThemeColors(darkMode, selectedTheme);
  }, [darkMode, selectedTheme]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        notifications,
        setNotifications,
        dailyReminder,
        setDailyReminder,
        selectedTheme,
        setSelectedTheme,
        themeColors,
        isThemeReady,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}