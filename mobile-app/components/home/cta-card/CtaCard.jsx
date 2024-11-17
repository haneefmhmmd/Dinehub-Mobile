import { StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import { COLORS, SIZES } from "../../../constants";
import { router } from "expo-router";

const CtaCard = () => {
  return (
    <Card style={styles.ctaCard}>
      <Card.Content>
        <Text variant="titleLarge">Are you a Restaurant Owner?</Text>
        <Text variant="bodyMedium" style={{ marginTop: 4 }}>
          Join us to attract more customers and make reservations easier for
          your diners.
        </Text>
      </Card.Content>
      <Card.Actions style={{ marginTop: 8 }}>
        <Button
          mode="contained"
          onPress={() => router.navigate("dashboard")}
          style={styles.ctaButton}
        >
          Sign Up Now
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  ctaCard: {
    marginTop: SIZES.medium,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    padding: SIZES.small,
  },
  ctaTitle: {
    fontSize: SIZES.large,
    color: COLORS.white,
    fontWeight: "bold",
    marginBottom: SIZES.small,
  },
  ctaSubtitle: {
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginBottom: SIZES.small,
  },
  ctaButton: {
    backgroundColor: COLORS.black,
  },
});

export default CtaCard;
