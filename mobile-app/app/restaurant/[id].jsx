import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import { useCallback, useEffect, useState } from "react";
import { COLORS } from "../../constants";

import styles from "./restaurant.style";

import About from "../../components/restaurant/about";
import BusinessHours from "../../components/restaurant/BusinessHours";

const Restaurant = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setIsLoading(true);
    try {
      const fetchRestaurants = await fetch(
        `http://localhost:3000/restaurant/${params.id}`
      );
      const response = await fetchRestaurants.json();
      console.log("response: ", response.restaurant);
      setRestaurant(response.restaurant);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError("Error while loading restaurants!");
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRestaurants();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          title: restaurant && restaurant.name,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <>
            <About restaurant={restaurant} />
            <BusinessHours businessHours={restaurant.businessHours} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Restaurant;
