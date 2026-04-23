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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constants/colors';
import { ThemeContext } from '../context/ThemeContext';

const starterResources = [
  { id: '1', title: 'Khan Academy', url: 'https://www.khanacademy.org' },
  { id: '2', title: 'Quizlet', url: 'https://quizlet.com' },
  { id: '3', title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
];

export default function ResourcesScreen() {
  const { themeColors } = useContext(ThemeContext);

  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resources, setResources] = useState(starterResources);

  function addResource() {
    if (!resourceTitle.trim() || !resourceUrl.trim()) {
      Alert.alert('Missing Information', 'Please enter both a title and a URL.');
      return;
    }

    if (
      !resourceUrl.trim().startsWith('http://') &&
      !resourceUrl.trim().startsWith('https://')
    ) {
      Alert.alert('Invalid URL', 'Please start the link with http:// or https://');
      return;
    }

    const newResource = {
      id: Date.now().toString(),
      title: resourceTitle.trim(),
      url: resourceUrl.trim(),
    };

    setResources((currentResources) => [newResource, ...currentResources]);
    setResourceTitle('');
    setResourceUrl('');
  }

  async function openLink(url) {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Link Error', 'Could not open this resource.');
    }
  }

  function renderResource({ item }) {
    return (
      <View style={[styles.resourceCard, { backgroundColor: themeColors.card }]}>
        <View style={styles.resourceInfo}>
          <Text style={[styles.resourceTitle, { color: themeColors.text }]}>{item.title}</Text>
          <Text style={[styles.resourceUrl, { color: themeColors.lightText }]}>{item.url}</Text>
        </View>

        <Pressable style={styles.openButton} onPress={() => openLink(item.url)}>
          <Ionicons name="open-outline" size={18} color={Colors.white} />
          <Text style={styles.openButtonText}>Open</Text>
        </Pressable>
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

          <Pressable style={styles.addButton} onPress={addResource}>
            <Text style={styles.addButtonText}>Add Resource</Text>
          </Pressable>
        </View>

        <FlatList
          data={resources}
          keyExtractor={(item) => item.id}
          renderItem={renderResource}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'poppins-bold',
    color: Colors.white,
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
  openButton: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.info,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  openButtonText: {
    fontFamily: 'poppins-bold',
    color: Colors.white,
    marginLeft: 6,
  },
});