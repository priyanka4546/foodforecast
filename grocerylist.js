// GroceryList.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from './firebase';

export default function GroceryList() {
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch grocery data
  useEffect(() => {
    const q = query(collection(db, 'groceries'), where('userId', '==', auth.currentUser.uid));
    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGroceries(items);
        setLoading(false);
      },
      error => {
        setLoading(false);
        Alert.alert('Error', 'Failed to load groceries: ' + error.message);
      }
    );
    return () => unsubscribe();
  }, []);

  // Handle removing an item
  const handleRemove = async (id) => {
    try {
      await deleteDoc(doc(db, 'groceries', id));
      Alert.alert('Success', 'Item removed from the list');
    } catch (error) {
      Alert.alert('Error', 'Failed to remove item: ' + error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemQuantity}>Quantity: {item.quantity} pcs</Text>
      <Text style={styles.itemExpiry}>
        Expiry: {item.expiryDate ? new Date(item.expiryDate.seconds * 1000).toLocaleDateString() : 'N/A'}
      </Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.id)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : groceries.length === 0 ? (
        <Text style={styles.emptyMessage}>Your grocery list is empty. Add some items!</Text>
      ) : (
        <FlatList
          data={groceries}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemQuantity: {
    fontSize: 16,
    color: '#555',
  },
  itemExpiry: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyMessage: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});