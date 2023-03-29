import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./MyStack";
import BuyButton from "../components/buyNIAP";

type Props = {
  route: RouteProp<RootStackParamList, "Buy">;
};

const Buy = (props: Props) => {
  const { product } = props.route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemImageContainer}>
        <Image style={styles.itemImage} source={{ uri: product.image }} />
      </View>

      <View style={styles.itemInfo}>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.itemTitle}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
      <BuyButton product={product} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  price: {
    fontSize: 24,
    color: "#4CAF50",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  itemImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingTop: 20,
  },
  description: {
    fontSize: 16,
    color: "#444444",
    textAlign: "center",
    lineHeight: 24,
    marginTop: 10,
  },
  itemTitle: {
    fontSize: 20,
    color: "#333333",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  itemImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    resizeMode: "contain",
  },
  itemInfo: {
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
});

export default Buy;
