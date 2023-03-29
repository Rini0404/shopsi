import { StatusBar } from "expo-status-bar";
import { MyStack } from "./Screens/MyStack";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
const PUBLISH_KEY =
  "pk_test_51MqbL3K3bd9nPur2VO8pEisR6gAgJXDhfMKnpV59mpbdcQ7LpR4x552DFVz6bqeTzZCFzzHQMoLohSbGkiJTLHDO00syWhlN4D";
  

export default function App() {
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
