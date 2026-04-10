import { View, StyleSheet } from 'react-native';
import NewsList from '../components/NewsList';
import Colors from '../constants/colors';

function USNewsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <NewsList category="us" navigation={navigation} />
    </View>
  );
}

export default USNewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray100,
  },
});