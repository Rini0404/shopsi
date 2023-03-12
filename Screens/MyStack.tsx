import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import List from "./List";
import Buy from "./Buy";



// Define the type for the navigation props
type RootStackParamList = {
  List: undefined;
  Buy: { product: any };
};



type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "List">;

const Stack = createStackNavigator();

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

function HomeScreen(props: HomeScreenProps) {
  const { navigation } = props;

  return (
      <List path="https://fakestoreapi.com/products" />
  );
}

type Props = {
  route: RouteProp<RootStackParamList, "Buy">;
};

function BuyScreen(props: Props) {
  return <Buy {...props} />;
}

// Use the HomeScreen component in the stack navigator
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
        <Stack.Screen name="Buy" component={BuyScreen} />
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
