import React, { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { ApplePayButton, useStripe } from "@stripe/stripe-react-native";

const SECRET =
  "sk_test_51MqbL3K3bd9nPur2RLO7F977ZBJCniuitH6MpfQTGGyqi4NDaSU1b4JkU1EWjHHUmLedootwBZXHohNYo1wB5Mm200cVsl8PKz";
const PUBLISH_KEY =
  "pk_test_51MqbL3K3bd9nPur2VO8pEisR6gAgJXDhfMKnpV59mpbdcQ7LpR4x552DFVz6bqeTzZCFzzHQMoLohSbGkiJTLHDO00syWhlN4D";
const API_URL = "https://ImaginaryPlasticIntelligence.rini0404.repl.co";

type Props = {
  product: any;
};

const BuyButton: React.FC<Props> = ({ product }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, ephemeralKey, customer, publishableKey} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams();

    console.log("TEST: ", paymentIntent, ephemeralKey, customer, publishableKey, "TEST")

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
      applePay: {
        merchantCountryCode: 'US',
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  
  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <ApplePayButton
      onPress={openPaymentSheet}
      type="plain"
      buttonStyle="black"
      borderRadius={4}
      style={styles.payButton}
    />
  );
};

const styles = StyleSheet.create({
  payButton: {
    width: 200,
    height: 50,
    margin: 10,
  },
});

export default BuyButton;
