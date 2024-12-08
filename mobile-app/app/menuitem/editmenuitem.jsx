//@ts-ignore
global.__reanimatedWorkletInit = () => {};

import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';

const EditMenuItemScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Dummy data for the existing item (you can replace it with real data)
  const existingItem = {
    name: 'Burger',
    description: 'A delicious beef burger with cheese',
    price: '9.99',
    imageUrl: 'https://example.com/burger.jpg',
  };

  // Set existing item values
  React.useEffect(() => {
    setName(existingItem.name);
    setDescription(existingItem.description);
    setPrice(existingItem.price);
    setImageUrl(existingItem.imageUrl);
  }, []);

  const handleSave = () => {
    console.log('Menu Item Saved:', { name, description, price, imageUrl });
    // Add your save logic here

    // Reset form fields after save
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
  };

  const handleDelete = () => {
    console.log('Menu Item Deleted:', { name, description, price, imageUrl });
    // Add your delete logic here (e.g., API call to delete the item)

    // Reset form fields after delete
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
  };

  const handleCancel = () => {
    console.log('Edit Canceled');
    // Add your cancel logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Edit Menu Item</Text>
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

        {/* Delete Button */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>

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
    marginBottom: 15, // Space between Save and Delete buttons
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF6347', // Red color for delete
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditMenuItemScreen;
