 //AddGrocery.js
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from './firebase';

export default function AddGrocery() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiry, setExpiry] = useState('');
  const [loading, setLoading] = useState(false);

  // Utility function to validate expiry date
  const validateExpiryDate = (expiry) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(expiry);
  };

  // Handle adding grocery
  const handleAdd = async () => {
    // Check if fields are empty or invalid
    if (!name || !quantity) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    if (!validateExpiryDate(expiry) && expiry !== '') {
      Alert.alert('Error', 'Invalid expiry date. Please use the format YYYY-MM-DD.');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'groceries'), {
        name,
        quantity: Number(quantity),
        expiryDate: expiry ? new Date(expiry) : null,
        userId: auth.currentUser.uid,
      });

      setName('');
      setQuantity('');
      setExpiry('');

      Alert.alert('Success', 'Grocery added successfully!');
    } catch (error) {
      Alert.alert('Error', 'Error adding grocery: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Grocery</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Expiry Date (YYYY-MM-DD)"
        value={expiry}
        onChangeText={setExpiry}
        style={styles.input}
        placeholderTextColor="#999"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" style={styles.loading} />
      ) : (
        <TouchableOpacity
          style={[styles.button, (name && quantity) ? styles.buttonActive : styles.buttonDisabled]}
          onPress={handleAdd}
          disabled={loading || !name || !quantity}
        >
          <Text style={styles.buttonText}>Add Grocery</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#4A90E2',
  },
  buttonDisabled: {
    backgroundColor: '#B0C4DE',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 20,
  },
});
