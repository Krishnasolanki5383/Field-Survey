import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import * as Clipboard from 'expo-clipboard';

export function LocationView() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null);

  useEffect(() => {
    requestPermissionAndFetchLocation();
  }, []);

  const requestPermissionAndFetchLocation = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied.');
        setLoading(false);

        if (canAskAgain) {
          Alert.alert(
            'Location Permission Required',
            'Location access is required to retrieve GPS coordinates. Would you like to try again?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Retry', onPress: () => requestPermissionAndFetchLocation() }
            ]
          );
        } else {
          Alert.alert(
            'Location Permission Denied',
            'Location permission has been permanently denied. Please enable it in system settings to use this feature.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: () => Linking.openSettings() }
            ]
          );
        }
        return;
      }

      const currentLoc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(currentLoc);
    } catch (error) {
      setErrorMsg('Error fetching location: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLocation = async () => {
    if (!location) {
      Alert.alert('Error', 'No location data available to copy.');
      return;
    }
    const { latitude, longitude, accuracy } = location.coords;
    const locationString = `Latitude: ${latitude}, Longitude: ${longitude} (Accuracy: ${accuracy?.toFixed(1)}m)`;
    
    await Clipboard.setStringAsync(locationString);
    Alert.alert('Success', 'Current Location copied to clipboard!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Inspection</Text>
      
      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.statusText}>Retrieving GPS Coordinates...</Text>
        </View>
      ) : errorMsg ? (
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>{errorMsg}</Text>
          {permissionStatus !== 'granted' && (
            <Pressable style={styles.button} onPress={requestPermissionAndFetchLocation}>
              <Text style={styles.buttonText}>Grant Permission</Text>
            </Pressable>
          )}
        </View>
      ) : location ? (
        <View style={styles.detailsCard}>
          <Text style={styles.cardHeader}>Current Coordinates</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Latitude:</Text>
            <Text style={styles.value}>{location.coords.latitude.toFixed(6)}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Longitude:</Text>
            <Text style={styles.value}>{location.coords.longitude.toFixed(6)}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Accuracy:</Text>
            <Text style={styles.value}>
              {location.coords.accuracy ? `${location.coords.accuracy.toFixed(1)} meters` : 'Unknown'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Altitude:</Text>
            <Text style={styles.value}>
              {location.coords.altitude ? `${location.coords.altitude.toFixed(1)} meters` : 'N/A'}
            </Text>
          </View>

          <Text style={styles.timestamp}>
            Last updated: {new Date(location.timestamp).toLocaleTimeString()}
          </Text>

          <View style={styles.actionContainer}>
            <Pressable style={[styles.button, styles.copyBtn]} onPress={handleCopyLocation}>
              <Text style={styles.buttonText}>Copy Location</Text>
            </Pressable>

            <Pressable style={[styles.button, styles.refreshBtn]} onPress={requestPermissionAndFetchLocation}>
              <Text style={styles.buttonText}>Refresh</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.centerBox}>
          <Text style={styles.statusText}>No location data retrieved.</Text>
          <Pressable style={styles.button} onPress={requestPermissionAndFetchLocation}>
            <Text style={styles.buttonText}>Get Location</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statusText: {
    fontSize: 15,
    color: '#666',
    marginTop: 10,
  },
  errorText: {
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  timestamp: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginTop: 15,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  copyBtn: {
    backgroundColor: '#28a745',
  },
  refreshBtn: {
    backgroundColor: '#007AFF',
  },
});
