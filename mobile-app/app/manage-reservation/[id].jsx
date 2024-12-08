import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeaderBtn from "../../components/header/ScreenHeaderBtn";
import { COLORS, icons } from "../../constants";

export default function ManageReservation() {
  const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;
  const params = useLocalSearchParams();
  const router = useRouter();

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservation();
  }, []);

  const fetchReservation = async () => {
    try {
      const request = await fetch(
        `${API_ENDPOINT}/reservation/restaurant/${params.id}`
      );
      const response = await request.json();
      if (response.reservations) {
        setReservations(response.reservations);
      }
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.chevronLeft}
                dimension="60%"
                handlePress={() => {
                  router.back();
                }}
              />
            ),
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <View style={styles.headerContainer}>
            <Text variant="headlineMedium" style={styles.title}>
              Manage Reservations
            </Text>
            <Text style={styles.description}>
              View and manage all reservations for your restaurant. Keep track
              of customer details, reservation timings, and table assignments.
            </Text>
          </View>

          {reservations.length === 0 ? (
            <View style={styles.noReservationsContainer}>
              <Text style={styles.noReservationsText}>
                No reservations available at the moment. Check back later or
                ensure your restaurant is listed for bookings.
              </Text>
            </View>
          ) : (
            <DataTable style={{ marginTop: 20 }}>
              <DataTable.Header>
                <DataTable.Title>Customer</DataTable.Title>
                <DataTable.Title>Table</DataTable.Title>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
              </DataTable.Header>

              {reservations.map((reservation) => (
                <DataTable.Row key={reservation._id}>
                  <DataTable.Cell>{reservation.customerName}</DataTable.Cell>
                  <DataTable.Cell>{reservation.tableNumber}</DataTable.Cell>
                  <DataTable.Cell>{reservation.slotInterval}</DataTable.Cell>
                  <DataTable.Cell>{reservation.status}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    padding: 16,
    marginTop: -48,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: COLORS.gray200,
    fontSize: 16,
  },
  noReservationsContainer: {
    marginTop: 12,
  },
  noReservationsText: {
    color: COLORS.error,
    fontSize: 16,
  },
});
