import React from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function Title({ children, style }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    color: COLORS.text,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});