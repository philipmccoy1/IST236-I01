import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { NEWS } from '../data/dummy-data';
import { BookmarksContext } from '../store/context/bookmarks-context';
import NewsList from '../components/NewsList';
import Colors from '../constants/colors';

function BookmarkedNewsScreen({ navigation }) {
  const bookmarksCtx = useContext(BookmarksContext);

  const bookmarkedNews = NEWS.filter((newsItem) =>
    bookmarksCtx.ids.includes(newsItem.id)
  );

  if (bookmarkedNews.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No bookmarked news found.</Text>
      </View>
    );
  }

  return <NewsList items={bookmarkedNews} navigation={navigation} />;
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
  message: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 18,
    color: Colors.gray700,
    textAlign: 'center',
  },
});