import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ReserveButton({onPress}){

return(
<TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>Reserve Now</Text>
</TouchableOpacity>
)

}

const styles = StyleSheet.create({
button:{
    backgroundColor:"#2d6a4f",
    padding:15,
    borderRadius:10,
    marginTop:15
},

text:{
    color:"#fff",
    textAlign:"center",
    fontSize:18,
    fontFamily:"BodyFont"
}
});