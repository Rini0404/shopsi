import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Props {
  route: any;
}

export default function Success({ route }: Props) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase Successful!</Text>
      <Image style={styles.image} source={{ uri: product.image }} />
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      <Text style={styles.productCategory}>Category: {product.category}</Text>
      <Text style={styles.productRating}>
        Rating: {product.rating.rate.toFixed(1)} ({product.rating.count} ratings)
      </Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.arriving}>
        Your order will arrive in 3-5 business days.
      </Text>
      <Text style={styles.thankYou}>
        Thank you for your purchase!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444444',
  },
  productPrice: {
    fontSize: 16,
    color: '#FF5722',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 5,
    color: '#777777',
  },
  productRating: {
    fontSize: 14,
    marginBottom: 10,
    color: '#777777',
  },
  productDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#444444',
  },
  arriving: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#4CAF50',
  },
  thankYou: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

