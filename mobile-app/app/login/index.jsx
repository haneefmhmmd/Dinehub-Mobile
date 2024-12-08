import { View, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { COLORS, icons, images, SIZES } from "../../constants";
import { Text, TextInput, Button } from 'react-native-paper';
import { Stack, router } from "expo-router";
import { storeLoginData } from "../../components/common/secureStorage/secureStorage";
import ScreenHeaderBtn from "../../components/header/ScreenHeaderBtn";

export default function Index() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  const handleLogin = async () => {
    
    setError("");
    
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true); 

    try {
      const response = await fetch("http://localhost:3000/restaurant/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ businessEmail: email, password: password })
      });

      const data = await response.json();

      if (response.ok) {
        storeLoginData(data);
        router.push("/dashboard");
      } else {
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Error during login:", error);

    } finally {
      setLoading(false);
    }
  };


  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, alignItems: "center"  }}>

      <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.chevronLeft}
                dimension="60%"
                handlePress={() => {
                  router.navigate("")
                }}
              />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={icons.user} dimension="60%" />
            ),
            headerTitle: "",
          }}
        />

      <Text variant="displaySmall" style={{ marginTop: 50}}>Welcome back!</Text>

      <Text variant="titleMedium" style={{ marginTop: 20, width: "80%", textAlign: "center", color: COLORS.gray200}}>Log in to your account and access a world of dining and business opportunities. Join our community today</Text>

      <View style={styles.section} >

        <TextInput
          style={styles.textInput}
          label="Email"
          value={email}
          onChangeText={email => setEmail(email)}
        />

        <TextInput
          style={styles.textInput}
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={password => setPassword(password)}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button
          style={{ marginTop: 40, padding: 5, borderRadius: 25 }}
          mode="contained"
          onPress={handleLogin}
          loading={loading}
        >
          Login
        </Button>

      </View>

       <Text variant="displayMedium" style={{ fontSize: SIZES.medium, marginTop: 50}}>Don't have an account?</Text>

        <Button mode="outlined" onPress={() => { router.navigate("/signup") }}>
          Sign Up
        </Button>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 30,
    width: "90%"
  },
  textInput: {
    height: 56,
    backgroundColor: "#fff",
    marginTop: 30
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  }
});
