import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthProvider } from './contexts/AuthContext';
import RootNavigation from './navigation';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <RootNavigation />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20, // Adjust for status bar height
  },
});