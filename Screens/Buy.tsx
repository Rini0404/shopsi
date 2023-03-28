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

  console.log("Buy.tsx: ", product);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemImageContainer}>
        <Image style={styles.itemImage} source={{ uri: product.image }} />
      </View>

      <View style={ styles.itemInfo }>
          {/* <price */}

          <Text style={styles.price}>
            ${product.price}
          </Text>



          <Text style={styles.itemTitle}>
            {product.title}
          </Text>
          <Text style = { styles.description }>
            {product.description} 
          </Text>
      </View> 
      <BuyButton product={ product } />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "khaki",
  },
  price: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
  itemImageContainer: {
    borderRadius: 100,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  description: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  itemTitle: {
    fontSize: 20,
    color: "black",
    // underline dash dot double-underline
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  itemImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  itemInfo: {
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
});

export default Buy;
