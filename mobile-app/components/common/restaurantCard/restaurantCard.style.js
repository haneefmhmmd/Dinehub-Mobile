import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: 250,
    backgroundColor: COLORS.lightWhite,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    color: COLORS.gray200,
    marginLeft: 4,
    marginTop: 2,
  },
  ratingImage: {
    width: 24,
    height: 24,
  },
});

export default styles;
