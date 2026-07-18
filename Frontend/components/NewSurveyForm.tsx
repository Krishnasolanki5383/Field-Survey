import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSurveys } from '@/context/SurveyContext';

export function NewSurveyForm() {
  const router = useRouter();
  const { addSurvey, currentPhoto, setCurrentPhoto } = useSurveys();

  const [siteName, setSiteName] = useState('');
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [date, setDate] = useState('');

  // Default to today's date when component mounts
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const handleSubmit = () => {
    // Validate Required Fields
    if (!siteName.trim() || !clientName.trim()) {
      Alert.alert('Validation Error', 'Site Name and Client Name are required fields.');
      return;
    }

    // Add Survey to Global Context
    addSurvey({
      siteName: siteName.trim(),
      clientName: clientName.trim(),
      description: description.trim(),
      priority,
      date,
    });

    Alert.alert('Success', 'Survey has been submitted successfully!', [
      {
        text: 'OK',
        onPress: () => {
          // Reset form fields
          setSiteName('');
          setClientName('');
          setDescription('');
          setPriority('Medium');
          // Navigate to Home/Dashboard
          router.push('/(tabs)');
        },
      },
    ]);
  };

  const handleRemovePhoto = () => {
    Alert.alert('Remove Photo', 'Are you sure you want to remove the attached photo?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => setCurrentPhoto(null) },
    ]);
  };

  return (
    <ScrollView style={styles.formContainer} keyboardShouldPersistTaps="handled">
      <Text style={styles.formTitle}>New Survey & Inspection</Text>

      {/* Site Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Site Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter site location / name"
          value={siteName}
          onChangeText={setSiteName}
        />
      </View>

      {/* Client Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Client Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter client company/person"
          value={clientName}
          onChangeText={setClientName}
        />
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter survey details / notes"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Priority */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Priority</Text>
        <View style={styles.priorityContainer}>
          {['Low', 'Medium', 'High'].map((level) => (
            <Pressable
              key={level}
              style={[
                styles.priorityButton,
                priority === level && styles.selectedPriorityButton,
                priority === level && level === 'High' && styles.highPriority,
                priority === level && level === 'Medium' && styles.mediumPriority,
                priority === level && level === 'Low' && styles.lowPriority,
              ]}
              onPress={() => setPriority(level)}
            >
              <Text
                style={[
                  styles.priorityButtonText,
                  priority === level && styles.selectedPriorityText,
                ]}
              >
                {level}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Date */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Survey Date (YYYY-MM-DD)</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
        />
      </View>

      {/* Attached Photo Section */}
      <View style={styles.photoSection}>
        <Text style={styles.label}>Photo Attachment</Text>
        {currentPhoto ? (
          <View style={styles.photoContainer}>
            <Image source={{ uri: currentPhoto.uri }} style={styles.previewImage} />
            <View style={styles.photoDetails}>
              <Text style={styles.photoTimeText}>Taken: {currentPhoto.timestamp}</Text>
              <Pressable style={styles.removePhotoButton} onPress={handleRemovePhoto}>
                <Text style={styles.removePhotoText}>Remove Photo</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.noPhotoBox}>
            <Text style={styles.noPhotoText}>No photo attached.</Text>
            <Pressable
              style={styles.goToCameraButton}
              onPress={() => router.push('/camera')}
            >
              <Text style={styles.goToCameraText}>Open Camera to Capture</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Submit Button */}
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Survey</Text>
      </Pressable>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#fafafa',
  },
  priorityButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  selectedPriorityButton: {
    borderColor: '#007AFF',
  },
  selectedPriorityText: {
    color: '#fff',
  },
  highPriority: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  mediumPriority: {
    backgroundColor: 'orange',
    borderColor: 'orange',
  },
  lowPriority: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  photoSection: {
    marginVertical: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fdfdfd',
  },
  photoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 15,
  },
  photoDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  photoTimeText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  removePhotoButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  removePhotoText: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noPhotoBox: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  noPhotoText: {
    fontSize: 13,
    color: '#777',
    marginBottom: 8,
  },
  goToCameraButton: {
    backgroundColor: '#e6f2ff',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#b3d7ff',
  },
  goToCameraText: {
    color: '#007AFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
