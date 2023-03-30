import { StatusBar } from "expo-status-bar";
import { MyStack } from "./Screens/MyStack";
import { StripeProvider } from "@stripe/stripe-react-native";
const PUBLISH_KEY =
  "";
  

export default function App() {
  return (
    <>
      <StripeProvider
        publishableKey={PUBLISH_KEY}
        urlScheme="http://localhost:5005"
      >
        <StatusBar style="auto" />
        <MyStack />
      </StripeProvider>
    </>
  );
}
