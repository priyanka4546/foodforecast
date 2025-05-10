//GroceryItem.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

export default function GroceryItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  // Validate if quantity is a valid number
  const isValidQuantity = (qty) => {
    return !isNaN(qty) && qty > 0;
  };

  // Handle updating the quantity
  const handleUpdate = async () => {
    if (!isValidQuantity(quantity)) {
      Alert.alert('Invalid Quantity', 'Please enter a valid number for quantity.');
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(db, 'groceries', item.id);
      await updateDoc(docRef, { quantity: Number(quantity) });
      Alert.alert('Success', 'Grocery quantity updated!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update grocery: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting the grocery item
  const handleDelete = async () => {
    Alert.alert('Confirm Deletion', 'Are you sure you want to delete this item?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          setLoading(true);
          try {
            const docRef = doc(db, 'groceries', item.id);
            await deleteDoc(docRef);
            Alert.alert('Success', 'Item deleted!');
          } catch (error) {
            Alert.alert('Error', 'Failed to delete item: ' + error.message);
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.itemName}>{item.name}</Text>
      <TextInput
        style={styles.input}
        value={quantity.toString()}
        onChangeText={setQuantity}
        keyboardType="numeric"
        placeholder="Quantity"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <>
          <Button title="Update" onPress={handleUpdate} disabled={loading} />
          <Button title="Delete" onPress={handleDelete} color="red" disabled={loading} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3, // For Android shadow effect
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
  },
});
