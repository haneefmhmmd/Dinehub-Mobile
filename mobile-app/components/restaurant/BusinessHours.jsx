import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper";
import { COLORS } from "../../constants";

const BusinessHoursAccordion = ({ businessHours }) => {
  const [expanded, setExpanded] = useState(false);

  // Get current day of the week for highlighting
  const currentDay = new Date().toLocaleString("en-us", { weekday: "long" });
  const todayHours = businessHours.find((item) => item.day === currentDay);

  return (
    <List.Section style={{ marginTop: -2, zIndex: -1 }}>
      <List.Accordion
        title={`Today: ${
          todayHours
            ? `${todayHours.openHours.startTime} - ${todayHours.openHours.endTime}`
            : "Closed"
        }`}
        left={(props) => (
          <List.Icon
            {...{ ...props, color: COLORS.black }}
            icon="clock"
            style={{ color: "black" }}
          /> // Override clock color
        )}
        expanded={expanded}
        onPress={() => setExpanded(!expanded)}
        style={{
          backgroundColor: expanded ? COLORS.lightWhite : "transparent", // Optional background change when expanded
          padding: 0, // Remove default padding
        }}
        titleStyle={{
          color: "black",
          paddingLeft: 0,
        }}
      >
        {businessHours.map((item) => (
          <List.Item
            key={item._id}
            titleStyle={{
              fontWeight: item.day === currentDay ? "bold" : "normal",
              marginLeft: -16,
              marginTop: -16,
            }}
            style={styles.listItemContainer}
            title={
              <View style={styles.row}>
                <Text
                  style={[
                    styles.dayText,
                    item.day === currentDay && styles.boldDayText,
                  ]}
                >
                  {item.day}
                </Text>
                <Text style={styles.hoursText}>
                  {item.openHours.startTime} - {item.openHours.endTime}
                </Text>
              </View>
            }
          />
        ))}
      </List.Accordion>
    </List.Section>
  );
};

export default BusinessHoursAccordion;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  dayText: {
    fontSize: 16,
    textAlign: "left",
  },
  hoursText: {
    fontSize: 16,
    textAlign: "right",
  },
  boldDayText: {
    fontWeight: "bold",
  },
});
