import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigator from "./src/navigation/DrawerNavigator";
import LoginScreen from "./src/screens/LoginScreen";
import OnBoarding from "./src/components/OnBoarding";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerLeft: ()=> null
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="DrawerHome" component={DrawerNavigator} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

