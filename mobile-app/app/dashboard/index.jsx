import { router, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import "../../components/common/secureStorage/secureStorage";
import ScreenHeaderBtn from "../../components/header/ScreenHeaderBtn";
import { COLORS, icons, images, SIZES } from "../../constants";

export default function Index() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [businessEmail, setEmail] = useState("");
  const [cuisine, setCuisine] = useState("");

  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const [token, setToken] = useState("");
  const [restaurant, setRestaurant] = useState("");

  const [businessHours, setBusinessHours] = useState([
    {
      openHours: {
        startTime: "00:00 AM",
        endTime: "00:00 AM",
      },
      day: "Monday",
      _id: `Monday-${Date.now()}`,
    },
    {
      openHours: {
        startTime: "00:00 AM",
        endTime: "00:00 AM",
      },
      day: "Tuesday",
      _id: `Tuesday-${Date.now()}`,
    },
    {
      openHours: {
        startTime: "00:00 AM",
        endTime: "00:00 AM",
      },
      day: "Wednesday",
      _id: `Wednesday-${Date.now()}`,
    },
    {
      openHours: {
        startTime: "00:00 AM",
        endTime: "00:00 AM",
      },
      day: "Thursday",
      _id: `Thursday-${Date.now()}`,
    },
    {
      openHours: {
        startTime: "00:00 AM",
        endTime: "00:00 AM",
      },
      day: "Friday",
      _id: `Friday-${Date.now()}`,
    },
    {
      openHours: {
        startTime: "00:00 AM",
        endTime: "00:00 AM",
      },
      day: "Saturday",
      _id: `Saturday-${Date.now()}`,
    },
    {
      openHours: {
        startTime: "00:00 AM",
        endTime: "00:00 AM",
      },
      day: "Sunday",
      _id: `Sunday-${Date.now()}`,
    },
  ]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const loginDataString = await SecureStore.getItemAsync("loginData");
        if (loginDataString) {
          const loginData = JSON.parse(loginDataString);
          setToken(loginData.token);
          const restaurantData = loginData.restaurant;
          setRestaurant(restaurantData);
          setName(restaurantData.name);
          setEmail(restaurantData.businessEmail);
          setContactNumber(restaurantData.contactNumber);
          setStreetName(restaurantData.address.street);
          setCity(restaurantData.address.city);
          setPostalCode(restaurantData.address.postalCode);
          setProvince(restaurantData.address.province);
          setCountry(restaurantData.address.country);
          setWebsiteUrl(restaurantData.url);
          setBannerUrl(restaurantData.bannerImageHref);
          setLogoUrl(restaurantData.logoHref);
          setCuisine(restaurantData.cuisine);
          setAbout(restaurantData.about);
          setSeatingArrangements(restaurantData.seatingArrangements);
          setBusinessHours(restaurantData.businessHours);
        } else {
          console.error("No login data found. Redirecting to login.");
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };
    fetchToken();
  }, []);

  const [seatingArrangements, setSeatingArrangements] = useState([
    { id: Date.now(), tableNumber: "", tableCapacity: "" },
  ]);

  // Add a new seating arrangement
  const addNewSeatingArrangement = () => {
    setSeatingArrangements([
      ...seatingArrangements,
      { id: Date.now(), tableNumber: "", tableCapacity: "" },
    ]);
  };

  // Update seating arrangement fields
  const updateSeatingArrangement = (id, key, value) => {
    setSeatingArrangements((prev) =>
      prev.map((arr) => (arr.id === id ? { ...arr, [key]: value } : arr))
    );
  };

  // Delete a seating arrangement
  const deleteArrangement = (id) => {
    setSeatingArrangements((prev) => prev.filter((arr) => arr.id !== id));
  };

  // Update restaurant details
  const handleRestaurantChange = (key, value) => {
    setRestaurant((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignUp = async () => {
    const payload = {
      name,
      password,
      about,
      logoUrl,
      bannerUrl,
      websiteUrl,
      contactNumber,
      businessEmail,
      cuisine,
      address: {
        streetName,
        city,
        province,
        postalCode,
        country,
      },
      seatingArrangements,
      businessHours,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/restaurant/${restaurant._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error signing up:", errorData);
        return;
      }

      const data = await response.json();
      console.log("Restaurant created successfully:", data);
      router.push("/dashboard"); // Navigate to a success page or dashboard
    } catch (error) {
      console.error("Error posting restaurant details:", error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => "",
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.chevronLeft}
              dimension="60%"
              handlePress={() => {
                router.navigate("");
              }}
            />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.section}>
        <Text
          variant="headlineMedium"
          style={{ marginTop: 50, textAlign: "center" }}
        >
          Welcome to Your Restaurant Management Dashboard
        </Text>
        <Text
          variant="titleMedium"
          style={{
            marginTop: 20,
            marginBottom: 20,
            textAlign: "center",
            color: COLORS.gray200,
          }}
        >
          Effortlessly manage your restaurant's information, menu, and
          reservations in one place
        </Text>

        <Button
          mode="outlined"
          onPress={() => {
            router.navigate(`manage-reservation/${restaurant._id}`);
          }}
        >
          <Text>View Reservations</Text>
        </Button>

        <TextInput
          style={styles.textInput}
          label="Restaurant Name"
          value={name}
          onChangeText={(text) => handleRestaurantChange("name", text)}
        />
        <TextInput
          style={styles.textInput}
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <TextInput
          style={styles.textInput}
          label="About Us"
          value={about}
          onChangeText={(text) => setAbout(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Logo URL"
          value={logoUrl}
          onChangeText={(text) => setLogoUrl(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Banner URL"
          value={bannerUrl}
          onChangeText={(text) => setBannerUrl(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Website URL"
          value={websiteUrl}
          onChangeText={(text) => setWebsiteUrl(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Contact Number"
          value={contactNumber}
          onChangeText={(contactNumber) => setContactNumber(contactNumber)}
        />
        <TextInput
          style={styles.textInput}
          label="Restaurant Email"
          value={businessEmail}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.textInput}
          label="Cuisine"
          value={cuisine}
          onChangeText={(text) => setCuisine(text)}
        />
        <Text variant="titleLarge" style={{ marginTop: 40 }}>
          Address
        </Text>
        <TextInput
          style={styles.textInput}
          label="Street Name"
          value={streetName}
          onChangeText={(text) => setStreetName(text)}
        />
        <TextInput
          style={styles.textInput}
          label="City"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Province"
          value={province}
          onChangeText={(text) => setProvince(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Postal Code"
          value={postalCode}
          onChangeText={(text) => setPostalCode(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Country"
          value={country}
          onChangeText={(text) => setCountry(text)}
        />
        <Text variant="titleLarge" style={{ marginTop: 40 }}>
          Operating Hours
        </Text>
        <Text
          variant="titleSmall"
          style={{ marginTop: 10, color: COLORS.gray200 }}
        >
          Enter timings in 12-hour format (e.g., 09:00 AM). Use "00:00 AM" for
          holidays.
        </Text>
        <Text variant="titleLarge" style={{ marginTop: 40 }}>
          Monday
        </Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <TextInput
              mode="outlined"
              label="From"
              left={<TextInput.Affix text="From" />}
              value={businessHours[0].openHours.startTime}
            />
          </View>
          <View style={styles.col}>
            <TextInput
              mode="outlined"
              label="To"
              left={<TextInput.Affix text="To" />}
              value={businessHours[0].openHours.endTime}
            />
          </View>
        </View>
        <Text variant="titleLarge" style={{ marginTop: 30 }}>
          Tuesday
        </Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <TextInput
              mode="outlined"
              label="From"
              left={<TextInput.Affix text="From" />}
              value={businessHours[1].openHours.startTime}
            />
          </View>
          <View style={styles.col}>
            <TextInput
              mode="outlined"
              label="To"
              left={<TextInput.Affix text="To" />}
              value={businessHours[1].openHours.endTime}
            />
          </View>
        </View>
        <Text variant="titleLarge" style={{ marginTop: 30 }}>
          Wednesday
        </Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <TextInput
              mode="outlined"
              label="From"
              left={<TextInput.Affix text="From" />}
              value={businessHours[2].openHours.startTime}
            />
          </View>
          <View style={styles.col}>
            <TextInput
              mode="outlined"
              label="To"
              left={<TextInput.Affix text="To" />}
              value={businessHours[2].openHours.endTime}
            />
          </View>
        </View>
        <Text variant="titleLarge" style={{ marginTop: 30 }}>
          Thursday
        </Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <TextInput
              mode="outlined"
              label="From"
              left={<TextInput.Affix text="From" />}
              value={businessHours[3].openHours.startTime}
            />
          </View>
          <View style={styles.col}>
            <TextInput
              mode="outlined"
              label="To"
              left={<TextInput.Affix text="To" />}
              value={businessHours[3].openHours.endTime}
            />
          </View>
        </View>
        <Text variant="titleLarge" style={{ marginTop: 30 }}>
          Friday
        </Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <TextInput
              mode="outlined"
              label="From"
              left={<TextInput.Affix text="From" />}
              value={businessHours[4].openHours.startTime}
            />
          </View>
          <View style={styles.col}>
            <TextInput
              mode="outlined"
              label="To"
              left={<TextInput.Affix text="To" />}
              value={businessHours[4].openHours.endTime}
            />
          </View>
        </View>
        <Text variant="titleLarge" style={{ marginTop: 30 }}>
          Saturday
        </Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <TextInput
              mode="outlined"
              label="From"
              left={<TextInput.Affix text="From" />}
              value={businessHours[5].openHours.startTime}
            />
          </View>
          <View style={styles.col}>
            <TextInput
              mode="outlined"
              label="To"
              left={<TextInput.Affix text="To" />}
              value={businessHours[5].openHours.endTime}
            />
          </View>
        </View>
        <Text variant="titleLarge" style={{ marginTop: 30 }}>
          Sunday
        </Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <TextInput
              mode="outlined"
              label="From"
              left={<TextInput.Affix text="From" />}
              value={businessHours[6].openHours.startTime}
            />
          </View>
          <View style={styles.col}>
            <TextInput
              mode="outlined"
              label="To"
              left={<TextInput.Affix text="To" />}
              value={businessHours[6].openHours.endTime}
            />
          </View>
        </View>
        <Text variant="titleLarge" style={{ marginTop: 40 }}>
          Seating Arrangments
        </Text>
        {seatingArrangements.map((arrangement, index) => (
          <View key={arrangement._id + index} style={styles.seatingArrangement}>
            <View style={styles.col}>
              <TextInput
                mode="outlined"
                label={`Table Number`}
                keyboardType="numeric"
                value={arrangement.tableNumber.toString()}
                onChangeText={(text) =>
                  updateSeatingArrangement(arrangement.id, "tableNumber", text)
                }
              />
            </View>
            <View style={styles.col}>
              <TextInput
                mode="outlined"
                label={`Table Capacity`}
                keyboardType="numeric"
                value={arrangement.tableCapacity.toString()}
                onChangeText={(text) =>
                  updateSeatingArrangement(
                    arrangement.id,
                    "tableCapacity",
                    text
                  )
                }
              />
            </View>
            <IconButton
              icon="delete"
              size={24}
              onPress={() => deleteArrangement(arrangement.id)}
              style={styles.deleteButton}
            />
          </View>
        ))}
        <Button
          mode="outlined"
          onPress={addNewSeatingArrangement}
          style={styles.addButton}
        >
          Add New Seating Arrangement
        </Button>
        <Button
          style={{ marginTop: 40, padding: 5, borderRadius: 25 }}
          mode="contained"
          onPress={handleSignUp}
        >
          Save
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    width: "90%",
    marginBottom: 30,
  },
  textInput: {
    height: 56,
    backgroundColor: "#fff",
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 20,
  },
  col: {
    flex: 1,
    marginHorizontal: 5,
  },
  seatingArrangement: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  deleteButton: {
    marginLeft: 5,
    backgroundColor: "#f44336",
  },
  addButton: {
    marginTop: 20,
    borderRadius: 25,
  },
});
