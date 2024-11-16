import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Text } from "react-native-paper";

import { Searchbar } from "react-native-paper";
import { COLORS } from "../../../constants";

const Welcome = ({ searchTerm, handleClick }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View>
      <Text variant="displaySmall">Find Your Table</Text>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        elevation={1}
        style={{
          borderRadius: 6,
          marginTop: 12,
        }}
      />
    </View>
  );
};

export default Welcome;
