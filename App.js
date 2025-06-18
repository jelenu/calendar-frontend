import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthProvider } from './contexts/AuthContext';
import RootNavigation from './navigation';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar hidden />
        <RootNavigation />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
