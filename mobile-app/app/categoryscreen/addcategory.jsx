import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

const AddCategoryScreen = ({ navigation }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSave = () => {
    if (categoryName.trim() === '') {
      console.log('Category name is required.');
      return;
    }
    
    const newCategory = { name: categoryName, id: Date.now() };
    console.log('New Category:', newCategory);

    // Reset the form state
    setCategoryName('');

    // Add a delay before navigating to ensure the form clears
    setTimeout(() => {
      navigation.navigate('EditCategoryScreen', { category: newCategory });
    }, 500); // Adjust the timeout duration if necessary
  };

  const handleCancel = () => {
    console.log('Canceled');
    navigation.goBack(); // Go back if needed
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Category</Text>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelIcon}>X</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Category Name"
          value={categoryName}
          onChangeText={setCategoryName}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  card: {
    width: '80%',
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
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#FFD700',
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

export default AddCategoryScreen;
