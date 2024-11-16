import { Stack } from "expo-router";
import React from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { customTheme } from "../constants/theme";

const Layout = () => {
  const theme = {
    ...DefaultTheme,
    colors: customTheme,
  };
  return (
    <PaperProvider theme={theme}>
      <Stack />
    </PaperProvider>
  );
};

export default Layout;
