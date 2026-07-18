import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSurveys } from '@/context/SurveyContext';

export default function DashboardScreen() {
  const router = useRouter();
  const { surveys } = useSurveys();

  // Get current date string in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Count surveys created today
  const todayCount = surveys.filter((s) => s.date === todayStr).length;

  // Get recent 3 surveys
  const recentSurveys = surveys.slice(0, 3);

  return (
    <ScrollView style={styles.container}>
      {/* Custom App Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Field Survey & Inspection</Text>
        <Text style={styles.headerSubtitle}>Class Assignment Project</Text>
      </View>

      {/* Student Details Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Student Details</Text>
        <Text style={styles.cardText}>Name: Krishna Solanki</Text>
        <Text style={styles.cardText}>Project: Smart Field Survey App</Text>
        <Text style={styles.cardText}>Status: Developer (Module 1 - 6)</Text>
      </View>

      {/* Today's Survey Count */}
      <View style={[styles.card, styles.countCard]}>
        <Text style={styles.countTitle}>{"Today's Surveys"}</Text>
        <Text style={styles.countNumber}>{todayCount}</Text>
        <Text style={styles.countSubtitle}>Total Saved Surveys: {surveys.length}</Text>
      </View>

      {/* Quick Action Cards */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsContainer}>
        <Pressable
          style={styles.actionButton}
          onPress={() => router.push('/new-survey')}
        >
          <Text style={styles.actionButtonText}>Create Survey</Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => router.push('/camera')}
        >
          <Text style={styles.actionButtonText}>Open Camera</Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => router.push('/history')}
        >
          <Text style={styles.actionButtonText}>Survey History</Text>
        </Pressable>
      </View>

      {/* Recent Survey Summary */}
      <Text style={styles.sectionTitle}>Recent Surveys</Text>
      {recentSurveys.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.emptyText}>No surveys created yet.</Text>
        </View>
      ) : (
        recentSurveys.map((survey) => (
          <Pressable
            key={survey.id}
            style={styles.surveyItem}
            onPress={() => router.push('/history')}
          >
            <View style={styles.surveyHeader}>
              <Text style={styles.surveySiteName}>{survey.siteName}</Text>
              <Text
                style={[
                  styles.priorityText,
                  {
                    color:
                      survey.priority === 'High'
                        ? 'red'
                        : survey.priority === 'Medium'
                        ? 'orange'
                        : 'green',
                  },
                ]}
              >
                {survey.priority}
              </Text>
            </View>
            <Text style={styles.surveyText}>Client: {survey.clientName}</Text>
            <Text style={styles.surveyText}>Date: {survey.date}</Text>
            {survey.photoUri && (
              <Text style={styles.photoIndicator}>📷 Photo Attached</Text>
            )}
          </Pressable>
        ))
      )}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#e0e0e0',
    fontSize: 14,
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  countCard: {
    alignItems: 'center',
    backgroundColor: '#e6f2ff',
    borderColor: '#b3d7ff',
  },
  countTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0056b3',
  },
  countNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    marginVertical: 10,
  },
  countSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  surveyItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  surveyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  surveySiteName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  surveyText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  photoIndicator: {
    fontSize: 12,
    color: '#28a745',
    marginTop: 5,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});
