import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import CustomDrawer from "../components/common/drawer/Drawer";
import ScreenHeaderBtn from "../components/header/ScreenHeaderBtn";
import CtaCard from "../components/home/cta-card/CtaCard";
import PopularRestaurants from "../components/home/popular/PopularRestaurants";
import SearchResults from "../components/home/search-results";
import Welcome from "../components/home/welcome/Welcome";
import { COLORS, icons, images, SIZES } from "../constants";

export default function App() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const handleNavigate = (screen) => {
    console.log(`Navigating to ${screen}`);
    // Add navigation logic here, e.g., navigation.navigate(screen);
    router.push(screen);
  };

  const handleSearch = async (searchText) => {
    setSearchTerm(searchText);
    if (!searchText) return; // Exit if search query is empty

    try {
      const response = await fetch(
        `http://localhost:3000/restaurant/search?name=${searchText}`
      );
      const data = await response.json();
      console.log("Rslts; ", data, searchText);
      if (data && data.restaurants) {
        setSearchResults(data.restaurants); // Update state with search results
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <>
      <CustomDrawer
        visible={drawerVisible}
        onDismiss={() => setDrawerVisible(false)}
        onNavigate={(screen) => console.log(`Navigating to ${screen}`)}
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
                handlePress={() => setDrawerVisible(true)}
              />
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
            <Welcome handleSearch={handleSearch} />
            {searchTerm.length > 0 ? (
              <SearchResults restaurants={searchResults} />
            ) : (
              <>
                <PopularRestaurants />
                <CtaCard />
              </>
            )}
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
