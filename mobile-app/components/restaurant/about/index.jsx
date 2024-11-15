import { Image, Text, View } from "react-native";

import { useEffect } from "react";
import { isRestaurantOpen } from "../../../utils/restaurant";
import styles from "./about.style";

const Restaurant = ({ restaurant }) => {
  isOpen = isRestaurantOpen(restaurant.businessHours);
  addressString = `${restaurant.address.street}, ${restaurant.address.city}`;

  return (
    <>
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: restaurant.bannerImageHref }}
          style={styles.bannerImageHref}
          resizeMode="cover"
        />
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: restaurant.logoHref }}
            style={styles.logoHref}
            resizeMode="contain"
          />
        </View>
      </View>
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <View style={styles.infoContainer}>
        <Text
          style={[
            styles.restaurantStatus,
            {
              color: isOpen ? "green" : "red",
            },
          ]}
        >
          {isOpen ? "Open" : "Closed"}
        </Text>
        <Text style={styles.restaurantMetaData}>
          {" "}
          · {restaurant.cuisine} ·{" "}
          <Text style={styles.addressText}>{addressString}</Text>
        </Text>
      </View>
    </>
  );
};

export default Restaurant;
