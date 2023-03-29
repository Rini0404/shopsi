import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RootStackParamList } from "./MyStack";
import { StackNavigationProp } from "@react-navigation/stack";
export interface Product {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: { count: number; rate: number };
  title: string;
};

type ProductsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'List'>;

interface ProductsProps {
  path: string;
  navigation: ProductsScreenNavigationProp;
}

export default function Products({ path, navigation }: ProductsProps) {

  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItemList = ({ item }: { item: Product }) => {
    const chooseThisOne = () => {
      console.log("You chose: ", item.title);
      navigation.navigate(
        "Buy",
        { product: item }
      )
    };

    return (
      <TouchableOpacity style={styles.item} onPress={chooseThisOne}>
        <View style={styles.itemImageContainer}>
          <Image style={styles.itemImage} source={{ uri: item.image }} />
        </View>
        <View style={styles.itemInfoContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            Price: ${item.price}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            Category: {item.category}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            Rating: {item.rating.rate}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlashList
            data={data}
            renderItem={renderItemList}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            estimatedItemSize={160}
          />
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  item: {
    flex: 1,
    margin: 8,
    backgroundColor: "black",
    borderRadius: 10,
    height: 250,
    width: 150,
    overflow: "hidden",
  },
  itemImageContainer: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  itemImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  itemInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontSize: 10,
    color: "white",
  },
  listContainer: {
    padding: 10,
  },
});
