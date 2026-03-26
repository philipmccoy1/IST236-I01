import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

function DestinationItem({ destination, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      <Image source={{ uri: destination.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{destination.name}</Text>
        <Text style={styles.detail}>Average Cost: {destination.averageCost}</Text>
        <Text style={styles.detail}>Founded: {destination.yearFounded}</Text>
        <Text style={styles.detail}>User Rating: {destination.averageRating} / 5</Text>
      </View>
    </Pressable>
  );
}

export default DestinationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBg,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4
  },
  pressed: {
    opacity: 0.8
  },
  image: {
    width: 120,
    height: 120
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center'
  },
  name: {
    fontFamily: 'montserrat-bold',
    fontSize: 18,
    color: Colors.primary700,
    marginBottom: 6
  },
  detail: {
    fontFamily: 'montserrat-regular',
    fontSize: 14,
    color: Colors.darkText,
    marginBottom: 4
  }
});