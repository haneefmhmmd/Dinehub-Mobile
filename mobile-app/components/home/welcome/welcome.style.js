import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.small,
    borderRadius: SIZES.xSmall,
    backgroundColor: COLORS.white,
    height: 50,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: 44,
    height: "100%",
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: SIZES.xSmall,
    borderBottomRightRadius: SIZES.xSmall,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.black,
  },
});

export default styles;
