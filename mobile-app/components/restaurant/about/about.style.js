import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: { paddingLeft: 16, paddingRight: 16, paddingBottom: 20 },
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
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  restaurantStatus: {
    fontSize: 16,
    fontWeight: "medium",
  },
  restaurantMetaData: {
    fontSize: 16,
    color: "grey",
  },
  addressText: {
    flexWrap: "wrap", // Allow wrapping if necessary
    maxWidth: "80%", // Ensure it doesn't overflow
    flexShrink: 1, // Allow it to shrink
    overflow: "hidden", // Hide overflow if text is too long
    textOverflow: "ellipsis", // Adds ellipsis when too long
  },
});

export default styles;
