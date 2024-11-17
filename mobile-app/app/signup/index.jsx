import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { COLORS, icons, images, SIZES } from "../../constants";
import { Text, TextInput, Button } from 'react-native-paper';
import ScreenHeaderBtn from "../../components/header/ScreenHeaderBtn";
import { Stack, router } from "expo-router";

export default function Index() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, alignItems: "center", marginLeft: 10, marginRight: 10  }}>

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

      <ScrollView showsVerticalScrollIndicator={false} style={styles.section}>

        <Text variant="displaySmall" style={{ marginTop: 50,  textAlign: "center"}}>Discover. Connect. Delight!</Text>

        <Text variant="titleMedium" style={{ marginTop: 20, textAlign: "center", color: COLORS.gray200}}>
        Where diners and restaurateurs unite for unforgettable experiences. Join our vibrant community today and embark on a culinary adventure like never before
        </Text>

        <TextInput
          style={styles.textInput}
          label="Restaurant Name"
          value={name}
          onChangeText={name => setName(name)}
        />

        <TextInput
          style={styles.textInput}
          label="Restaurant Email"
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

        <TextInput
          style={styles.textInput}
          label="Contact Number"
          value={contactNumber}
          onChangeText={contactNumber => setContactNumber(contactNumber)}
        />

        <Button style={{ marginTop: 40, padding: 5, borderRadius: 25 }} mode="contained" onPress={() => console.log('Log in')}>
          Sign Up
        </Button>

        <Text variant="displayMedium" style={{ fontSize: SIZES.medium, marginTop: 50}}>Already have an account?</Text>

        <Button mode="outlined" onPress={() => console.log('Sign Up')}>
          Sign Up
        </Button>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    width: "90%",
    marginBottom: 30
  },
  textInput: {
    height: 56,
    backgroundColor: "#fff",
    marginTop: 30
  }
});
