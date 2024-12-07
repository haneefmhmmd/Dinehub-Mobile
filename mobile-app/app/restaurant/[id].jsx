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
import { Button, FAB } from "react-native-paper";

import { useCallback, useEffect, useState } from "react";
import { COLORS, icons } from "../../constants";

import styles from "./restaurant.style";

import About from "../../components/restaurant/about";
import Menu from "../../components/restaurant/menu";

import ScreenHeaderBtn from "../../components/header/ScreenHeaderBtn";

const Restaurant = () => {
  const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;
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
        `${API_ENDPOINT}/restaurant/${params.id}`
      );
      const response = await fetchRestaurants.json();
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

  const navigateToReservationPage = () => {
    router.navigate(`reservation/${params.id}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          title: restaurant && restaurant.name,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.chevronLeft}
              dimension="60%"
              handlePress={() => {
                router.back();
              }}
            />
          ),
        }}
      />
      <FAB
        icon="plus"
        label="Reserve"
        style={styles.fab}
        mode="elevated"
        onPress={navigateToReservationPage}
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
          <View style={{ paddingBottom: 70 }}>
            <About restaurant={restaurant} />
            <Menu />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Restaurant;
