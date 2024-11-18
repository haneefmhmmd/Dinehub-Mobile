import { DefaultTheme } from "react-native-paper";

const COLORS = {
  primary: "#ffd740",
  secondary: "#685e40",
  tertiary: "#45664c",
  lightWhite: "#FAFAFC",
  white: "#F3F4F8",
  gray100: "#C1C0C8",
  gray200: "#83829A",
  black: "#1e2223",
};

const SIZES = {
  xSmall: 8,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const customTheme = {
  primary: "#ffd740",
  onPrimary: "#ffffff",
  primaryContainer: "#ffe17b",
  onPrimaryContainer: "#231b00",
  secondary: "#685e40",
  onSecondary: "#ffffff",
  secondaryContainer: "#f0e2bb",
  onSecondaryContainer: "#221b04",
  tertiary: "#45664c",
  onTertiary: "#ffffff",
  tertiaryContainer: "#c7eccb",
  onTertiaryContainer: "#01210d",
  error: "#ba1a1a",
  onError: "#ffffff",
  errorContainer: "#ffdad6",
  onErrorContainer: "#410002",
  background: "#fffbff",
  onBackground: "#1d1b16",
  surface: "#fffbff",
  onSurface: "#1d1b16",
  surfaceVariant: "#ebe2cf",
  onSurfaceVariant: "#4b4639",
  outline: "#7d7767",
  outlineVariant: "#cec6b4",
  shadow: "#000000",
  scrim: "#000000",
  inverseSurface: "#332e2a",
  inverseOnSurface: "#f6f0e7",
  inversePrimary: "#eac32b",
  elevation: {
    level0: "transparent",
    level1: "#f8f3f2",
    level2: "#f4eeeb",
    level3: "#fafafc",
    level4: "#eee8e0",
    level5: "#ebe5db",
  },
};

export { COLORS, customTheme, SIZES };
