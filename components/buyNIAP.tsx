import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, Text, Button, View } from "react-native";
import { ApplePayButton, useStripe } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";
const API_URL = "https://ImaginaryPlasticIntelligence.rini0404.repl.co";

type Props = {
  product: any;
};

const BuyButton: React.FC<Props> = ({ product }) => {

  const navigation = useNavigation();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // send price
      body: JSON.stringify({
        items: {
          id: product.id,
          amount: product.price,
        },
      }),
    });
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      //TODO: Add redirect URL
      returnURL: "your-app://stripe-redirect",
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    navigation.navigate("Success", { product: product });

    // if (error) {
    //   Alert.alert(`Error code: ${error.code}`, error.message);
    // } else {
    //   Alert.alert("Success", "Your order is confirmed!");
    //   // PUsh to the next screen
    //   navigation.navigate("Success", { product: product });
    // }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={styles.paying}>
      <ApplePayButton
        onPress={openPaymentSheet}
        type="plain"
        buttonStyle="black"
        borderRadius={20}
        style={styles.payButton}
      />
      <Text>OR</Text>
      <Button
        onPress={openPaymentSheet}
        title="Pay with Card"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  payButton: {
    width: 200,
    height: 50,
    margin: 10,
  },
  paying: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
});

export default BuyButton;
