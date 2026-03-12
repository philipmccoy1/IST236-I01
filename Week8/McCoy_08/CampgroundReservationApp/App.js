import React, { useCallback } from "react";
import { View } from "react-native";
import HomeScreen from "./screens/HomeScreen";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function App() {

const [fontsLoaded] = useFonts({
    "TitleFont": require("./assets/fonts/PlayfairDisplay-Bold.ttf"),
    "BodyFont": require("./assets/fonts/Montserrat-Regular.ttf"),
});

const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
        await SplashScreen.hideAsync();
    }
}, [fontsLoaded]);

if (!fontsLoaded) {
    return null;
}

return (
    <View style={{flex:1}} onLayout={onLayoutRootView}>
        <HomeScreen/>
    </View>
);
}