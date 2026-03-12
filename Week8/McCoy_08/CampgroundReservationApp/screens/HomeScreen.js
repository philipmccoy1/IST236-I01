import React, {useState} from "react";
import {
View,
Text,
StyleSheet,
ImageBackground,
TouchableOpacity
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import {Picker} from "@react-native-picker/picker";

import Title from "../components/Title";
import ReserveButton from "../components/ReserveButton";

export default function HomeScreen(){

const [checkIn,setCheckIn] = useState(new Date());
const [checkOut,setCheckOut] = useState(new Date());

const [showCheckIn,setShowCheckIn] = useState(false);
const [showCheckOut,setShowCheckOut] = useState(false);

const [guests,setGuests] = useState(1);
const [campsites,setCampsites] = useState(1);

const [showGuests,setShowGuests] = useState(false);
const [showSites,setShowSites] = useState(false);

const [reservation,setReservation] = useState(null);

const reserve = () =>{
setReservation({
checkIn,
checkOut,
guests,
campsites
})
}

return(

<ImageBackground
source={require("../assets/images/campground.jpg")}
style={styles.background}
>

<View style={styles.overlay}>

<Title text="Evergreen Campground"/>

<TouchableOpacity onPress={()=>setShowCheckIn(true)}>
<Text style={styles.text}>
Check In: {checkIn.toLocaleString()}
</Text>
</TouchableOpacity>

{showCheckIn && (
<DateTimePicker
value={checkIn}
mode="datetime"
display="default"
onChange={(event,date)=>{
setShowCheckIn(false)
if(date) setCheckIn(date)
}}
/>
)}

<TouchableOpacity onPress={()=>setShowCheckOut(true)}>
<Text style={styles.text}>
Check Out: {checkOut.toLocaleString()}
</Text>
</TouchableOpacity>

{showCheckOut && (
<DateTimePicker
value={checkOut}
mode="datetime"
display="default"
onChange={(event,date)=>{
setShowCheckOut(false)
if(date) setCheckOut(date)
}}
/>
)}

<TouchableOpacity onPress={()=>setShowGuests(!showGuests)}>
<Text style={styles.text}>
Guests: {guests}
</Text>
</TouchableOpacity>

{showGuests && (
<Picker
selectedValue={guests}
onValueChange={(itemValue)=>setGuests(itemValue)}
>
{[...Array(15)].map((_,i)=>(
<Picker.Item key={i} label={`${i+1}`} value={i+1}/>
))}
</Picker>
)}

<TouchableOpacity onPress={()=>setShowSites(!showSites)}>
<Text style={styles.text}>
Campsites: {campsites}
</Text>
</TouchableOpacity>

{showSites && (
<Picker
selectedValue={campsites}
onValueChange={(itemValue)=>setCampsites(itemValue)}
>
{[...Array(5)].map((_,i)=>(
<Picker.Item key={i} label={`${i+1}`} value={i+1}/>
))}
</Picker>
)}

<ReserveButton onPress={reserve}/>

{reservation && (
<View style={styles.result}>
<Text style={styles.resultText}>Reservation Details</Text>
<Text style={styles.resultText}>
Check In: {reservation.checkIn.toLocaleString()}
</Text>
<Text style={styles.resultText}>
Check Out: {reservation.checkOut.toLocaleString()}
</Text>
<Text style={styles.resultText}>
Guests: {reservation.guests}
</Text>
<Text style={styles.resultText}>
Campsites: {reservation.campsites}
</Text>
</View>
)}

</View>
</ImageBackground>
)
}

const styles = StyleSheet.create({

background:{
flex:1,
resizeMode:"cover"
},

overlay:{
flex:1,
backgroundColor:"rgba(0,0,0,0.5)",
padding:20,
justifyContent:"center"
},

text:{
color:"#fff",
fontSize:18,
fontFamily:"BodyFont",
marginVertical:10
},

result:{
marginTop:20
},

resultText:{
color:"#fff",
fontSize:16
}

})