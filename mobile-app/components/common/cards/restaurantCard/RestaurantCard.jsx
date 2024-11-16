import React from "react";
import { Image, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { icons } from "../../../../constants";
import styles from "./restaurantCard.style";

const RestaurantCard = ({ data, handlePress }) => {
  const LeftContent = () => (
    <Image
      source={{
        uri: data.logoHref ? data.logoHref : "",
      }}
      resizeMode="cover"
      style={styles.logoImage}
    />
  );

  return (
    <Card style={styles.container} onPress={() => handlePress(data)}>
      <Card.Title left={LeftContent} />
      <Card.Content>
        <Text variant="titleLarge">{data.name}</Text>
        <View style={styles.ratingContainer}>
          <Image
            style={styles.ratingImage}
            source={icons.star}
            resizeMode="contain"
          />
          <Text variant="bodyLarge" style={styles.rating}>
            {data.rating} / 5
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default RestaurantCard;
