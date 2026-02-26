import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import RecipeItem from "../components/RecipeItem";

export default function RecipesScreen({ navigation, recipes, onDelete }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipes</Text>

      <View style={styles.topButtonsRow}>
        <Pressable style={styles.primaryButton} onPress={() => navigation.navigate("AddRecipe")}>
          <Text style={styles.btnText}>Add Recipe</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.btnTextDark}>Home</Text>
        </Pressable>
      </View>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No recipes yet. Tap “Add Recipe”.</Text>
        }
        renderItem={({ item }) => (
          <RecipeItem
            title={item.title}
            onView={() => navigation.navigate("RecipeModal", { recipeId: item.id })}
            onDelete={() => onDelete(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
  topButtonsRow: { flexDirection: "row", gap: 10, marginBottom: 12 },
  primaryButton: { flex: 1, backgroundColor: "#111", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  secondaryButton: { flex: 1, backgroundColor: "#e9e9e9", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  btnText: { color: "white", fontWeight: "700" },
  btnTextDark: { color: "#111", fontWeight: "700" },
  listContent: { paddingBottom: 20 },
  emptyText: { marginTop: 30, textAlign: "center", color: "#666" },
});