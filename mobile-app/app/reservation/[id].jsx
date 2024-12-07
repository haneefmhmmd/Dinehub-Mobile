import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Dialog, Portal, Text, TextInput } from "react-native-paper";
import ScreenHeaderBtn from "../../components/header/ScreenHeaderBtn";
import { COLORS, icons } from "../../constants";

const ReservationPage = () => {
  const API_ENDPOINT = process.env.EXPO_PUBLIC_API_URL;
  const params = useLocalSearchParams();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isTimeSlotsFetched, setIsTimeSlotsFetched] = useState(false);
  const [reservationId, setReservationId] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [table, setTable] = useState(null);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const fetchAvailableTimes = async () => {
    if (!date || !numberOfGuests) {
      Alert.alert("Error", "Please fill in all required fields.");
      setIsTimeSlotsFetched(false);
      return;
    }

    try {
      const fetchRestaurant = await fetch(
        `${API_ENDPOINT}/restaurant/${params.id}`
      );
      const response = await fetchRestaurant.json();
      setRestaurant(response.restaurant);
      if (!response) {
        Alert.alert("Error", "Restaurant details not found.");
        setIsTimeSlotsFetched(false);
        return;
      }

      const selectedDay = date.toLocaleDateString("en-US", { weekday: "long" });

      const businessHours = response.restaurant.businessHours.find(
        (hours) => hours.day === selectedDay
      );

      if (!businessHours) {
        Alert.alert("Error", "No timeslots available, please try again later!");
        setIsTimeSlotsFetched(false);
        return;
      }

      const { startTime, endTime } = businessHours.openHours;

      // Parse times manually for iOS compatibility
      const parseTime = (timeString) => {
        const [time, modifier] = timeString.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;

        return { hours, minutes };
      };

      const { hours: startHours, minutes: startMinutes } = parseTime(startTime);
      const { hours: endHours, minutes: endMinutes } = parseTime(endTime);

      const startDateTime = new Date(date);
      startDateTime.setHours(startHours, startMinutes, 0, 0);

      const endDateTime = new Date(date);
      endDateTime.setHours(endHours, endMinutes, 0, 0);

      const timeSlots = [];
      let currentTime = startDateTime;

      while (currentTime < endDateTime) {
        timeSlots.push(
          currentTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        currentTime = new Date(currentTime.getTime() + 30 * 60 * 1000); // Increment by 30 minutes
      }

      const matchingTables = response.restaurant.seatingArrangements.filter(
        (table) => table.tableCapacity >= numberOfGuests
      );

      if (matchingTables.length === 0) {
        Alert.alert(
          "Error",
          "We are sorry, we don't have a table to match the number of guests selected!"
        );
        setIsTimeSlotsFetched(false);
        return;
      } else {
        const table =
          matchingTables[Math.floor(Math.random() * matchingTables.length)];
        setTable(table.tableNumber);
        setAvailableTimes(
          timeSlots.map((slot) => `${slot} (Table ${table.tableNumber})`)
        );
      }

      setIsTimeSlotsFetched(true);
    } catch (error) {
      console.error(error); // Log the error for debugging
      Alert.alert("Error", "Unable to fetch time slots. Please try again.");
      setIsTimeSlotsFetched(false);
    }
  };

  const validateForm = () => {
    if (!arrivalTime || !name || !email || !phone || !numberOfGuests) {
      Alert.alert("Error", "Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const sendReservationData = async () => {
    const payload = {
      restaurant: restaurant._id,
      customerName: name,
      customerEmail: email,
      customerPhoneNumber: phone,
      reservedDate: date,
      slotInterval: arrivalTime,
      tableNumber: table,
    };

    try {
      const response = await fetch(`${API_ENDPOINT}/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      return await response.json();
    } catch (error) {
      console.error("Error reserving seat:", error);
      throw new Error("An error occurred while processing your reservation.");
    }
  };

  const handleSuccess = (reservationId) => {
    Alert.alert(
      "Success",
      `Reservation completed! Your reservation ID is ${reservationId}. Please save this ID for any future changes and when going to the restaurant.`,
      [
        {
          text: "OK",
          onPress: () => resetForm(),
        },
      ]
    );
  };

  const handleFailure = () => {
    Alert.alert("Error", "Reservation failed. Please try again.");
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setNumberOfGuests("");
    setArrivalTime("");
    setDate(new Date());
    setAvailableTimes([]);
    setIsTimeSlotsFetched(false);
  };

  const handleReservation = async () => {
    if (!validateForm()) return;

    // Collecting form data
    const data = {
      name,
      email,
      phone,
      numberOfGuests,
      arrivalTime,
      date: date.toDateString(),
    };

    // Send reservation data to the API
    try {
      const result = await sendReservationData(data);

      if (result.savedReservation._id) {
        const reservationId = result.savedReservation._id;
        setReservationId(reservationId);
        handleSuccess(reservationId);
      } else {
        handleFailure();
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          title: "Reserve Seat",
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
      <ScrollView style={styles.container}>
        <Text style={styles.title} variant="headlineLarge">
          Make a Reservation
        </Text>

        {/* Date Picker as Input */}
        <View style={{ position: "relative", zIndex: 1 }}>
          <TextInput
            label="Date"
            value={date.toDateString()}
            editable={false}
            style={styles.input}
            right={
              <TextInput.Icon
                icon="calendar"
                onPress={() => setShowDatePicker(!showDatePicker)} // Trigger DateTimePicker on icon click
              />
            }
          />
          <Portal>
            <Dialog
              visible={showDatePicker}
              onDismiss={() => setShowDatePicker(false)}
              style={{ borderRadius: 4, top: -20 }}
            >
              <Dialog.Content style={{ width: "100%", left: -26 }}>
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={handleDateChange}
                />
              </Dialog.Content>
            </Dialog>
          </Portal>
        </View>

        {/* Number of Guests */}
        <TextInput
          label="Number of Guests"
          value={numberOfGuests}
          onChangeText={setNumberOfGuests}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Get Available Time Slots */}
        <Button
          title="Get Available Time Slots"
          onPress={fetchAvailableTimes}
          disabled={!date || !numberOfGuests}
        />

        {/* Show Additional Fields After Fetch */}
        {isTimeSlotsFetched && (
          <>
            {/* Arrival Time */}
            <View style={styles.inputContainer}>
              <Text style={{ marginBottom: 8 }}>Arrival Time</Text>
              <Picker
                selectedValue={arrivalTime}
                onValueChange={(itemValue, itemIndex) =>
                  setArrivalTime(itemValue)
                }
              >
                {availableTimes.map((time) => (
                  <Picker.Item label={time} value={time} key={time} />
                ))}
              </Picker>
            </View>

            {/* Name */}
            <TextInput
              label="Your Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              mode="outlined"
            />

            {/* Email */}
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
              mode="outlined"
            />

            {/* Phone Number */}
            <TextInput
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
              mode="outlined"
            />

            {/* Reserve Button */}
            <Button
              title="Reserve"
              onPress={handleReservation}
              disabled={
                !arrivalTime ||
                !name ||
                !email ||
                !phone ||
                !date ||
                !numberOfGuests
              }
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
  },
  inputAndroid: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
});

export default ReservationPage;
