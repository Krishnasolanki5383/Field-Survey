import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useSurveys } from '@/context/SurveyContext';

export default function CameraScreen() {
  const router = useRouter();
  const { setCurrentPhoto } = useSurveys();
  
  // Camera Permissions
  const [permission, requestPermission] = useCameraPermissions();
  
  // Camera Ref and States
  const cameraRef = useRef<any>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [captureTime, setCaptureTime] = useState<string | null>(null);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);

  // 1. Loading state while checking permissions (opening camera)
  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Opening Camera...</Text>
      </View>
    );
  }

  // 2. Permission is not granted yet
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>Camera Permission Required</Text>
        <Text style={styles.permissionDescription}>
          We need access to your camera to capture site inspection photos.
        </Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  // 3. Take Photo Action
  const handleCapture = async () => {
    if (cameraRef.current && !isTakingPhoto) {
      try {
        setIsTakingPhoto(true);
        const options = { quality: 0.8, skipProcessing: false };
        const photo = await cameraRef.current.takePictureAsync(options);
        
        if (photo && photo.uri) {
          const timestamp = new Date().toLocaleString();
          setCapturedPhoto(photo.uri);
          setCaptureTime(timestamp);
        }
      } catch (error) {
        Alert.alert('Capture Error', 'Failed to take photo: ' + error);
      } finally {
        setIsTakingPhoto(false);
      }
    }
  };

  // 4. Retake Photo Action
  const handleRetake = () => {
    setCapturedPhoto(null);
    setCaptureTime(null);
  };

  // 5. Delete Photo Action (with confirmation)
  const handleDelete = () => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setCapturedPhoto(null);
            setCaptureTime(null);
            Alert.alert('Deleted', 'Photo has been deleted.');
          },
        },
      ]
    );
  };

  // 6. Confirm and Attach Photo to Survey
  const handleAttach = () => {
    if (capturedPhoto && captureTime) {
      setCurrentPhoto({
        uri: capturedPhoto,
        timestamp: captureTime,
      });
      Alert.alert(
        'Photo Attached',
        'Photo is successfully attached. Complete your survey details now!',
        [
          {
            text: 'Go to Survey Form',
            onPress: () => router.push('/survey'),
          },
        ]
      );
    }
  };

  // Render Preview state if photo is captured
  if (capturedPhoto) {
    return (
      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>Photo Preview</Text>
        
        <Image source={{ uri: capturedPhoto }} style={styles.previewImage} />
        
        <Text style={styles.timestampText}>Captured on: {captureTime}</Text>

        <View style={styles.previewActions}>
          <Pressable style={[styles.previewButton, styles.attachButton]} onPress={handleAttach}>
            <Text style={styles.previewButtonText}>Attach to Survey</Text>
          </Pressable>

          <Pressable style={[styles.previewButton, styles.retakeButton]} onPress={handleRetake}>
            <Text style={styles.previewButtonText}>Retake</Text>
          </Pressable>

          <Pressable style={[styles.previewButton, styles.deleteButton]} onPress={handleDelete}>
            <Text style={styles.previewButtonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // Render Camera state
  return (
    <View style={styles.cameraContainer}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.cameraOverlay}>
          {isTakingPhoto && (
            <View style={styles.photoLoadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.captureLoadingText}>Capturing...</Text>
            </View>
          )}
          
          <View style={styles.controlsContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.captureButton,
                pressed && styles.captureButtonPressed,
              ]}
              onPress={handleCapture}
              disabled={isTakingPhoto}
            >
              <View style={styles.captureButtonInner} />
            </Pressable>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  permissionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  photoLoadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureLoadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  controlsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonPressed: {
    opacity: 0.7,
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  previewImage: {
    width: '100%',
    height: '60%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    resizeMode: 'cover',
  },
  timestampText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 15,
    fontWeight: 'bold',
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  previewButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
  },
  previewButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  attachButton: {
    backgroundColor: '#28a745',
  },
  retakeButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
});
