import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    zIndex: -1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 16,
    bottom: 16,
    zIndex: 100,
    elevation: 4,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
  },
});

export default styles;
