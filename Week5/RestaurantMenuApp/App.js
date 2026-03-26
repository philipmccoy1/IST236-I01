// Core React import + hook for memoizing callback functions
import React, { useCallback } from "react";

// React Native UI components used throughout the app
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Linking,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";

// React Navigation for screen-to-screen navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Custom reusable components
import Title from "./components/Title";
import MenuItem from "./components/MenuItem";

// App color theme constants
import { COLORS } from "./constants/colors";

// Create the stack navigator (controls page navigation)
const Stack = createNativeStackNavigator();

// Restaurant info displayed on the home screen
const RESTAURANT = {
  name: "Chili's",
  phone: "+1 843-448-6319",                 // Displayed phone number
  phoneDial: "+8434486319",                 // Phone number used for dial link
  addressLabel: "4401 N Kings Hwy, Myrtle Beach, SC",
  mapsQuery: "4401 N Kings Hwy, Myrtle Beach, SC", // Used to open maps
  websiteLabel: "chilis.com",
  websiteUrl: "https://chilis.com",
  heroImage: require("./assets/restaurant.jpg"),  // Main image on home screen
};

// Menu items shown on the menu screen
const MENU = [
  {
    id: "1",
    name: "Baby Back Ribs",
    price: "$32.09",
    image: require("./assets/menu1.jpg"),
  },
  {
    id: "2",
    name: "Big Mouth Burgers",
    price: "$19.99",
    image: require("./assets/menu2.jpg"),
  },
  {
    id: "3",
    name: "Texas Cheese Fries",
    price: "$15.69",
    image: require("./assets/menu3.jpg"),
  },
  {
    id: "4",
    name: "Santa Fe Crispers Salad",
    price: "$20.89",
    image: require("./assets/menu4.jpg"),
  },
  {
    id: "5",
    name: "The Classic Fajitas",
    price: "$23.79",
    image: require("./assets/menu5.jpg"),
  },
];

// Helper function to safely open links (phone, maps, website)
async function openUrl(url) {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen) {
      Alert.alert("Can't open link", url);
      return;
    }
    await Linking.openURL(url);
  } catch (e) {
    Alert.alert("Error", "Something went wrong opening that link.");
  }
}

// Home screen component (first page users see)
function HomeScreen({ navigation }) {
  // Handler to dial the restaurant phone number
  const onCall = useCallback(() => openUrl(`tel:${RESTAURANT.phoneDial}`), []);

  // Handler to open the restaurant location in Google Maps
  const onMaps = useCallback(() => {
    const encoded = encodeURIComponent(RESTAURANT.mapsQuery);
    openUrl(`https://www.google.com/maps/search/?api=1&query=${encoded}`);
  }, []);

  // Handler to open the restaurant website
  const onWebsite = useCallback(() => openUrl(RESTAURANT.websiteUrl), []);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Status bar styling */}
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        {/* Main restaurant image */}
        <Image source={RESTAURANT.heroImage} style={styles.heroImage} />

        {/* Restaurant name and tagline */}
        <View style={styles.headerBlock}>
          <Title style={styles.restaurantName}>{RESTAURANT.name}</Title>
          <Text style={styles.tagline}>
            Seasonal plates • Warm ambience • Crafted with care
          </Text>
        </View>

        {/* Clickable contact info card */}
        <View style={styles.detailsCard}>
          <Pressable style={styles.detailRow} onPress={onCall}>
            <Text style={styles.detailLabel}>Phone</Text>
            <Text style={styles.detailValue}>{RESTAURANT.phone}</Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.detailRow} onPress={onMaps}>
            <Text style={styles.detailLabel}>Address</Text>
            <Text style={styles.detailValue}>{RESTAURANT.addressLabel}</Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.detailRow} onPress={onWebsite}>
            <Text style={styles.detailLabel}>Website</Text>
            <Text style={[styles.detailValue, styles.link]}>
              {RESTAURANT.websiteLabel}
            </Text>
          </Pressable>
        </View>

        {/* Button to navigate to the Menu screen */}
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
          ]}
          onPress={() => navigation.navigate("Menu")}
        >
          <Text style={styles.primaryButtonText}>View Menu</Text>
        </Pressable>

        {/* Small instruction text */}
        <Text style={styles.footerNote}>
          Tap any detail to open the phone, map, or website.
        </Text>
      </View>
    </SafeAreaView>
  );
}

// Menu screen component (second page)
function MenuScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Title style={{ marginBottom: 8 }}>Menu</Title>

        <Text style={styles.subtitle}>
          A few favorites—crafted fresh and served warmly.
        </Text>

        {/* FlatList renders menu items efficiently */}
        <FlatList
          data={MENU}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 90, paddingTop: 14 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <MenuItem name={item.name} price={item.price} image={item.image} />
          )}
        />

        {/* Bottom navigation button */}
        <View style={styles.bottomBar}>
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>Back to Home</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Main App component – sets up navigation between screens
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.text,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "" }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: "" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles for all components
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  heroImage: {
    width: "100%",
    height: 220,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  headerBlock: {
    marginBottom: 12,
  },
  restaurantName: {
    fontSize: 34,
  },
  tagline: {
    marginTop: 6,
    color: COLORS.mutedText,
    fontSize: 14,
  },
  detailsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 6,
    marginTop: 6,
  },
  detailRow: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  detailLabel: {
    color: COLORS.mutedText,
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 20,
  },
  link: {
    color: COLORS.accent,
    textDecorationLine: "underline",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 14,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 14,
  },
  primaryButtonText: {
    color: "#101216",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  footerNote: {
    marginTop: 10,
    color: COLORS.mutedText,
    fontSize: 12,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.mutedText,
    fontSize: 14,
    marginBottom: 6,
  },
  bottomBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 14,
  },
  secondaryButton: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  secondaryButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
  },
});