import React, { useContext, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import { ThemeContext } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { darkMode, setDarkMode, themeColors } = useContext(ThemeContext);

  const [notifications, setNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('Blue');

  const themeOptions = [
    { name: 'Blue', color: Colors.primary },
    { name: 'Purple', color: Colors.secondary },
    { name: 'Green', color: Colors.accent },
  ];

  const activeTheme = useMemo(() => {
    return themeOptions.find((theme) => theme.name === selectedTheme);
  }, [selectedTheme]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.heading, { color: themeColors.text }]}>Settings</Text>
        <Text style={[styles.subheading, { color: themeColors.lightText }]}>
          Customize how your app looks and behaves.
        </Text>

        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
          <View style={styles.settingRow}>
            <Text style={[styles.settingText, { color: themeColors.text }]}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: themeColors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={[styles.settingText, { color: themeColors.text }]}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: themeColors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={[styles.settingText, { color: themeColors.text }]}>Daily Reminder</Text>
            <Switch
              value={dailyReminder}
              onValueChange={setDailyReminder}
              trackColor={{ false: themeColors.border, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.cardTitle, { color: themeColors.text }]}>Theme</Text>

          <View style={styles.themeRow}>
            {themeOptions.map((theme) => (
              <Pressable
                key={theme.name}
                style={[
                  styles.themeButton,
                  {
                    borderColor:
                      selectedTheme === theme.name ? theme.color : themeColors.border,
                  },
                ]}
                onPress={() => setSelectedTheme(theme.name)}
              >
                <View style={[styles.themeCircle, { backgroundColor: theme.color }]} />
                <Text style={[styles.themeLabel, { color: themeColors.text }]}>
                  {theme.name}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={[styles.previewText, { color: themeColors.lightText }]}>
            Selected Theme: {activeTheme?.name}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.cardTitle, { color: themeColors.text }]}>About App</Text>

          <Text style={[styles.infoText, { color: themeColors.lightText }]}>
            StudySphere helps students manage tasks, use focus sessions, and save helpful study resources.
          </Text>

          <Text style={[styles.infoText, { color: themeColors.lightText }]}>Version 1.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontFamily: 'poppins-bold',
    fontSize: 28,
  },
  subheading: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 16,
  },
  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: 'poppins-bold',
    fontSize: 18,
    marginBottom: 14,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingText: {
    fontFamily: 'poppins-regular',
    fontSize: 15,
  },
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
  },
  themeButton: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  themeCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: 8,
  },
  themeLabel: {
    fontFamily: 'poppins-bold',
    fontSize: 14,
  },
  previewText: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
  },
  infoText: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
});