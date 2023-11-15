import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Linking } from 'react-native';


const CommandeScreen = ({ navigation }) => {
  const route = useRoute();
  const userId = route.params.userId;

  const [userData, setUserData] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  const fetchUserData = () => {
    const userUrl = `http://192.168.1.108:8080/api/users/find/${userId}`;
    const ordersUrl = `http://192.168.1.108:8080/api/users/orders/${userId}`;

    axios
      .get(userUrl)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data', error);
      });

    axios
      .get(ordersUrl)
      .then((response) => {
        setUserOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user orders', error);
      });
  };

  const removeFromBasket = (mealId) => {
    const deleteUrl = `http://192.168.1.108:8080/api/users/removefrombasket/${userId}/${mealId}`;

    axios
      .delete(deleteUrl)
      .then(() => {
        Alert.alert('Meal removed from the basket');
        fetchUserData(); 
      })
      .catch((error) => {
        console.error('Error removing meal from the basket', error);
      });
  };

  useEffect(() => {
  
    fetchUserData();

 
    const intervalId = setInterval(() => {
      fetchUserData();
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.row1}>
        <View style={styles.innerRow1}>
          <View style={styles.column}>
            <Text style={styles.text}>Basket </Text>
          </View>
          <View style={styles.column}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('LocationScreen', { userId: userId });
              }}
            >
              <Text style={styles.buttonText}>Make an Order</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.innerRow2}>
          <View style={styles.gridContainer}>
            {userData.mainMeal && (
              <View style={styles.gridItem} key={userData.mainMeal.id}>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => removeFromBasket(userData.mainMeal.id)}
                >
                  <Icon name="times" size={25} color="white" />
                </TouchableOpacity>
                <Image source={{ uri: userData.mainMeal.image }} style={styles.image} />
                <Text style={styles.text1}>{userData.mainMeal.name}</Text>
                <Text style={styles.text2}>{userData.mainMeal.price}.00MAD</Text>
              </View>
            )}
            {/* Repeat the same structure for optional meals */}
            {userData.optionalMeal1 && (
              <View style={styles.gridItem} key={userData.optionalMeal1.id}>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => removeFromBasket(userData.optionalMeal1.id)}
                >
                  <Icon name="times" size={25} color="white" />
                </TouchableOpacity>
                <Image source={{ uri: userData.optionalMeal1.image }} style={styles.image} />
                <Text style={styles.text1}>{userData.optionalMeal1.name}</Text>
                <Text style={styles.text2}>{userData.optionalMeal1.price}.00MAD</Text>
              </View>
            )}
            {userData.optionalMeal2 && (
              <View style={styles.gridItem} key={userData.optionalMeal2.id}>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => removeFromBasket(userData.optionalMeal2.id)}
                >
                  <Icon name="times" size={25} color="white" />
                </TouchableOpacity>
                <Image source={{ uri: userData.optionalMeal2.image }} style={styles.image} />
                <Text style={styles.text1}>{userData.optionalMeal2.name}</Text>
                <Text style={styles.text2}>{userData.optionalMeal2.price}.00MAD</Text>
              </View>
            )}
            {userData.optionalMeal3 && (
              <View style={styles.gridItem} key={userData.optionalMeal3.id}>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => removeFromBasket(userData.optionalMeal3.id)}
                >
                  <Icon name="times" size={25} color="white" />
                </TouchableOpacity>
                <Image source={{ uri: userData.optionalMeal3.image }} style={styles.image} />
                <Text style={styles.text1}>{userData.optionalMeal3.name}</Text>
                <Text style={styles.text2}>{userData.optionalMeal3.price}.00MAD</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.row2}>
        <View style={styles.innerRow3}>
          <Text style={styles.text}>Orders </Text>
        </View>
        <View style={styles.innerRow4}>
                  <FlatList
            data={userOrders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <View style={styles.leftColumn}>
                  {item.etat === 'IN THE WAY' ? (
                           <TouchableOpacity
                           style={styles.button4}
                           onPress={() => {
                             const phoneNumber = item.deliveryman.telephone;
                             if (phoneNumber) {
                               Linking.openURL(`tel:${phoneNumber}`);
                             } else {
                               Alert.alert('Phone number is not available');
                             }
                           }}
                         >
                      <Icon name="phone" size={23} color="white" />
                    </TouchableOpacity>
                  ) : item.etat === 'AT THE DOOR' ? (
                    <TouchableOpacity style={styles.button4} onPress={() => { navigation.navigate('QrScreen', {
                      item: item ,
                    }); }}>
                      <Icon name="qrcode" size={23} color="white" />
                    </TouchableOpacity>
                  ) : null}
                  <Icon name="truck" size={23} color="#ec8619" />
                </View>
                <View style={styles.rightColumn}>
                  <Text style={styles.cardText1}>{item.names}</Text>
                  <Text style={styles.cardText2}>{item.etat}</Text>
                  <Text style={styles.cardText3}>{item.totalPrice}.00MAD</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white',
  },
  row1: {  
    flex: 0.5,
    justifyContent: 'center',
  },
  row2: {
    flex: 0.5,
    justifyContent: 'center',
  },
  innerRow1: {
    flexDirection: 'row',
    marginTop : 20,
    marginLeft : 23,
    flex: 0.1, 
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  innerRow2: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerRow3: {
    flex: 0.2, 
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft : 23,
  },
  innerRow4: {
    flex: 0.8, 
  },
  text: {
    marginTop:5,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 20,
    color: 'grey',
    
  },
  gridContainer: {
    marginTop: 10,
    marginRight : 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridItem: {
    width: '45%',
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius : 20,
  },
  button2: {
    alignItems : 'center',
    width : 28,
   borderRadius : 10,
   backgroundColor :"#FB0440",
   alignSelf : 'flex-end',
   marginRight : 30,
  },
  button: {
    backgroundColor: '#ec8619',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    height: 38,
    marginRight : 20,
    alignSelf :'flex-end',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  column: {
    flex: 1,
  },
  cardContainer: {
    marginLeft : 23,
    marginBottom : 20,
    borderRadius: 10,  
  },
 
  cardText1: {
    alignSelf : 'flex-start',
   marginTop : 10 ,
   marginLeft : 2,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  cardText2: {
    alignSelf : 'flex-start',
   marginTop : 10 ,
   marginLeft : 2,
    fontSize: 20,
    color: '#ec8619',
    fontWeight: 'bold',
  },
  
  cardText3: {
    alignSelf : 'flex-end',
   marginTop : 10 ,
   marginRight: 25,
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  
  leftColumn: {
    flex: 0.3,  
    
  },
  rightColumn: {
    flex: 0.7, 
    
  },
  searchButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignSelf: 'flex-end',
    marginLeft: 16,
  },
  button4: {
    alignItems : 'center',
    justifyContent : 'center',
    width : 28,
    height : 28,
   borderRadius : 5,
   backgroundColor :"#FB0440",
   alignSelf : 'flex-end',
   marginRight : 30,
  },
});

export default CommandeScreen;
