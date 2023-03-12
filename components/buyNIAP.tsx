import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import * as RNIap from 'react-native-iap';


  const itemSkus = Platform.select({
    ios: [
      'com.example.coins100',
      'com.example.coins500',
      'com.example.coins1000',
      'com.example.coins2000',
      'com.example.coins5000',
      'com.example.coins10000',
    ],
    android: [
      'com.example.coins100',
      'com.example.coins500',
      'com.example.coins1000',

    ],
  });

  type Product = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    rating: { count: number; rate: number };
    title: string;
  };



export default function buyNIAP() {


  const purchaseItem = async () => {
    try {
      const purchase = await RNIap.requestPurchase(itemSkus[0]);
      console.log(purchase);
      // Handle successful purchase
    } catch (err) {
      console.log(err.code, err.message);
      // Handle failed purchase
    }
  }
  


  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={ purchaseItem }
        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: 'white' }}>Buy</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
