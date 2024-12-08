import { Stack } from "expo-router"; // Import the Stack component for navigation
import React from "react"; // Import React for component creation
import {
  MD3LightTheme as DefaultTheme, // Import the default Material Design 3 light theme
  PaperProvider, // Import the PaperProvider from react-native-paper for theming
} from "react-native-paper";
import { customTheme } from "../constants/theme"; // Import custom theme configurations

/**
 * Layout Component
 * Wraps the application with a themed provider and navigation stack.
 * Ensures consistent theming across the app using react-native-paper.
 *
 * @returns {JSX.Element} The Layout component
 */
const Layout = () => {
  // Define a theme object by extending the default Material Design 3 light theme
  const theme = {
    ...DefaultTheme,
    colors: customTheme, // Replace default colors with custom colors
  };

  return (
    // Wrap the app with PaperProvider to apply the custom theme
    <PaperProvider theme={theme}>
      {/* Stack component handles navigation within the app */}
      <Stack />
    </PaperProvider>
  );
};

export default Layout; // Export the Layout component for use in the application
