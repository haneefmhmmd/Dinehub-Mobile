import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: { paddingLeft: 16, paddingRight: 16, paddingBottom: 20 },
  bannerContainer: {},
  bannerImageHref: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  logoContainer: {
    width: 120,
    height: 120,
    position: "relative",
    top: -60,
    left: 12,
    borderRadius: 60, // Half of the container size for a circle
    backgroundColor: COLORS.lightWhite,
    ...SHADOWS.medium,
    shadowColor: COLORS.gray100,
    justifyContent: "center",
    alignItems: "center",
  },
  logoHref: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  restaurantName: {
    marginTop: -48,
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
    color: COLORS.secondary,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  restaurantStatus: {
    fontSize: 16,
    fontWeight: "bold",
  },
  restaurantMetaData: {
    fontSize: 16,
    color: "grey",
  },
});

export default styles;
