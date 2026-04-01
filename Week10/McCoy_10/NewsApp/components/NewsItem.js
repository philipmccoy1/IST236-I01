import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Colors from '../constants/colors';

function NewsItem({ headline, date, imageUrl, onPress }) {
  return (
    <View style={styles.itemOuterContainer}>
      <Pressable
        android_ripple={{ color: '#dbeafe' }}
        onPress={onPress}
        style={({ pressed }) => [styles.itemInnerContainer, pressed && styles.pressed]}
      >
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.headline} numberOfLines={2}>
            {headline}
          </Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default NewsItem;

const styles = StyleSheet.create({
  itemOuterContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    overflow: 'hidden',
  },
  itemInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    width: 115,
    height: 95,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  headline: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 15,
    color: Colors.primary700,
    marginBottom: 8,
  },
  date: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 12,
    color: Colors.gray500,
  },
});