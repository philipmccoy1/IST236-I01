import { useLayoutEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { COUNTRIES, DESTINATIONS } from '../data/dummy-data';
import DestinationItem from '../components/DestinationItem';
import DestinationModal from '../components/DestinationModal';
import Colors from '../constants/colors';

function DestinationOverviewScreen({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const countryId = route.params.countryId;

  const displayedDestinations = DESTINATIONS.filter((destination) =>
    destination.countryIds.includes(countryId)
  );

  const selectedCountry = COUNTRIES.find((country) => country.id === countryId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedCountry.name + ' Destinations'
    });
  }, [countryId, navigation]);

  function openModalHandler(destination) {
    setSelectedDestination(destination);
    setModalVisible(true);
  }

  function closeModalHandler() {
    setModalVisible(false);
    setSelectedDestination(null);
  }

  function renderDestinationItem(itemData) {
    return (
      <DestinationItem
        destination={itemData.item}
        onPress={() => openModalHandler(itemData.item)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedDestinations}
        keyExtractor={(item) => item.id}
        renderItem={renderDestinationItem}
      />
      <DestinationModal
        visible={modalVisible}
        destination={selectedDestination}
        onClose={closeModalHandler}
      />
    </View>
  );
}

export default DestinationOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light100,
    paddingVertical: 8
  }
});