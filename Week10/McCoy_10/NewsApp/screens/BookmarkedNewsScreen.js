import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

function BookmarkedNewsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarked News</Text>
      <Text style={styles.subtitle}>This screen will be populated next week.</Text>
    </View>
  );
}

export default BookmarkedNewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 22,
    color: Colors.primary700,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 15,
    color: Colors.gray700,
    textAlign: 'center',
  },
});