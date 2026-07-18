import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Location from 'expo-location';

export default function ClipboardScreen() {
  const [pastedNotes, setPastedNotes] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Helper strings to copy
  const SAMPLE_SURVEY_ID = 'SRV-2026-78945-DT';
  const SAMPLE_CONTACT_NUM = '+91 98765 43210';

  const handleCopySurveyID = async () => {
    await Clipboard.setStringAsync(SAMPLE_SURVEY_ID);
    Alert.alert('Copied', `Survey ID "${SAMPLE_SURVEY_ID}" copied to clipboard!`);
  };

  const handleCopyContactNumber = async () => {
    await Clipboard.setStringAsync(SAMPLE_CONTACT_NUM);
    Alert.alert('Copied', `Contact Number "${SAMPLE_CONTACT_NUM}" copied to clipboard!`);
  };

  const handleCopyLocation = async () => {
    try {
      setLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // Fallback to a default string if permission denied
        const fallbackLoc = 'Latitude: 22.3072, Longitude: 73.1812';
        await Clipboard.setStringAsync(fallbackLoc);
        Alert.alert(
          'Copied (Default)',
          `Location permission denied. Copied default coordinates: "${fallbackLoc}"`
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const locStr = `Lat: ${location.coords.latitude.toFixed(6)}, Lon: ${location.coords.longitude.toFixed(6)}`;
      await Clipboard.setStringAsync(locStr);
      Alert.alert('Copied', `Current location "${locStr}" copied to clipboard!`);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch location to copy. Copied default: ' + error);
    } finally {
      setLoadingLocation(false);
    }
  };

  const handlePasteNotes = async () => {
    const text = await Clipboard.getStringAsync();
    if (!text) {
      Alert.alert('Clipboard Empty', 'There is no text on the clipboard to paste.');
      return;
    }
    setPastedNotes(text);
    Alert.alert('Pasted', 'Text pasted from clipboard into notes field!');
  };

  const handleClearClipboard = async () => {
    // Clear clipboard by setting it to empty string
    await Clipboard.setStringAsync('');
    Alert.alert('Cleared', 'System clipboard data has been cleared.');
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Clipboard Management</Text>
      <Text style={styles.subtitle}>Module 6 - Clipboard Utilities</Text>

      {/* Copy Actions Section */}
      <View style={styles.card}>
        <Text style={styles.sectionHeader}>Copy Utilities</Text>
        
        {/* Copy Survey ID */}
        <View style={styles.actionRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Survey ID</Text>
            <Text style={styles.valueText}>{SAMPLE_SURVEY_ID}</Text>
          </View>
          <Pressable style={styles.copyBtn} onPress={handleCopySurveyID}>
            <Text style={styles.copyBtnText}>Copy ID</Text>
          </Pressable>
        </View>

        {/* Copy Contact Number */}
        <View style={styles.actionRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Contact Number</Text>
            <Text style={styles.valueText}>{SAMPLE_CONTACT_NUM}</Text>
          </View>
          <Pressable style={styles.copyBtn} onPress={handleCopyContactNumber}>
            <Text style={styles.copyBtnText}>Copy Num</Text>
          </Pressable>
        </View>

        {/* Copy Current Location */}
        <View style={styles.actionRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Current GPS Location</Text>
            <Text style={styles.valueText}>Fetch & copy live coordinates</Text>
          </View>
          <Pressable
            style={[styles.copyBtn, styles.locationBtn]}
            onPress={handleCopyLocation}
            disabled={loadingLocation}
          >
            {loadingLocation ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.copyBtnText}>Copy GPS</Text>
            )}
          </Pressable>
        </View>
      </View>

      {/* Paste Section */}
      <View style={styles.card}>
        <Text style={styles.sectionHeader}>Paste & Edit Notes</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          placeholder="Paste text here or tap 'Paste from Clipboard' to load notes..."
          value={pastedNotes}
          onChangeText={setPastedNotes}
        />
        <View style={styles.buttonGroup}>
          <Pressable style={styles.pasteBtn} onPress={handlePasteNotes}>
            <Text style={styles.pasteBtnText}>Paste from Clipboard</Text>
          </Pressable>
          
          <Pressable style={styles.clearBtn} onPress={() => setPastedNotes('')}>
            <Text style={styles.clearBtnText}>Clear Input</Text>
          </Pressable>
        </View>
      </View>

      {/* Clipboard Clear Actions */}
      <View style={styles.card}>
        <Text style={styles.sectionHeader}>System Actions</Text>
        <Text style={styles.descText}>
          Use this button to completely empty the system-wide clipboard.
        </Text>
        <Pressable style={styles.systemClearBtn} onPress={handleClearClipboard}>
          <Text style={styles.systemClearBtnText}>Clear System Clipboard</Text>
        </Pressable>
      </View>
      
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
    marginTop: 2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#007AFF',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 6,
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  infoBlock: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 2,
  },
  valueText: {
    fontSize: 14,
    color: '#333',
  },
  copyBtn: {
    backgroundColor: '#28a745',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  locationBtn: {
    backgroundColor: '#007AFF',
  },
  copyBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fafafa',
    height: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pasteBtn: {
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1.5,
    alignItems: 'center',
    marginRight: 8,
  },
  pasteBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  clearBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    alignItems: 'center',
  },
  clearBtnText: {
    color: '#555',
    fontSize: 13,
    fontWeight: 'bold',
  },
  descText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  systemClearBtn: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  systemClearBtnText: {
    color: 'red',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
