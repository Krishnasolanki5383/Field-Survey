import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { LocationView } from '@/components/LocationView';

export default function TabLocationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LocationView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
