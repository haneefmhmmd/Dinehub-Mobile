import React from "react";
import { StyleSheet } from "react-native";
import { Drawer, Modal, Portal, Text } from "react-native-paper";
import { COLORS, SIZES } from "../../../constants";

const CustomDrawer = ({ visible, onDismiss, onNavigate }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.drawerContainer}
      >
        <Drawer.Section>
          <Drawer.Item
            label="Login"
            onPress={() => {
              onNavigate("login");
              onDismiss();
            }}
          />
          <Drawer.Item
            label="Sign Up"
            onPress={() => {
              onNavigate("signup");
              onDismiss();
            }}
          />
        </Drawer.Section>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: COLORS.lightWhite,
    paddingVertical: SIZES.medium,
    width: "70%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
  },
});

export default CustomDrawer;
