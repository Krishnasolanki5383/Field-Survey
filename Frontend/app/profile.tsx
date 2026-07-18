import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>KS</Text>
        </View>
        <Text style={styles.profileName}>Krishna Solanki</Text>
        <Text style={styles.profileSub}>Student Developer</Text>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Student Details</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Course:</Text>
          <Text style={styles.detailValue}>Mobile Application Development</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Assignment:</Text>
          <Text style={styles.detailValue}>React Native Mini Project</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Project Scope:</Text>
          <Text style={styles.detailValue}>Smart Field Survey & Inspection (Modules 1 - 6)</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Expo SDK:</Text>
          <Text style={styles.detailValue}>v54.0.35</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>React Native:</Text>
          <Text style={styles.detailValue}>v0.81.5</Text>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Completed Modules</Text>
        
        <View style={styles.moduleItem}>
          <Text style={styles.moduleName}>✅ Module 1: Dashboard</Text>
          <Text style={styles.moduleDesc}>{"Custom Header, Student Info, Today's Survey Count, Quick Actions, Recent Surveys Summary"}</Text>
        </View>

        <View style={styles.moduleItem}>
          <Text style={styles.moduleName}>✅ Module 2: Create Survey</Text>
          <Text style={styles.moduleDesc}>Inputs (Site, Client, Description, Priority, Date) with validation and attached photo state</Text>
        </View>

        <View style={styles.moduleItem}>
          <Text style={styles.moduleName}>✅ Module 3: Camera</Text>
          <Text style={styles.moduleDesc}>Permission requests, Capture photo, Preview screen with timestamp, Retake, and Delete with Confirmation Alert</Text>
        </View>

        <View style={styles.moduleItem}>
          <Text style={styles.moduleName}>✅ Module 4: Location</Text>
          <Text style={styles.moduleDesc}>Permission requests, live GPS coordinates (latitude, longitude) and accuracy tracking, location refresh, copy coordinates to clipboard with success alert</Text>
        </View>

        <View style={styles.moduleItem}>
          <Text style={styles.moduleName}>✅ Module 5: Contacts</Text>
          <Text style={styles.moduleDesc}>Permission requests, load contact list with initials avatar, search filter, match count display, pull-to-refresh, click to copy phone number to clipboard, empty list screens</Text>
        </View>

        <View style={styles.moduleItem}>
          <Text style={styles.moduleName}>✅ Module 6: Clipboard</Text>
          <Text style={styles.moduleDesc}>Copy utilities (Survey ID, Contact Number, GPS location), paste clipboard text into Notes textbox, clear system clipboard action</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSub: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 13,
    color: '#333',
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  moduleItem: {
    marginBottom: 10,
  },
  moduleName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  moduleDesc: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});
