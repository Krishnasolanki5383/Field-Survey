import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useSurveys } from '@/context/SurveyContext';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ReportsScreen() {
  const { surveys, surveyStats } = useSurveys();

  // Calculate statistics
  const totalSurveys = surveys.length;
  
  const highPriorityCount = surveys.filter(s => s.priority === 'High').length;
  const mediumPriorityCount = surveys.filter(s => s.priority === 'Medium').length;
  const lowPriorityCount = surveys.filter(s => s.priority === 'Low').length;

  // Get current date string in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  const contextSurveysToday = surveys.filter((s) => s.date === todayStr).length;

  const completedCount = surveyStats.todayCount + contextSurveysToday;
  const targetCount = surveyStats.targetCount;
  const completionPercent = Math.min(
    100,
    Math.round((completedCount / targetCount) * 100)
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Survey Analytics</Text>
        <Text style={styles.headerSubtitle}>Real-time Field Inspection Metrics</Text>
      </View>

      {/* Summary Row */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { borderLeftColor: '#2e7d32' }]}>
          <Ionicons name="checkbox-outline" size={24} color="#2e7d32" />
          <Text style={styles.statVal}>{completedCount}</Text>
          <Text style={styles.statLbl}>Completed</Text>
        </View>

        <View style={[styles.statCard, { borderLeftColor: '#0288d1' }]}>
          <Ionicons name="trending-up-outline" size={24} color="#0288d1" />
          <Text style={styles.statVal}>{targetCount}</Text>
          <Text style={styles.statLbl}>Target Surveys</Text>
        </View>

        <View style={[styles.statCard, { borderLeftColor: '#ef6c00' }]}>
          <Ionicons name="pie-chart-outline" size={24} color="#ef6c00" />
          <Text style={styles.statVal}>{completionPercent}%</Text>
          <Text style={styles.statLbl}>Progress</Text>
        </View>
      </View>

      {/* Detail Chart Mockups */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Priority Distribution</Text>
        
        {/* Progress Bar for High Priority */}
        <View style={styles.chartRow}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartLabel}>High Priority</Text>
            <Text style={styles.chartValue}>{highPriorityCount}</Text>
          </View>
          <View style={styles.progressContainer}>
            <View 
              style={[
                styles.progressBar, 
                { 
                  backgroundColor: '#d32f2f', 
                  width: `${totalSurveys > 0 ? (highPriorityCount / totalSurveys) * 100 : 0}%` 
                }
              ]} 
            />
          </View>
        </View>

        {/* Progress Bar for Medium Priority */}
        <View style={styles.chartRow}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartLabel}>Medium Priority</Text>
            <Text style={styles.chartValue}>{mediumPriorityCount}</Text>
          </View>
          <View style={styles.progressContainer}>
            <View 
              style={[
                styles.progressBar, 
                { 
                  backgroundColor: '#f57c00', 
                  width: `${totalSurveys > 0 ? (mediumPriorityCount / totalSurveys) * 100 : 0}%` 
                }
              ]} 
            />
          </View>
        </View>

        {/* Progress Bar for Low Priority */}
        <View style={styles.chartRow}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartLabel}>Low Priority</Text>
            <Text style={styles.chartValue}>{lowPriorityCount}</Text>
          </View>
          <View style={styles.progressContainer}>
            <View 
              style={[
                styles.progressBar, 
                { 
                  backgroundColor: '#388e3c', 
                  width: `${totalSurveys > 0 ? (lowPriorityCount / totalSurveys) * 100 : 0}%` 
                }
              ]} 
            />
          </View>
        </View>
      </View>

      {/* Historical Report Status Card */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Project Sync & Submission</Text>
        <View style={styles.syncRow}>
          <Ionicons name="cloud-done-outline" size={24} color="#1b5e20" />
          <View style={styles.syncDetails}>
            <Text style={styles.syncTitle}>All local data synced</Text>
            <Text style={styles.syncTime}>Last synced: Just now</Text>
          </View>
        </View>
        <View style={styles.syncRow}>
          <Ionicons name="document-text-outline" size={24} color="#0d47a1" />
          <View style={styles.syncDetails}>
            <Text style={styles.syncTitle}>Total local records</Text>
            <Text style={styles.syncTime}>{totalSurveys} surveys in database</Text>
          </View>
        </View>
      </View>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F6',
    padding: 16,
  },
  header: {
    marginVertical: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A332B',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 4,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statVal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 6,
  },
  statLbl: {
    fontSize: 10,
    color: '#777',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A332B',
    marginBottom: 16,
  },
  chartRow: {
    marginBottom: 14,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chartLabel: {
    fontSize: 13,
    color: '#555',
  },
  chartValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  syncRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  syncDetails: {
    marginLeft: 14,
  },
  syncTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  syncTime: {
    fontSize: 11,
    color: '#777',
    marginTop: 2,
  },
});
