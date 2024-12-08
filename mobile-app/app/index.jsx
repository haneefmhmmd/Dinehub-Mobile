import { Stack, useRouter } from "expo-router"; // Import Stack for navigation and useRouter for route handling
import { useState } from "react"; // Import useState for managing component state
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native"; // Import React Native components
import CustomDrawer from "../components/common/drawer/Drawer"; // Custom drawer component for navigation
import ScreenHeaderBtn from "../components/header/ScreenHeaderBtn"; // Header button component
import CtaCard from "../components/home/cta-card/CtaCard"; // CTA card component
import PopularRestaurants from "../components/home/popular/PopularRestaurants"; // Component for displaying popular restaurants
import SearchResults from "../components/home/search-results"; // Component for displaying search results
import Welcome from "../components/home/welcome/Welcome"; // Welcome component
import { COLORS, icons, SIZES } from "../constants"; // Constants for colors, icons, and sizes

/**
 * Main Application Component
 * Handles rendering the main screen with a custom drawer, search functionality,
 * and navigation capabilities.
 *
 * @returns {JSX.Element} The App component
 */
export default function App() {
  const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL; // API endpoint from environment variables

  // State for managing the visibility of the drawer
  const [drawerVisible, setDrawerVisible] = useState(false);

  // State for storing search results
  const [searchResults, setSearchResults] = useState([]);

  // State for tracking the current search term
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter(); // Hook for navigation

  /**
   * Handles navigation to a specific screen.
   *
   * @param {string} screen - The screen to navigate to
   */
  const handleNavigate = (screen) => {
    console.log(`Navigating to ${screen}`);
    router.navigate(screen); // Navigate to the specified screen
  };

  /**
   * Handles searching for restaurants.
   *
   * @param {string} searchText - The search query entered by the user
   */
  const handleSearch = async (searchText) => {
    setSearchTerm(searchText); // Update the search term state
    if (!searchText) return; // Exit if the search term is empty

    try {
      const response = await fetch(
        `${API_ENDPOINT}/restaurant/search?name=${searchText}` // API call with the search query
      );
      const data = await response.json(); // Parse the response
      console.log("Results: ", data, searchText);
      if (data && data.restaurants) {
        setSearchResults(data.restaurants); // Update the search results state
      }
    } catch (error) {
      console.error("Error fetching search results:", error); // Log any errors
    }
  };

  return (
    <>
      {/* Custom drawer for navigation */}
      <CustomDrawer
        visible={drawerVisible}
        onDismiss={() => setDrawerVisible(false)} // Close drawer callback
        onNavigate={(screen) => handleNavigate(screen)} // Navigation callback
      />
      {/* Safe area to ensure UI consistency across devices */}
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        {/* Stack Screen options for header customization */}
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.menu}
                dimension="60%"
                handlePress={() => setDrawerVisible(true)} // Open drawer on button press
              />
            ),
            headerTitle: "",
          }}
        />
        {/* ScrollView for vertical scrolling of content */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              padding: SIZES.medium,
            }}
          >
            {/* Welcome component with search handler */}
            <Welcome handleSearch={handleSearch} />
            {/* Conditional rendering of search results or default content */}
            {searchTerm.length > 0 ? (
              <SearchResults restaurants={searchResults} />
            ) : (
              <>
                <PopularRestaurants /> {/* Component for popular restaurants */}
                <CtaCard /> {/* CTA card for promotions */}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

// Stylesheet for component-specific styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
