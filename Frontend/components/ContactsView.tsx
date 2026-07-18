import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Clipboard from 'expo-clipboard';

interface SimpleContact {
  id: string;
  name: string;
  phone: string | null;
}

export function ContactsView() {
  const [contacts, setContacts] = useState<SimpleContact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);

  useEffect(() => {
    requestPermissionAndLoadContacts();
  }, []);

  const requestPermissionAndLoadContacts = async (isPull = false) => {
    try {
      if (isPull) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const { status } = await Contacts.requestPermissionsAsync();
      const granted = status === 'granted';
      setPermissionGranted(granted);

      if (!granted) {
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
      });

      if (data.length > 0) {
        const mappedContacts: SimpleContact[] = data.map((c) => {
          const phone =
            c.phoneNumbers && c.phoneNumbers.length > 0
              ? c.phoneNumbers[0].number || null
              : null;
          return {
            id: c.id || Math.random().toString(),
            name: c.name || 'Unnamed Contact',
            phone: phone,
          };
        });
        
        mappedContacts.sort((a, b) => a.name.localeCompare(b.name));
        setContacts(mappedContacts);
      } else {
        setContacts([]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load contacts: ' + error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyNumber = async (contact: SimpleContact) => {
    if (!contact.phone) {
      Alert.alert('No Number', `No phone number available for ${contact.name}`);
      return;
    }
    
    await Clipboard.setStringAsync(contact.phone);
    Alert.alert('Success', `Phone number for ${contact.name} copied to clipboard!`);
  };

  const getInitials = (name: string) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const renderContactItem = ({ item }: { item: SimpleContact }) => {
    const initials = getInitials(item.name);
    return (
      <Pressable
        style={({ pressed }) => [
          styles.contactCard,
          pressed && styles.contactCardPressed,
        ]}
        onPress={() => handleCopyNumber(item)}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={[styles.contactPhone, !item.phone && styles.noPhoneText]}>
            {item.phone || 'No Number'}
          </Text>
        </View>

        {item.phone && (
          <View style={styles.copyBadge}>
            <Text style={styles.copyBadgeText}>Copy</Text>
          </View>
        )}
      </Pressable>
    );
  };

  if (permissionGranted === false) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Contacts Permission Denied</Text>
        <Text style={styles.descText}>
          Please allow contacts permission in system settings to use this feature.
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => requestPermissionAndLoadContacts()}
        >
          <Text style={styles.buttonText}>Retry Permission</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts Inspector</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search contacts by name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {permissionGranted && !loading && (
        <Text style={styles.counterText}>
          {"Found " + filteredContacts.length + " of " + contacts.length + " contacts"}
        </Text>
      )}

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.statusText}>Reading Contacts...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={renderContactItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => requestPermissionAndLoadContacts(true)}
              colors={['#007AFF']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No Contacts Found</Text>
              <Text style={styles.emptyDesc}>
                {searchQuery
                  ? "No contacts match your search term."
                  : "We couldn't retrieve any contacts from your device."}
              </Text>
              <Pressable
                style={styles.retryBtn}
                onPress={() => requestPermissionAndLoadContacts()}
              >
                <Text style={styles.retryBtnText}>Reload List</Text>
              </Pressable>
            </View>
          }
        />
      )}
    </View>
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
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  counterText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  contactCardPressed: {
    backgroundColor: '#f0f8ff',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 13,
    color: '#666',
  },
  noPhoneText: {
    color: '#bbb',
    fontStyle: 'italic',
  },
  copyBadge: {
    backgroundColor: '#e6f2ff',
    borderWidth: 1,
    borderColor: '#b3d7ff',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  copyBadgeText: {
    color: '#007AFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statusText: {
    marginTop: 10,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  descText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  emptyDesc: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 18,
  },
  retryBtn: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  retryBtnText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
