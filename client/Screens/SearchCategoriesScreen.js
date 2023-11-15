import React, { useState , useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList , Image} from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install the icon library


const SearchCategoriesScreen = ({ navigation }) => {
  const route = useRoute();
  const itemId = route.params.itemId;
  const itemImage = route.params.itemImage;
  const  userId= route.params.userId ;

  // Define your data array
  const [data, setData] = useState([]);
  useEffect(() => {
    // Make an Axios GET request to retrieve data when the component is mounted
    axios.get(`http://192.168.1.108:8080/api/meals/allbycategory/${itemId}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [itemId]); // Add itemId as a dependency to trigger the effect when it changes

  // State for search text and filtered data
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  // Use a useEffect hook to update filteredData when data or searchText changes
  useEffect(() => {
    // Filter the data based on the search text
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, searchText]);

  // Function to handle text input change and update search text
  const handleSearch = (text) => {
    setSearchText(text);
  }

// Function to handle adding the item to the basket
const addToBasket = (userId, itemId) => {
  // Make an Axios GET request to add the item to the user's basket
  axios.get(`http://192.168.1.108:8080/api/users/addtobasket/${userId}/${itemId}`)
    .then(response => {
      // Check the response message and show the appropriate alert
      if (response.data === "Basket is full") {
        // Show a full basket alert
        alert('Basket Full', 'The basket is already full' );
      } else if (response.data === "Meal added to the basket") {

        alert('Meal added to the basket');
      } else {
        // Handle other responses as needed
        console.log('Unknown response:', response.data);
      }
    })
    .catch(error => {
      console.error("Error adding item to basket:", error);
      // Show an error alert
      alert( 'Failed to add item to the basket');
    });
}


  
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
      
          <View style={styles.cardContainer}>
          <View style={styles.leftColumn}>
          <Image source={{ uri: item.image }}  style={styles.cardImage} />
          </View>
          <View style={styles.rightColumn}>
          <Text style={styles.cardText1}>{item.name}</Text>
          <Text style={styles.cardText2}>{item.restaurant.nom}</Text> 
          <TouchableOpacity
                  style={styles.button2}
                  onPress={() => {
                    addToBasket(userId, item.id);
                  }}
                >
                  <Icon name="plus" size={30} color="white" />
                </TouchableOpacity>
          <Text style={styles.cardText3}>{item.price}.00MAD</Text>
         
          </View>
          </View>
          
          
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
    backgroundColor: '#ec8619',
    alignItems: 'center',
    borderWidth : 4,
    marginBottom : 20,
    borderRadius: 10,
    borderColor : '#F5F7F8',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderTopRightRadius : 15,
    borderBottomRightRadius : 15 ,
   

  },
  cardText1: {
    alignSelf : 'flex-start',
    fontSize: 28,
    color: '#F5F7F8',
    fontWeight: 'bold',
  },
  cardText2: {
    fontSize: 16,
    color: '#F5F7F8',
    fontWeight: 'bold',
  },
  cardText3: {
    alignSelf : 'flex-end',
    marginRight : 10,
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  leftColumn: {
    flex: 0.3,
    
  },
  rightColumn: {
    flex: 0.7, 
    
  },
  button2: {
    alignItems : 'center',
    width : 28,
   borderRadius : 6,
   alignSelf : 'flex-end',
    right : 7,
   position: 'absolute',
  },
});

export default SearchCategoriesScreen;
