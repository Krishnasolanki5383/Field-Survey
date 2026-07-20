import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useSurveys } from '@/context/SurveyContext';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabProfileScreen() {
  const { inspectorProfile } = useSurveys();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: inspectorProfile.avatar }} 
          style={styles.avatarImage} 
        />
        <Text style={styles.profileName}>{inspectorProfile.name}</Text>
        <Text style={styles.profileSub}>Student Inspector</Text>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Registration & Course Details</Text>
        
        <View style={styles.detailRow}>
          <View style={styles.detailLabelRow}>
            <Ionicons name="card-outline" size={18} color="#0F7A5E" />
            <Text style={styles.detailLabel}>Student ID:</Text>
          </View>
          <Text style={styles.detailValue}>{inspectorProfile.id}</Text>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailLabelRow}>
            <Ionicons name="school-outline" size={18} color="#0F7A5E" />
            <Text style={styles.detailLabel}>Course:</Text>
          </View>
          <Text style={styles.detailValue}>{inspectorProfile.course}</Text>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailLabelRow}>
            <Ionicons name="business-outline" size={18} color="#0F7A5E" />
            <Text style={styles.detailLabel}>Department:</Text>
          </View>
          <Text style={styles.detailValue}>{inspectorProfile.department}</Text>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailLabelRow}>
            <Ionicons name="calendar-outline" size={18} color="#0F7A5E" />
            <Text style={styles.detailLabel}>Academic Year:</Text>
          </View>
          <Text style={styles.detailValue}>{inspectorProfile.year}</Text>
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
  profileHeader: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e8ecea',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#0F7A5E',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A332B',
  },
  profileSub: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e8ecea',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A332B',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fcfcfc',
  },
  detailLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
    marginLeft: 8,
  },
  detailValue: {
    fontSize: 13,
    color: '#1A332B',
    fontWeight: 'bold',
  },
  moduleItem: {
    marginBottom: 14,
  },
  moduleName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A332B',
    marginBottom: 3,
  },
  moduleDesc: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});
