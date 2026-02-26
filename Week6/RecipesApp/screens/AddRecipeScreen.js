import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";

export default function AddRecipeScreen({ navigation, onSave }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSave = () => {
    if (!title.trim() || !text.trim()) {
      Alert.alert("Missing info", "Please enter both a title and recipe text.");
      return;
    }
    onSave(title, text);
    navigation.navigate("Recipes");
  };

  const handleCancel = () => {
    navigation.navigate("Recipes");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipe Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="e.g., Spaghetti Carbonara"
        style={styles.input}
      />

      <Text style={styles.label}>Recipe Text</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Ingredients + steps..."
        style={[styles.input, styles.multiline]}
        multiline
      />

      <View style={styles.buttonsRow}>
        <Pressable style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </Pressable>

        <Pressable style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontWeight: "700", marginTop: 10, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "white",
  },
  multiline: { minHeight: 140, textAlignVertical: "top" },
  buttonsRow: { flexDirection: "row", gap: 10, marginTop: 16 },
  saveBtn: { flex: 1, backgroundColor: "#111", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  cancelBtn: { flex: 1, backgroundColor: "#e9e9e9", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  saveText: { color: "white", fontWeight: "800" },
  cancelText: { color: "#111", fontWeight: "800" },
});