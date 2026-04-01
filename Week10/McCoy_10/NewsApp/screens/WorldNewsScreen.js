import { View, StyleSheet } from 'react-native';
import NewsList from '../components/NewsList';
import Colors from '../constants/colors';

function WorldNewsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <NewsList category="world" navigation={navigation} />
    </View>
  );
}

export default WorldNewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray100,
  },
});