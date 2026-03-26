import { Modal, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

function DestinationModal({ visible, destination, onClose }) {
  if (!destination) {
    return null;
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: destination.imageUrl }} style={styles.image} />
          <Text style={styles.title}>{destination.name}</Text>
          <Text style={styles.description}>{destination.description}</Text>
          <Pressable onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default DestinationModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 16
  },
  title: {
    fontFamily: 'montserrat-bold',
    fontSize: 22,
    color: Colors.primary700,
    marginBottom: 10,
    textAlign: 'center'
  },
  description: {
    fontFamily: 'montserrat-regular',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.darkText,
    marginBottom: 20
  },
  button: {
    backgroundColor: Colors.accent500,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12
  },
  buttonText: {
    fontFamily: 'montserrat-bold',
    fontSize: 16,
    color: Colors.primary700
  }
});