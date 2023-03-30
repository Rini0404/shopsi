import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import List from "./List";
import Buy from "./Buy";
import Success from "./Success";
import { Product  } from "./List";

// Define the type for the navigation props
type RootStackParamList = {
  List: { product: Product };
  Buy: { product: Product };
  Success: { product: Product }; 
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "List">;

const Stack = createStackNavigator();

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

function HomeScreen(props: HomeScreenProps) {
  return (
    <List path="https://fakestoreapi.com/products" navigation={props.navigation} />
  );
  
}

function MyStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="List"
        screenOptions={{
          // HIDE THE HEADER
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="List"
          component={HomeScreen}
        />
        <Stack.Screen name="Buy" component={Buy} />
        <Stack.Screen name="Success" component={Success} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export {
  MyStack,
  RootStackParamList,
  HomeScreenNavigationProp,
  HomeScreenProps,
}
