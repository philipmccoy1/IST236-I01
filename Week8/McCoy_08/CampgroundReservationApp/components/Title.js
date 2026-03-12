import React from "react";
import { Text, StyleSheet } from "react-native";

export default function Title({text}) {
return(
    <Text style={styles.title}>{text}</Text>
)
}

const styles = StyleSheet.create({
title:{
    fontSize:34,
    fontFamily:"TitleFont",
    color:"#ffffff",
    textAlign:"center",
    marginBottom:20
}
});