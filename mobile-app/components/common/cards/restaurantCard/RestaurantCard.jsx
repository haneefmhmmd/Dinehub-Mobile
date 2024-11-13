import React from "react";
import { Image, Text, View } from "react-native";

import { TouchableOpacity } from "react-native";
import { icons } from "../../../../constants";
import styles from "./restaurantCard.style";

const RestaurantCard = ({ data, handlePress }) => {
  console.log(data);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handlePress(data)}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: data.logoHref ? data.logoHref : "",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.cuisine} numberOfLines={1}>
        {data.cuisine}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.restaurantName} numberOfLines={1}>
          {data.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Image source={icons.star} resizeMode="contain" />
          <Text style={styles.rating}>{data.rating} / 5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
