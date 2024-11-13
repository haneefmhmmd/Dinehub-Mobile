import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";

// SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoaded, error] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (error) {
    console.error("Error loading fonts", error);
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      console.log("Font loaded!");
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    console.log("Font Not loaded!");
    return null;
  }

  return <Stack onLayout={onLayoutRootView} />;
};

export default Layout;
