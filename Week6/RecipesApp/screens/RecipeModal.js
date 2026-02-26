import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

export default function RecipeModal({ route, navigation, getRecipeById }) {
  const { recipeId } = route.params || {};
  const recipe = recipeId ? getRecipeById(recipeId) : null;

  return (
    <View style={styles.container}>
      {!recipe ? (
        <>
          <Text style={styles.title}>Recipe not found</Text>
          <Pressable style={styles.button} onPress={() => navigation.navigate("Recipes")}>
            <Text style={styles.buttonText}>Back to Recipes</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.title}>{recipe.title}</Text>

          <ScrollView style={styles.textBox}>
            <Text style={styles.body}>{recipe.text}</Text>
          </ScrollView>

          <Pressable style={styles.button} onPress={() => navigation.navigate("Recipes")}>
            <Text style={styles.buttonText}>Back to Recipes</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12, textAlign: "center" },
  textBox: { borderRadius: 12, backgroundColor: "#f4f4f4", padding: 12, maxHeight: 300, marginBottom: 14 },
  body: { fontSize: 16, lineHeight: 22 },
  button: { alignSelf: "center", backgroundColor: "#111", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10 },
  buttonText: { color: "white", fontWeight: "800" },
});