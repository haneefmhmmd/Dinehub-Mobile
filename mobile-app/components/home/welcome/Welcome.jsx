import { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { COLORS, icons } from "../../../constants";
import styles from "./welcome.style";

const Welcome = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = () => {
    handleSearch(searchQuery); // Trigger search functionality
  };

  return (
    <View>
      <Text variant="headlineLarge">Find Your Table</Text>
      <Surface style={styles.searchContainer} elevation={2}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery} // Update state with user input
          placeholder="Search for restaurants..."
          placeholderTextColor={COLORS.tertiary}
        />
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={handleSearchSubmit} // Trigger search on button press
        >
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </Surface>
    </View>
  );
};

export default Welcome;
