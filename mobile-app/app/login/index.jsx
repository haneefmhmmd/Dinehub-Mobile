import { View, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { COLORS, icons, images, SIZES } from "../../constants";
import { Text, TextInput, Button } from 'react-native-paper';
import { Stack, router } from "expo-router";
import ScreenHeaderBtn from "../../components/header/ScreenHeaderBtn";

export default function Index() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
                  router.back()
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

        <Button style={{ marginTop: 40, padding: 5, borderRadius: 25 }} mode="contained" onPress={() => console.log('Log in')}>
          Login
        </Button>

      </View>

       <Text variant="displayMedium" style={{ fontSize: SIZES.medium, marginTop: 50}}>Don't have an account?</Text>

        <Button mode="outlined" onPress={() => console.log('Sign Up')}>
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
  }
});
