import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CalendarScreen from '../screens/calendar/CalendarScreen';

import { AuthContext } from '../contexts/AuthContext';

const AuthStack = createNativeStackNavigator(); // Stack for auth screens
const Drawer = createDrawerNavigator(); // Drawer for main app

// Auth flow: Login and Register
function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

// App flow: Calendar and Profile
function AppDrawerScreen() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

// Root navigator: shows auth or app based on token
export default function RootNavigation() {
  const { accessToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {accessToken ? <AppDrawerScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}
