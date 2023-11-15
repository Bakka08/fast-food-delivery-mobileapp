import React, { useState, useEffect } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './Screens/LoadingScreen';
import LoginScreen from './Screens/LoginSceen';
import SignupScreen from './Screens/SignupScreen';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileSceen';
import SearchCategoriesScreen from './Screens/SearchCategoriesScreen';
import SearchRestaurantsScreen from './Screens/SearchRestaurantsScreen';
import CommandeScreen from './Screens/CommandeScreen';
import LocationScreen  from './Screens/LocationScreen';
import MealsByRestaurant from './Screens/MealsByRestaurant';
import QrScreen from './Screens/QrScreen';

const Stack = createStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const delay = 3000; 
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {isLoading ? (
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        )}

        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SearchCategoriesScreen" component={SearchCategoriesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SearchRestaurantsScreen" component={SearchRestaurantsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CommandeScreen" component={CommandeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LocationScreen" component={LocationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MealsByRestaurant" component={MealsByRestaurant} options={{ headerShown: false }} />
        <Stack.Screen name="QrScreen" component={QrScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
