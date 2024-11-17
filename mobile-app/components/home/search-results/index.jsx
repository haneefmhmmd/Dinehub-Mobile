import { useRouter } from "expo-router";
import { Image } from "react-native";
import { Card, Text } from "react-native-paper";
import { COLORS, images, SIZES } from "../../../constants";

const SearchResults = ({ restaurants }) => {
  const router = useRouter();

  const navigateToRestaurantPage = (item) => {
    router.push(`/restaurant/${item._id}`);
  };

  return restaurants.length > 0 ? (
    restaurants.map((restaurant, idx) => (
      <Card
        key={restaurant.id || restaurant.name}
        style={{
          marginTop: idx === 0 ? 32 : 16,
          backgroundColor: COLORS.lightWhite,
        }}
        onPress={() => {
          navigateToRestaurantPage(restaurant);
        }}
      >
        <Card.Title
          title={restaurant.name}
          titleVariant="titleLarge"
          subtitle={restaurant.about}
          subtitleNumberOfLines="1"
          left={(props) => (
            <Image
              source={
                restaurant.logoHref
                  ? { uri: restaurant.logoHref }
                  : images.restaurant
              }
              resizeMode="cover"
              style={{ width: 48, height: 48, borderRadius: 50 }}
            />
          )}
        />
      </Card>
    ))
  ) : (
    <Text variant="bodyLarge" style={{ marginTop: 24 }}>
      No Results found!
    </Text>
  );
};

export default SearchResults;
