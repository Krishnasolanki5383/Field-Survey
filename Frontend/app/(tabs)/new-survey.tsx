import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NewSurveyForm } from '@/components/NewSurveyForm';

export default function NewSurveyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NewSurveyForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
