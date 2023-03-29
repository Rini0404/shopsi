{
  "paymentIntent": "pi_3MqlZvK3bd9nPur21AKu8qWA_secret_ds1bX8CyJVlVbMb6vvuOsPEVM",
  "ephemeralKey": "ek_test_YWNjdF8xTXFiTDNLM2JkOW5QdXIyLDJta2tDWkRTU3FKMlBJSXZFT3ZkWEZ1OWNheEtUbHc_00PXq6B041",
  "customer": "cus_NbzZBvlUYff5I5",
  "publishableKey": "pk_test_51MqbL3K3bd9nPur2VO8pEisR6gAgJXDhfMKnpV59mpbdcQ7LpR4x552DFVz6bqeTzZCFzzHQMoLohSbGkiJTLHDO00syWhlN4D"
}

import React, { useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { MyStack } from "./Screens/MyStack";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
const PUBLISH_KEY =
  "pk_test_51MqbL3K3bd9nPur2VO8pEisR6gAgJXDhfMKnpV59mpbdcQ7LpR4x552DFVz6bqeTzZCFzzHQMoLohSbGkiJTLHDO00syWhlN4D";

interface RouteParams {
  params: any;
  url: string;
  key: string;
  name: string;
}

export default function App() {
  const route = useRoute<RouteParams>();

  const { handleURLCallback } = useStripe();

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );

  useEffect(() => {
    handleDeepLink(route.params.url);
  }, [handleDeepLink, route.params.url]);

  return (
    <>
      <StripeProvider
        publishableKey={PUBLISH_KEY}
        merchantIdentifier="acct_1MqbL3K3bd9nPur2"
        urlScheme="https://ImaginaryPlasticIntelligence.rini0404.repl.co"
      >
        <StatusBar style="auto" />
        <MyStack />
      </StripeProvider>
    </>
  );
}