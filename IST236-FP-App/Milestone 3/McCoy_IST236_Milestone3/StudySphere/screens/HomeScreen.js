import React, { useContext, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';
import { AppDataContext } from '../context/AppDataContext';

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const { themeColors } = useContext(ThemeContext);
  const { stats, tasks } = useContext(AppDataContext);

  const summaryCards = useMemo(
    () => [
      { id: '1', label: 'Tasks Left', value: String(stats.incompleteTasks), icon: 'checkbox-outline' },
      { id: '2', label: 'Completed', value: String(stats.completedTasks), icon: 'checkmark-done-outline' },
      { id: '3', label: 'Focus Minutes', value: String(stats.totalFocusMinutes), icon: 'timer-outline' },
      { id: '4', label: 'Resources', value: String(stats.totalResources), icon: 'book-outline' },
    ],
    [stats]
  );

  const recentTasks = tasks.slice(0, 3);

  const quickLinks = [
    { id: '1', title: 'Go to Tasks', icon: 'list', screen: 'Tasks' },
    { id: '2', title: 'Start Focus Timer', icon: 'play-circle', screen: 'Timer' },
    { id: '3', title: 'Open Resources', icon: 'book', screen: 'Resources' },
    { id: '4', title: 'App Settings', icon: 'settings', screen: 'Settings' },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={[themeColors.primary, themeColors.secondary]}
          style={styles.hero}
        >
          <Text style={styles.heroTitle}>Welcome back</Text>
          <Text style={styles.heroSubtitle}>
            Stay on top of school with your tasks, timer, and study resources in one place.
          </Text>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Today&apos;s Overview
          </Text>

          <View style={styles.cardRow}>
            {summaryCards.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.summaryCard,
                  {
                    width: isLargeScreen ? '48%' : '100%',
                    backgroundColor: themeColors.card,
                  },
                ]}
              >
                <Ionicons name={item.icon} size={28} color={themeColors.primary} />
                <Text style={[styles.summaryValue, { color: themeColors.text }]}>
                  {item.value}
                </Text>
                <Text style={[styles.summaryLabel, { color: themeColors.lightText }]}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Quick Actions
          </Text>

          {quickLinks.map((item) => (
            <Pressable
              key={item.id}
              style={[styles.actionButton, { backgroundColor: themeColors.primary }]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.actionLeft}>
                <Ionicons name={item.icon} size={22} color={themeColors.white} />
                <Text style={styles.actionText}>{item.title}</Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color={themeColors.white} />
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Recent Tasks
          </Text>

          {recentTasks.length === 0 ? (
            <View style={[styles.recentCard, { backgroundColor: themeColors.card }]}>
              <Text style={[styles.emptyText, { color: themeColors.lightText }]}>
                No tasks yet. Go to the Tasks screen to add one.
              </Text>
            </View>
          ) : (
            recentTasks.map((item) => (
              <View
                key={item.id}
                style={[styles.recentCard, { backgroundColor: themeColors.card }]}
              >
                <View style={styles.recentLeft}>
                  <Ionicons
                    name={item.completed ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={item.completed ? themeColors.success : themeColors.primary}
                  />
                  <View style={styles.recentTextWrap}>
                    <Text
                      style={[
                        styles.recentTitle,
                        { color: themeColors.text },
                        item.completed && styles.completedText,
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text style={[styles.recentCourse, { color: themeColors.lightText }]}>
                      {item.course}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  hero: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  heroTitle: {
    fontFamily: 'poppins-bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'poppins-regular',
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontFamily: 'poppins-bold',
    fontSize: 20,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  summaryCard: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
  },
  summaryValue: {
    fontFamily: 'poppins-bold',
    fontSize: 24,
    marginTop: 12,
  },
  summaryLabel: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
    marginTop: 4,
  },
  actionButton: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'poppins-bold',
    fontSize: 15,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  recentCard: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  recentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentTextWrap: {
    marginLeft: 12,
    flex: 1,
  },
  recentTitle: {
    fontFamily: 'poppins-bold',
    fontSize: 15,
  },
  recentCourse: {
    fontFamily: 'poppins-regular',
    fontSize: 13,
    marginTop: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  emptyText: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
    textAlign: 'center',
  },
});