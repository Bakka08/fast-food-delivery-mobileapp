import React, { useState, useEffect } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './Screens/LoadingScreen';
import LoginScreen from './Screens/LoginSceen';
import CommandeScreen from './Screens/CommandeScreen';
import LocationScreen  from './Screens/LocationScreen';
import ProfileScreen from './Screens/ProfileSceen';
import QrScreen from './Screens/QrScreen';
import CameraScreen from './Screens/CameraScreen';

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
        <Stack.Screen name="CommandeScreen" component={CommandeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LocationScreen" component={LocationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="QrScreen" component={QrScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
