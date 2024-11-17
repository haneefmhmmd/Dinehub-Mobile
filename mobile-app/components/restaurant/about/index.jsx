import { Image, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { images, SIZES } from "../../../constants";
import { isRestaurantOpen } from "../../../utils/restaurant";
import BusinessHoursAccordion from "../BusinessHours";
import styles from "./about.style";

const Restaurant = ({ restaurant }) => {
  isOpen = isRestaurantOpen(restaurant.businessHours);
  addressString = `${restaurant.address.street}, ${restaurant.address.city}`;

  return (
    <>
      <View>
        <Image
          source={{ uri: restaurant.bannerImageHref }}
          style={styles.bannerImageHref}
          resizeMode="cover"
        />
        <Surface style={styles.logoContainer} elevation={1}>
          <Image
            source={
              restaurant.logoHref
                ? { uri: restaurant.logoHref }
                : images.restaurant
            }
            style={styles.logoHref}
            resizeMode="contain"
          />
        </Surface>
      </View>
      <Text variant="titleMedium" style={styles.restaurantName}>
        {restaurant.name}
      </Text>
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
      <BusinessHoursAccordion businessHours={restaurant.businessHours} />
      <View style={{ marginTop: -10 }}>
        <Text variant="titleMedium" style={{ fontSize: SIZES.large }}>
          From the owners
        </Text>
        <Text variant="bodyLarge" style={{ marginTop: 4 }}>
          {restaurant.about}
        </Text>
      </View>
    </>
  );
};

export default Restaurant;
