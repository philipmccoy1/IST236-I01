import { useLayoutEffect, useContext } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { NEWS } from '../data/dummy-data';
import Colors from '../constants/colors';
import { BookmarksContext } from '../store/context/bookmarks-context';

function NewsDetailScreen({ route, navigation }) {
  const bookmarksCtx = useContext(BookmarksContext);

  const newsId = route.params.newsId;
  const selectedNews = NEWS.find((item) => item.id === newsId);

  const newsIsBookmarked = bookmarksCtx.ids.includes(newsId);

  function changeBookmarkStatusHandler() {
    if (newsIsBookmarked) {
      bookmarksCtx.removeBookmark(newsId);
    } else {
      bookmarksCtx.addBookmark(newsId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'News Details',
      headerRight: () => (
        <Pressable
          onPress={changeBookmarkStatusHandler}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Ionicons
            name={newsIsBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color="white"
          />
        </Pressable>
      ),
    });
  }, [navigation, newsIsBookmarked]);

  return (
    <ScrollView style={styles.root}>
      <Image source={{ uri: selectedNews.imageUrl }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.headline}>{selectedNews.headline}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{selectedNews.date}</Text>
          <Text style={styles.metaText}>By {selectedNews.author}</Text>
        </View>

        <View style={styles.agencyBox}>
          <Text style={styles.agencyLabel}>Agency</Text>
          <Text style={styles.agencyValue}>{selectedNews.agency}</Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{selectedNews.description}</Text>
      </View>
    </ScrollView>
  );
}

export default NewsDetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray100,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: 18,
  },
  headline: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24,
    color: Colors.primary700,
    marginBottom: 14,
  },
  metaRow: {
    marginBottom: 14,
  },
  metaText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14,
    color: Colors.gray700,
    marginBottom: 4,
  },
  agencyBox: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  agencyLabel: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 13,
    color: Colors.gray500,
    marginBottom: 4,
  },
  agencyValue: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
    color: Colors.accent500,
  },
  sectionTitle: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    color: Colors.primary700,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    color: Colors.gray700,
    lineHeight: 24,
  },
  pressed: {
    opacity: 0.7,
  },
});