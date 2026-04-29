import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Linking,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';
import { AppDataContext } from '../context/AppDataContext';

export default function ResourcesScreen() {
  const { themeColors } = useContext(ThemeContext);
  const { resources, addResource, editResource, deleteResource } = useContext(AppDataContext);

  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResourceId, setSelectedResourceId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedUrl, setEditedUrl] = useState('');

  function isValidUrl(url) {
    return url.startsWith('http://') || url.startsWith('https://');
  }

  function handleAddResource() {
    if (!resourceTitle.trim() || !resourceUrl.trim()) {
      Alert.alert('Missing Information', 'Please enter both a title and a URL.');
      return;
    }

    if (!isValidUrl(resourceUrl.trim())) {
      Alert.alert('Invalid URL', 'Please start the link with http:// or https://');
      return;
    }

    addResource(resourceTitle, resourceUrl);
    setResourceTitle('');
    setResourceUrl('');
  }

  function openEditModal(resource) {
    setSelectedResourceId(resource.id);
    setEditedTitle(resource.title);
    setEditedUrl(resource.url);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setSelectedResourceId(null);
    setEditedTitle('');
    setEditedUrl('');
  }

  function saveEdit() {
    if (!editedTitle.trim() || !editedUrl.trim()) {
      Alert.alert('Missing Information', 'Please enter both a title and a URL.');
      return;
    }

    if (!isValidUrl(editedUrl.trim())) {
      Alert.alert('Invalid URL', 'Please start the link with http:// or https://');
      return;
    }

    editResource(selectedResourceId, editedTitle, editedUrl);
    closeModal();
  }

  function confirmDeleteResource(id) {
    Alert.alert('Delete Resource', 'Are you sure you want to delete this resource?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteResource(id),
      },
    ]);
  }

  async function openLink(url) {
    try {
      const supported = await Linking.canOpenURL(url);

      if (!supported) {
        Alert.alert('Link Error', 'Could not open this resource.');
        return;
      }

      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Link Error', 'Could not open this resource.');
    }
  }

  function renderResource({ item }) {
    return (
      <View style={[styles.resourceCard, { backgroundColor: themeColors.card }]}>
        <View style={styles.resourceInfo}>
          <Text style={[styles.resourceTitle, { color: themeColors.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.resourceUrl, { color: themeColors.lightText }]}>
            {item.url}
          </Text>
        </View>

        <View style={styles.resourceButtons}>
          <Pressable
            style={[styles.actionButton, { backgroundColor: themeColors.secondary }]}
            onPress={() => openLink(item.url)}
          >
            <Ionicons name="open-outline" size={18} color={themeColors.white} />
            <Text style={styles.actionButtonText}>Open</Text>
          </Pressable>

          <Pressable
            style={[styles.iconButton, { backgroundColor: themeColors.primary }]}
            onPress={() => openEditModal(item)}
          >
            <Ionicons name="create-outline" size={18} color={themeColors.white} />
          </Pressable>

          <Pressable
            style={[styles.iconButton, { backgroundColor: themeColors.danger }]}
            onPress={() => confirmDeleteResource(item.id)}
          >
            <Ionicons name="trash-outline" size={18} color={themeColors.white} />
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.heading, { color: themeColors.text }]}>Resources</Text>
        <Text style={[styles.subheading, { color: themeColors.lightText }]}>
          Save study links and open them whenever you need them.
        </Text>

        <View style={[styles.formCard, { backgroundColor: themeColors.card }]}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: themeColors.input,
                color: themeColors.text,
              },
            ]}
            placeholder="Resource title"
            value={resourceTitle}
            onChangeText={setResourceTitle}
            placeholderTextColor={themeColors.lightText}
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: themeColors.input,
                color: themeColors.text,
              },
            ]}
            placeholder="https://example.com"
            value={resourceUrl}
            onChangeText={setResourceUrl}
            placeholderTextColor={themeColors.lightText}
            autoCapitalize="none"
          />

          <Pressable
            style={[styles.addButton, { backgroundColor: themeColors.primary }]}
            onPress={handleAddResource}
          >
            <Text style={styles.addButtonText}>Add Resource</Text>
          </Pressable>
        </View>

        <FlatList
          data={resources}
          keyExtractor={(item) => item.id}
          renderItem={renderResource}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: themeColors.lightText }]}>
              No resources yet. Add your first one above.
            </Text>
          }
        />

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={[styles.modalOverlay, { backgroundColor: themeColors.overlay }]}>
            <View style={[styles.modalCard, { backgroundColor: themeColors.card }]}>
              <Text style={[styles.modalTitle, { color: themeColors.text }]}>
                Edit Resource
              </Text>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: themeColors.input,
                    color: themeColors.text,
                  },
                ]}
                placeholder="Resource title"
                value={editedTitle}
                onChangeText={setEditedTitle}
                placeholderTextColor={themeColors.lightText}
              />

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: themeColors.input,
                    color: themeColors.text,
                  },
                ]}
                placeholder="https://example.com"
                value={editedUrl}
                onChangeText={setEditedUrl}
                placeholderTextColor={themeColors.lightText}
                autoCapitalize="none"
              />

              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.modalButton, { backgroundColor: themeColors.inactive }]}
                  onPress={closeModal}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Pressable>

                <Pressable
                  style={[styles.modalButton, { backgroundColor: themeColors.primary }]}
                  onPress={saveEdit}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontFamily: 'poppins-bold',
    fontSize: 28,
  },
  subheading: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 16,
  },
  formCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontFamily: 'poppins-regular',
    fontSize: 14,
    marginBottom: 12,
  },
  addButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'poppins-bold',
    color: '#FFFFFF',
    fontSize: 15,
  },
  listContent: {
    paddingBottom: 30,
  },
  resourceCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  resourceInfo: {
    marginBottom: 12,
  },
  resourceTitle: {
    fontFamily: 'poppins-bold',
    fontSize: 16,
  },
  resourceUrl: {
    fontFamily: 'poppins-regular',
    fontSize: 13,
    marginTop: 6,
  },
  resourceButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: 'poppins-bold',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontFamily: 'poppins-bold',
    fontSize: 20,
    marginBottom: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalButtonText: {
    fontFamily: 'poppins-bold',
    color: '#FFFFFF',
  },
});