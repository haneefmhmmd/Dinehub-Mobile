import { Stack } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Drawer } from "react-native-paper";

import { useState } from "react";
import { Button, Card, Text } from "react-native-paper";
import CustomDrawer from "../components/common/drawer/Drawer";
import ScreenHeaderBtn from "../components/header/ScreenHeaderBtn";
import CtaCard from "../components/home/cta-card/CtaCard";
import PopularRestaurants from "../components/home/popular/PopularRestaurants";
import Welcome from "../components/home/welcome/Welcome";
import { COLORS, icons, images, SIZES } from "../constants";

export default function App() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleNavigate = (screen) => {
    console.log(`Navigating to ${screen}`);
    // Add navigation logic here, e.g., navigation.navigate(screen);
  };

  return (
    <>
      <CustomDrawer
        visible={drawerVisible}
        onDismiss={() => setDrawerVisible(false)}
        onNavigate={handleNavigate}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.menu}
                dimension="60%"
                handlePress={() => {
                  setDrawerVisible(true);
                }}
              />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={icons.user} dimension="60%" />
            ),
            headerTitle: "",
          }}
        />
        <ScrollView showsVerticalScrollIndicator="false">
          <View
            style={{
              flex: 1,
              padding: SIZES.medium,
            }}
          >
            <Welcome />
            <PopularRestaurants />
            <CtaCard />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
