import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'; // Cambia aquí

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CalendarScreen from '../screens/calendar/CalendarScreen';

import { AuthContext } from '../contexts/AuthContext';

const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator(); // Cambia aquí

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function AppDrawerScreen() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
    </Drawer.Navigator>
  );
}

export default function RootNavigation() {
  const { accessToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {accessToken ? <AppDrawerScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}