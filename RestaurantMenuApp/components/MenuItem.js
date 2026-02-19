import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function MenuItem({ name, price, image }) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
  },
  image: {
    width: "100%",
    height: 160,
  },
  info: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  name: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
  },
  price: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
  },
});