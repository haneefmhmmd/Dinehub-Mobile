//@ts-ignore
global.__reanimatedWorkletInit = () => {};

import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
//import Icon from 'react-native-vector-icons/MaterialIcons'; // For the dropdown icon

const AddMenuItemScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const categories = [
    { label: 'Appetizers', value: 'appetizers' },
    { label: 'Main Course', value: 'main_course' },
    { label: 'Desserts', value: 'desserts' },
    { label: 'Beverages', value: 'beverages' },
  ];

  const handleSave = () => {
    console.log('Menu Item Saved:', { name, description, category, price, imageUrl });

    // Add your save logic here

    // Reset form fields after save
    setName('');
    setDescription('');
    setCategory('');
    setPrice('');
    setImageUrl('');
  };

  const handleCancel = () => {
    console.log('Canceled');
    // Add your cancel logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Menu Item</Text>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelIcon}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Name Field */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        {/* Description Field */}
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        {/* Category Dropdown */}
        <RNPickerSelect
          placeholder={{ label: 'Select Category', value: null }}
          items={categories}
          onValueChange={(value) => setCategory(value)}
          value={category}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false} // Disable the default Android picker style
        />

        {/* Price Field */}
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* Image URL Field */}
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={imageUrl}
          onChangeText={setImageUrl}
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cancelIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Black
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#FFD700', // Yellow color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Custom styles for the picker
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  inputIOS: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  iconContainer: {
    top: 10,
    right: 10,
  },
});

export default AddMenuItemScreen;
