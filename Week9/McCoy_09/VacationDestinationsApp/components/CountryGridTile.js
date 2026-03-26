import { View, Text, Pressable, StyleSheet, ImageBackground } from 'react-native';

function CountryGridTile({ name, color, imageUrl, onPress }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: '#cccccc' }}
        style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
        onPress={onPress}
      >
        <ImageBackground source={{ uri: imageUrl }} imageStyle={styles.image} style={[styles.innerContainer, { backgroundColor: color }]}>
          <View style={styles.overlay}>
            <Text style={styles.title}>{name}</Text>
          </View>
        </ImageBackground>
      </Pressable>
    </View>
  );
}

export default CountryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 12,
    height: 150,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 4,
    backgroundColor: 'white'
  },
  button: {
    flex: 1
  },
  buttonPressed: {
    opacity: 0.75
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  image: {
    borderRadius: 18
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingVertical: 14,
    paddingHorizontal: 10
  },
  title: {
    fontFamily: 'montserrat-bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  }
});