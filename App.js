import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {StyleSheet, Text, View, TextInput, Pressable, Modal, Keyboard, TouchableWithoutFeedback} from 'react-native';

import responses from './MagicEightBallResponses';

export default function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function handleSubmit() {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setResponse('Please type a question first');
      setModalVisible(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * responses.length);
    const randomResponse = responses[randomIndex];

    setResponse(randomResponse);
    setModalVisible(true);
    Keyboard.dismiss();
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>🎱 Magic Eight Ball</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Ask a yes/no question:</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g., Is Mrs. Timmons the best?"
            placeholderTextColor="#94a3b8"
            value={question}
            onChangeText={setQuestion}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Ask</Text>
          </Pressable>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Your Question</Text>
              <Text style={styles.modalText}>
                {question.trim() ? question.trim() : '—'}
              </Text>

              <Text style={styles.modalTitle}>Magic Eight Ball Says</Text>
              <Text style={styles.responseText}>{response}</Text>

              <Pressable style={styles.closeButton} onPress={handleCloseModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <StatusBar style="light" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 18,
  },

  card: {
    width: '100%',
    backgroundColor: '#111b2f',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#24304f',
  },

  label: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#64748b',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    color: '#0f172a',
  },

  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalView: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 6,
    color: '#0f172a',
  },

  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    color: '#0f172a',
  },

  responseText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#2563eb',
    textAlign: 'center',
    marginBottom: 18,
  },

  closeButton: {
    backgroundColor: '#0f172a',
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16,
  },
});