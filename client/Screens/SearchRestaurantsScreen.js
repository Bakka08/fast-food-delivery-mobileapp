import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList , Image} from 'react-native';
import { useRoute } from '@react-navigation/native';
const SearchRestaurantsScreen = ({ navigation }) => {

  const route = useRoute();
const userId = route.params.userId;
  // Local data array
  const data = [
    { id: 1, name: "McDonald's", image: require('../images/mc.png') },
    { id: 2, name: 'KFC', image: require('../images/kfc.png')},
    { id: 3, name: 'Pizza Hut' , image: require('../images/pizzahut.png')   },
    { id: 4, name: "Domino's Pizza", image: require('../images/domino.png')  },
    { id: 5, name: "Subway", image: require('../images/subway.png')},
    { id: 6, name: "Burger King", image: require('../images/burgerking.png')},
    { id: 7, name: "Quick", image: require('../images/quick.png')},
  ];

  // State for search text and filtered data
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
          
  // Function to handle text input change and filter data
  const handleSearch = (text) => {
    setSearchText(text);

    // Filter the data based on the search text
    const filtered = data.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredData(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
      <TextInput
        style={styles.input}
        placeholder="  Search..."
        value={searchText}
        onChangeText={text => handleSearch(text)}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
              onPress={() => {
                navigation.navigate('MealsByRestaurant', {  itemId: item.id, userId: userId , });}}>
          <View style={styles.cardContainer}>
          <View style={styles.leftColumn}>
          <Image source={item.image} style={styles.cardImage} />
          </View>
          <View style={styles.rightColumn}>
          <Text style={styles.cardText1}>{item.name}</Text>
          </View>
          </View>
          </TouchableOpacity>
          
        )}
        
      />
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white',
  },
  container2: {
    flex: 1,
    padding: 25,
  },
  input: {
    height: 40,
    borderColor: '#F5F7F8',
    borderWidth: 3,
    padding: 8,
    marginBottom: 16,
    marginTop : 12,
    borderRadius : 20
  }, 
  cardContainer: {
    flexDirection: 'row',
    marginBottom : 20,
    borderRadius: 10,  
  },
  cardImage: {
    width: '95%',
    height: 100,
    borderTopRightRadius : 15,
    borderBottomRightRadius : 15 ,
  },
  cardText1: {
    alignSelf : 'flex-start',
   marginTop : 10 ,
   marginLeft : 2,
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  leftColumn: {
    flex: 0.4,
    
  },
  rightColumn: {
    flex: 0.6, 
    
  },
});

export default SearchRestaurantsScreen;
