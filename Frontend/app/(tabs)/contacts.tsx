import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ContactsView } from '@/components/ContactsView';

export default function TabContactsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ContactsView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
