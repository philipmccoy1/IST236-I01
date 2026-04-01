import { FlatList, View, Text, StyleSheet } from 'react-native';
import { NEWS } from '../data/dummy-data';
import NewsItem from './NewsItem';
import Colors from '../constants/colors';

function NewsList({ category, navigation }) {
  const displayedNews = NEWS.filter((item) => item.category === category);

  function renderNewsItem(itemData) {
    function pressHandler() {
      navigation.navigate('NewsDetail', {
        newsId: itemData.item.id,
      });
    }

    return (
      <NewsItem
        headline={itemData.item.headline}
        date={itemData.item.date}
        imageUrl={itemData.item.imageUrl}
        onPress={pressHandler}
      />
    );
  }

  if (!displayedNews.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No news items found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={displayedNews}
      keyExtractor={(item) => item.id}
      renderItem={renderNewsItem}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default NewsList;

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
    color: Colors.gray700,
  },
});