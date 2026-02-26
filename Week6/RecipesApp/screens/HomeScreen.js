import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Recipes App</Text>

      <Image
        style={styles.image}
        resizeMode="cover"
        source={{
          uri: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=60",
        }}
      />

      <Pressable style={styles.button} onPress={() => navigation.navigate("Recipes")}>
        <Text style={styles.buttonText}>Go to Recipes</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 16 },
  image: { width: "100%", height: 220, borderRadius: 12, marginBottom: 18 },
  button: { paddingVertical: 12, paddingHorizontal: 18, backgroundColor: "#111", borderRadius: 10 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
});