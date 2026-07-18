import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import { useSurveys, Survey } from '@/context/SurveyContext';

export default function HistoryScreen() {
  const { surveys, deleteSurvey } = useSurveys();
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredSurveys = surveys.filter((survey) => {
    const matchesSearch =
      survey.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      survey.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority =
      priorityFilter === 'All' || survey.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Survey',
      'Are you sure you want to delete this survey record?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteSurvey(id);
            Alert.alert('Deleted', 'Survey record has been deleted.');
          },
        },
      ]
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item }: { item: Survey }) => {
    const isExpanded = expandedId === item.id;

    return (
      <View style={styles.surveyCard}>
        <Pressable onPress={() => toggleExpand(item.id)} style={styles.cardHeader}>
          <View style={styles.headerInfo}>
            <Text style={styles.siteName}>{item.siteName}</Text>
            <Text style={styles.clientName}>Client: {item.clientName}</Text>
          </View>
          <View style={styles.headerMeta}>
            <Text
              style={[
                styles.priorityBadge,
                {
                  backgroundColor:
                    item.priority === 'High'
                      ? '#ffebe6'
                      : item.priority === 'Medium'
                      ? '#fff3e6'
                      : '#e6ffe6',
                  color:
                    item.priority === 'High'
                      ? 'red'
                      : item.priority === 'Medium'
                      ? 'orange'
                      : 'green',
                },
              ]}
            >
              {item.priority}
            </Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        </Pressable>

        {isExpanded && (
          <View style={styles.expandedDetails}>
            <Text style={styles.detailLabel}>Description:</Text>
            <Text style={styles.detailText}>
              {item.description || 'No description provided.'}
            </Text>

            {item.photoUri ? (
              <View style={styles.photoContainer}>
                <Text style={styles.detailLabel}>Survey Photo:</Text>
                <Image source={{ uri: item.photoUri }} style={styles.surveyPhoto} />
                {item.photoTime && (
                  <Text style={styles.photoTime}>Taken on: {item.photoTime}</Text>
                )}
              </View>
            ) : (
              <Text style={styles.noPhotoText}>No photo attached to this survey.</Text>
            )}

            <Pressable
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete Survey</Text>
            </Pressable>
          </View>
        )}

        {!isExpanded && (
          <Pressable onPress={() => toggleExpand(item.id)} style={styles.expandHint}>
            <Text style={styles.expandHintText}>Tap to view details</Text>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Survey History</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by site or client name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterContainer}>
        {['All', 'Low', 'Medium', 'High'].map((p) => (
          <Pressable
            key={p}
            style={[
              styles.filterTab,
              priorityFilter === p && styles.activeFilterTab,
            ]}
            onPress={() => setPriorityFilter(p)}
          >
            <Text
              style={[
                styles.filterTabText,
                priorityFilter === p && styles.activeFilterTabText,
              ]}
            >
              {p}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredSurveys}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No matching surveys found.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  title: {
    fontSize: 20,
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
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  filterTab: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  activeFilterTab: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterTabText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  activeFilterTabText: {
    color: '#fff',
  },
  listContent: {
    paddingBottom: 20,
  },
  surveyCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  headerInfo: {
    flex: 1,
    marginRight: 10,
  },
  siteName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  clientName: {
    fontSize: 13,
    color: '#666',
  },
  headerMeta: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    fontSize: 11,
    fontWeight: 'bold',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 11,
    color: '#888',
  },
  expandHint: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 6,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  expandHintText: {
    fontSize: 11,
    color: '#007AFF',
  },
  expandedDetails: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fcfcfc',
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 3,
    marginTop: 5,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 10,
  },
  photoContainer: {
    marginVertical: 10,
  },
  surveyPhoto: {
    width: '100%',
    height: 180,
    borderRadius: 6,
    marginTop: 5,
    resizeMode: 'cover',
  },
  photoTime: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
  noPhotoText: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginVertical: 8,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 15,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
  },
});
