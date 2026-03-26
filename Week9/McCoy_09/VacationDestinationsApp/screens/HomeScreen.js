import { FlatList } from 'react-native';
import { COUNTRIES } from '../data/dummy-data';
import CountryGridTile from '../components/CountryGridTile';

function HomeScreen({ navigation }) {
  function renderCountryItem(itemData) {
    function pressHandler() {
      navigation.navigate('DestinationOverview', {
        countryId: itemData.item.id,
        countryName: itemData.item.name
      });
    }

    return (
      <CountryGridTile
        name={itemData.item.name}
        color={itemData.item.color}
        imageUrl={itemData.item.imageUrl}
        onPress={pressHandler}
      />
    );
  }

  return <FlatList data={COUNTRIES} keyExtractor={(item) => item.id} renderItem={renderCountryItem} numColumns={2} />;
}

export default HomeScreen;