import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function RecipeItem({ title, onView, onDelete }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.actions}>
        <Pressable style={styles.viewBtn} onPress={onView}>
          <Text style={styles.viewText}>View</Text>
        </Pressable>

        <Pressable style={styles.deleteBtn} onPress={onDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f4f4f4",
    marginBottom: 10,
  },
  title: { flex: 1, fontSize: 16, fontWeight: "600", marginRight: 10 },
  actions: { flexDirection: "row", gap: 8 },
  viewBtn: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#111", borderRadius: 8 },
  deleteBtn: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#fff", borderRadius: 8, borderWidth: 1, borderColor: "#111" },
  viewText: { color: "white", fontWeight: "700" },
  deleteText: { color: "#111", fontWeight: "700" },
});