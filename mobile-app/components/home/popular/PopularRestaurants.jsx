import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { useRouter } from "expo-router";
import { Text } from "react-native-paper";
import { COLORS, SIZES } from "../../../constants";
import RestaurantCard from "../../common/cards/restaurantCard/RestaurantCard";
import styles from "./PopularRestaurants.style";

const Popularjobs = () => {
  const router = useRouter();

  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setIsLoading(true);
    try {
      const fetchRestaurants = await fetch("http://localhost:3000/restaurant");
      const response = await fetchRestaurants.json();
      setRestaurants(response.restaurants);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError("Error while loading restaurants!");
    }
  };

  const handleCardPress = (item) => {
    router.push(`/restaurant/${item._id}`);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text variant="titleLarge">Popular Restaurants</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong!</Text>
        ) : (
          <FlatList
            data={restaurants}
            renderItem={({ item }) => (
              <RestaurantCard data={item} handlePress={handleCardPress} />
            )}
            keyExtractor={(item) => item?._id}
            horizontal
            contentContainerStyle={{ columnGap: SIZES.medium }}
            style={{ paddingTop: 4, paddingBottom: 8, paddingLeft: 2 }}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
