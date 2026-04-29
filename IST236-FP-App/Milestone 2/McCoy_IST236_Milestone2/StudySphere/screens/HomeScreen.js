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
import Colors from '../constants/colors';
import { ThemeContext } from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const { themeColors } = useContext(ThemeContext);

  const summaryCards = useMemo(
    () => [
      { id: '1', label: 'Tasks Due', value: '3', icon: 'checkbox-outline' },
      { id: '2', label: 'Completed', value: '5', icon: 'checkmark-done-outline' },
      { id: '3', label: 'Focus Minutes', value: '75', icon: 'timer-outline' },
    ],
    []
  );

  const quickLinks = [
    { id: '1', title: 'Go to Tasks', icon: 'list', screen: 'Tasks' },
    { id: '2', title: 'Start Focus Timer', icon: 'play-circle', screen: 'Timer' },
    { id: '3', title: 'Open Resources', icon: 'book', screen: 'Resources' },
    { id: '4', title: 'App Settings', icon: 'settings', screen: 'Settings' },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.hero}>
          <Text style={styles.heroTitle}>Welcome back</Text>
          <Text style={styles.heroSubtitle}>
            Stay on top of school with your tasks, timer, and study resources in one place.
          </Text>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Today&apos;s Overview</Text>

          <View style={styles.cardRow}>
            {summaryCards.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.summaryCard,
                  {
                    width: isLargeScreen ? '31%' : '100%',
                    backgroundColor: themeColors.card,
                  },
                ]}
              >
                <Ionicons name={item.icon} size={28} color={Colors.primary} />
                <Text style={[styles.summaryValue, { color: themeColors.text }]}>{item.value}</Text>
                <Text style={[styles.summaryLabel, { color: themeColors.lightText }]}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Quick Actions</Text>

          {quickLinks.map((item) => (
            <Pressable
              key={item.id}
              style={styles.actionButton}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.actionLeft}>
                <Ionicons name={item.icon} size={22} color={Colors.white} />
                <Text style={styles.actionText}>{item.title}</Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color={Colors.white} />
            </Pressable>
          ))}
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
    color: Colors.white,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'poppins-regular',
    fontSize: 15,
    color: Colors.white,
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
    backgroundColor: Colors.primary,
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
    color: Colors.white,
    marginLeft: 10,
  },
});