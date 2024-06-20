import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import ForgotPasswordScreen from './screens/ForgotPassword';
import SignupScreen from './screens/Signup';
import LeftNavBar from './components/LeftNavBar'; // Import LeftNavBar component
import { colors } from './styles/colors'; // Adjust import path based on your project structure

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <LeftNavBar {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Example logic to check if user is logged in
    // Replace this with your actual authentication logic
    // For demonstration, set isLoggedIn to true initially
    setIsLoggedIn(true);
  }, []);

  // Handle login action
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handle logout action
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} handleLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="Home" component={HomeDrawer} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
