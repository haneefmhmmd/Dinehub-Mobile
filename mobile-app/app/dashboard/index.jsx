import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { COLORS, icons, images, SIZES } from "../../constants";
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import { Stack, router } from "expo-router";
import ScreenHeaderBtn from "../../components/header/ScreenHeaderBtn";

export default function Index() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");

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


  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, alignItems: "center", marginLeft: 10, marginRight: 10  }}>
        
        <Stack.Screen
            options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => (""),
            headerRight: () => (
                <ScreenHeaderBtn
                    iconUrl={icons.chevronLeft}
                    dimension="60%"
                    handlePress={() => {
                    router.navigate("")
                    }}
                />
            ),
            headerTitle: "",
            }}
        />

        <ScrollView showsVerticalScrollIndicator={false} style={styles.section}>

            <Text variant="headlineMedium" style={{ marginTop: 50,  textAlign: "center"}}>
                Welcome to Your Restaurant Management Dashboard
            </Text>

            <Text variant="titleMedium" style={{ marginTop: 20, textAlign: "center", color: COLORS.gray200}}>
                Effortlessly manage your restaurant's information, menu, and reservations in one place
            </Text>

            <TextInput style={styles.textInput} label="Restaurant Name" value={name} onChangeText={name => setName(name)} />

            <TextInput style={styles.textInput} label="Password" secureTextEntry value={password} onChangeText={password => setPassword(password)} />

            <TextInput style={styles.textInput} label="Restaurant Email" value={email} onChangeText={email => setEmail(email)} />

            <TextInput style={styles.textInput} label="About Us" />

            <TextInput style={styles.textInput} label="Logo URL" />

            <TextInput style={styles.textInput} label="Banner URL" />

            <TextInput style={styles.textInput} label="Website URL" />

            <TextInput style={styles.textInput} label="Contact Number" value={contactNumber} onChangeText={contactNumber => setContactNumber(contactNumber)} />

            <TextInput style={styles.textInput} label="Email" />

            <TextInput style={styles.textInput} label="Cuisine" />

            <Text variant="titleLarge" style={{ marginTop: 40 }} >Address</Text>

            <TextInput style={styles.textInput} label="Street Name" />

            <TextInput style={styles.textInput} label="City" />

            <TextInput style={styles.textInput} label="Province" />

            <TextInput style={styles.textInput} label="Postal Code" />

            <TextInput style={styles.textInput} label="Country" />

            <Text variant="titleLarge" style={{ marginTop: 40 }} >Operating Hours</Text>

            <Text variant="titleSmall" style={{ marginTop: 10, color: COLORS.gray200 }} >Enter timings in 12-hour format (e.g., 09:00 AM). Use "00:00 AM" for holidays.</Text>

            <Text variant="titleLarge" style={{ marginTop: 40 }} >Monday</Text>

            <View style={styles.row}>
                <View style={styles.col}>
                    <TextInput mode="outlined" label="From" left={<TextInput.Affix text="From" />} />
                </View>
                <View style={styles.col}>
                    <TextInput mode="outlined" label="To" left={<TextInput.Affix text="To" />} />
                </View>
            </View>

            <Text variant="titleLarge" style={{ marginTop: 30 }} >Tuesday</Text>

            <View style={styles.row}>
                <View style={styles.col}>
                    <TextInput mode="outlined" label="From" left={<TextInput.Affix text="From" />} />
                </View>
                <View style={styles.col}>
                    <TextInput mode="outlined" label="To" left={<TextInput.Affix text="To" />} />
                </View>
            </View>

            <Text variant="titleLarge" style={{ marginTop: 30 }} >Wednesday</Text>

            <View style={styles.row}>
                <View style={styles.col}>
                    <TextInput mode="outlined" label="From" left={<TextInput.Affix text="From" />} />
                </View>
                <View style={styles.col}>
                    <TextInput mode="outlined" label="To" left={<TextInput.Affix text="To" />} />
                </View>
            </View>

            <Text variant="titleLarge" style={{ marginTop: 30 }} >Thursday</Text>

            <View style={styles.row}>
                <View style={styles.col}>
                    <TextInput mode="outlined" label="From" left={<TextInput.Affix text="From" />} />
                </View>
                <View style={styles.col}>
                    <TextInput mode="outlined" label="To" left={<TextInput.Affix text="To" />} />
                </View>
            </View>

            <Text variant="titleLarge" style={{ marginTop: 30 }} >Friday</Text>

            <View style={styles.row}>
                <View style={styles.col}>
                    <TextInput mode="outlined" label="From" left={<TextInput.Affix text="From" />} />
                </View>
                <View style={styles.col}>
                    <TextInput mode="outlined" label="To" left={<TextInput.Affix text="To" />} />
                </View>
            </View>

            <Text variant="titleLarge" style={{ marginTop: 30 }} >Saturday</Text>

            <View style={styles.row}>
                <View style={styles.col}>
                    <TextInput mode="outlined" label="From" left={<TextInput.Affix text="From" />} />
                </View>
                <View style={styles.col}>
                    <TextInput mode="outlined" label="To" left={<TextInput.Affix text="To" />} />
                </View>
            </View>

            <Text variant="titleLarge" style={{ marginTop: 30 }} >Sunday</Text>

            <View style={styles.row}>
                <View style={styles.col}>
                    <TextInput mode="outlined" label="From" left={<TextInput.Affix text="From" />} />
                </View>
                <View style={styles.col}>
                    <TextInput mode="outlined" label="To" left={<TextInput.Affix text="To" />} />
                </View>
            </View>

            <Text variant="titleLarge" style={{ marginTop: 40 }} >Seating Arrangments</Text>

            {seatingArrangements.map((arrangement, index) => (
                <View key={arrangement.id} style={styles.seatingArrangement}>
                    <View style={styles.col}>
                    <TextInput
                        mode="outlined"
                        label={`Table Number`}
                        keyboardType="numeric"
                        value={arrangement.tableNumber}
                        onChangeText={(text) => updateSeatingArrangement(arrangement.id, "tableNumber", text)}
                    />
                    </View>
                    <View style={styles.col}>
                    <TextInput
                        mode="outlined"
                        label={`Table Capacity`}
                        keyboardType="numeric"
                        value={arrangement.tableCapacity}
                        onChangeText={(text) => updateSeatingArrangement(arrangement.id, "tableCapacity", text)}
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

            <Button mode="outlined" onPress={addNewSeatingArrangement} style={styles.addButton}>
            Add New Seating Arrangement
            </Button>

            <Button style={{ marginTop: 40, padding: 5, borderRadius: 25 }} mode="contained" onPress={() => console.log('Log in')}>
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
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 20
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
  }
});
