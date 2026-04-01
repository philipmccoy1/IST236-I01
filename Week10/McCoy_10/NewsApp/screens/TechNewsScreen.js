import { View, StyleSheet } from 'react-native';
import NewsList from '../components/NewsList';
import Colors from '../constants/colors';

function TechNewsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <NewsList category="tech" navigation={navigation} />
    </View>
  );
}

export default TechNewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray100,
  },
});