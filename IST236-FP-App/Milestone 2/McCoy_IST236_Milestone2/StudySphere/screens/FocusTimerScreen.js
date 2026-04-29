import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import { ThemeContext } from '../context/ThemeContext';

export default function FocusTimerScreen() {
  const { themeColors } = useContext(ThemeContext);

  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((currentSeconds) => currentSeconds - 1);
      }, 1000);
    }

    if (isRunning && secondsLeft === 0) {
      setIsRunning(false);
      Alert.alert('Session Complete', 'Nice job! Your focus session is finished.');
    }

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function choosePreset(minutes) {
    setIsRunning(false);
    setSecondsLeft(minutes * 60);
  }

  function resetTimer() {
    setIsRunning(false);
    setSecondsLeft(25 * 60);
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.heading, { color: themeColors.text }]}>Focus Timer</Text>
        <Text style={[styles.subheading, { color: themeColors.lightText }]}>
          Use timed sessions to stay productive while you study.
        </Text>

        <View style={[styles.timerCard, { backgroundColor: themeColors.card }]}>
          <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
          <Text style={[styles.timerLabel, { color: themeColors.lightText }]}>
            {isRunning ? 'Session in progress' : 'Ready to begin'}
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.controlButton} onPress={() => setIsRunning(true)}>
            <Text style={styles.controlButtonText}>Start</Text>
          </Pressable>

          <Pressable
            style={[styles.controlButton, styles.pauseButton]}
            onPress={() => setIsRunning(false)}
          >
            <Text style={styles.controlButtonText}>Pause</Text>
          </Pressable>

          <Pressable
            style={[styles.controlButton, styles.resetButton]}
            onPress={resetTimer}
          >
            <Text style={styles.controlButtonText}>Reset</Text>
          </Pressable>
        </View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Session Length</Text>

        <View style={styles.presetRow}>
          <Pressable
            style={[styles.presetButton, { backgroundColor: themeColors.card }]}
            onPress={() => choosePreset(15)}
          >
            <Text style={[styles.presetText, { color: themeColors.text }]}>15 Min</Text>
          </Pressable>

          <Pressable
            style={[styles.presetButton, { backgroundColor: themeColors.card }]}
            onPress={() => choosePreset(25)}
          >
            <Text style={[styles.presetText, { color: themeColors.text }]}>25 Min</Text>
          </Pressable>

          <Pressable
            style={[styles.presetButton, { backgroundColor: themeColors.card }]}
            onPress={() => choosePreset(45)}
          >
            <Text style={[styles.presetText, { color: themeColors.text }]}>45 Min</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontFamily: 'poppins-bold',
    fontSize: 28,
  },
  subheading: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
  },
  timerCard: {
    borderRadius: 24,
    paddingVertical: 36,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontFamily: 'poppins-bold',
    fontSize: 50,
    color: Colors.primary,
  },
  timerLabel: {
    fontFamily: 'poppins-regular',
    fontSize: 15,
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 24,
  },
  controlButton: {
    flex: 1,
    minWidth: 95,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  pauseButton: {
    backgroundColor: Colors.warning,
  },
  resetButton: {
    backgroundColor: '#6B7280',
  },
  controlButtonText: {
    fontFamily: 'poppins-bold',
    color: Colors.white,
    fontSize: 15,
  },
  sectionTitle: {
    fontFamily: 'poppins-bold',
    fontSize: 18,
    marginBottom: 12,
  },
  presetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  presetButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  presetText: {
    fontFamily: 'poppins-bold',
  },
});