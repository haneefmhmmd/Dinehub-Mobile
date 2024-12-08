import { router, Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import ScreenHeaderBtn from "../../components/header/ScreenHeaderBtn";
import { COLORS, icons, images, SIZES } from "../../constants";

export default function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const router = useRouter();
  const handleSignUp = async () => {
    const payload = {
      name,
      businessEmail: email,
      password,
      contactNumber,
    };
    console.log("Sending Req...");
    const response = await fetch("http://localhost:3000/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    console.log("Res: ", data);
    if (response.ok) {
      router.navigate("login");
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
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.chevronLeft}
              dimension="60%"
              handlePress={() => {
                router.navigate("");
              }}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.user} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.section}>
        <Text
          variant="displaySmall"
          style={{ marginTop: 50, textAlign: "center" }}
        >
          Discover. Connect. Delight!
        </Text>

        <Text
          variant="titleMedium"
          style={{ marginTop: 20, textAlign: "center", color: COLORS.gray200 }}
        >
          Where diners and restaurateurs unite for unforgettable experiences.
          Join our vibrant community today and embark on a culinary adventure
          like never before
        </Text>

        <TextInput
          style={styles.textInput}
          label="Restaurant Name"
          value={name}
          onChangeText={(name) => setName(name)}
        />

        <TextInput
          style={styles.textInput}
          label="Restaurant Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
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
          label="Contact Number"
          value={contactNumber}
          onChangeText={(contactNumber) => setContactNumber(contactNumber)}
        />

        <Button
          style={{ marginTop: 40, padding: 5, borderRadius: 25 }}
          mode="contained"
          onPress={handleSignUp}
        >
          Sign Up
        </Button>

        <Text
          variant="displayMedium"
          style={{ fontSize: SIZES.medium, marginTop: 50, textAlign: "center" }}
        >
          Already have an account?
        </Text>

        <Button
          mode="outlined"
          onPress={() => {
            router.navigate("/login");
          }}
        >
          Login
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
});
