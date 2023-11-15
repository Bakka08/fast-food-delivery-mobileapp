import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const CommandeScreen = ({ navigation }) => {
  const route = useRoute();
  const userId = route.params.userId;


  const [userOrders, setUserOrders] = useState([]);

  const fetchUserData = () => {
    const ordersUrl = `http://192.168.1.108:8080/api/users/waitingOrders`;

    axios
      .get(ordersUrl)
      .then((response) => {
        setUserOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user orders', error);
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
        <View style={styles.innerRow3}>
          <Text style={styles.text}>Available Orders</Text>
          <TouchableOpacity onPress={() => {navigation.navigate('ProfileScreen', { userId: userId }); }}>
            <Image
              source={require('../images/profile.png')}
              style={styles.circularImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.innerRow4}>
          <FlatList
            data={userOrders} 
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {navigation.navigate('LocationScreen', { item: item , userId: userId  });}}>
              <View style={styles.cardContainer}>

                <View style={styles.leftColumn}>               
                <Icon name="truck" size={23} color="#ec8619" />                    
                </View>
                <View style={styles.rightColumn}>
                  <Text style={styles.cardText1}>{item.user.nom}</Text>
                  <Text style={styles.cardText2}>{item.names}</Text>
                  <Text style={styles.cardText3}>{item.totalPrice}.00MAD</Text>
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
  innerRow3: {
    flexDirection: 'row',
    marginTop : 35,
    flex: 0.1, 
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  circularImage: {
    width: 50,
    height: 50,
    borderRadius: 1000,
    marginLeft: 180,
    backgroundColor: 'grey',
  },
});

export default CommandeScreen;
