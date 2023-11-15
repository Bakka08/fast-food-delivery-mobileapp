import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const LocationScreen = ({ navigation }) => {
  const route = useRoute();
  const item = route.params.item;
  const userId = route.params.userId;


  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);

  const handleLocationSelection = (e) => {
    if (selectedLocation === null) {
      setSelectedLocation(e.nativeEvent.coordinate);
      mapRef.current.animateToRegion({
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    }
  };

  const handleCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setSelectedLocation({ latitude, longitude });
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      } else {
        console.warn("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const itemLatitude = parseFloat(item.latitude);
  const itemLongitude = parseFloat(item.longitude);

  const initialRegion = itemLatitude && itemLongitude
    ? {
      latitude: itemLatitude,
      longitude: itemLongitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    }
    : {
      latitude: 31.629473,
      longitude: -7.981084,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };

  const handleTakeOrder = () => {
    if (selectedLocation && itemLatitude && itemLongitude) {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const formattedTime = `${hours}:${minutes}`
      const url = `http://192.168.1.108:8080/api/users/takeorder/${userId}/${formattedTime}/${item.id}/${itemLatitude}/${itemLongitude}`;

      // Make the Axios GET request
      axios.get(url)
        .then((response) => {
          navigation.navigate('QrScreen', { orderId: item.id , userId: userId  });
        })
        .catch((error) => {
      
        });
    } else {
      Alert.alert('Incomplete Information', 'Please  locat Your self  ');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={initialRegion}
            onPress={handleLocationSelection}
          >
            {selectedLocation && (
              <Marker
                coordinate={selectedLocation}
                title="Selected Location"
                pinColor="red"
              />
            )}
            {itemLatitude && itemLongitude && (
              <Marker
                coordinate={{
                  latitude: itemLatitude,
                  longitude: itemLongitude,
                }}
                title="Second Location"
                pinColor="#ff7424"
              />
            )}
          </MapView>
          <TouchableOpacity
            onPress={handleCurrentLocation}
            style={styles.currentLocationButton}
          >
            <Icon name="map-marker" size={33} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lowerRow}>
        <View style={styles.row1}>
          <View style={styles.gridContainer}>
            {item.mainMeal && (
              <View style={styles.gridItem} key={item.mainMeal.id}>
                <Image source={{ uri: item.mainMeal.image }} style={styles.image} />
                <Text style={styles.text1}>{item.mainMeal.name}</Text>
                <Text style={styles.text2}>{item.mainMeal.price}.00MAD</Text>
              </View>
            )}
            {item.optionalMeal1 && (
              <View style={styles.gridItem} key={item.optionalMeal1.id}>
                <Image source={{ uri: item.optionalMeal1.image }} style={styles.image} />
                <Text style={styles.text1}>{item.optionalMeal1.name}</Text>
                <Text style={styles.text2}>{item.optionalMeal1.price}.00MAD</Text>
              </View>
            )}
            {item.optionalMeal2 && (
              <View style={styles.gridItem} key={item.optionalMeal2.id}>
                <Image source={{ uri: item.optionalMeal2.image }} style={styles.image} />
                <Text style={styles.text1}>{item.optionalMeal2.name}</Text>
                <Text style={styles.text2}>{item.optionalMeal2.price}.00MAD</Text>
              </View>
            )}
            {item.optionalMeal3 && (
              <View style={styles.gridItem} key={item.optionalMeal3.id}>
                <Image source={{ uri: item.optionalMeal3.image }} style={styles.image} />
                <Text style={styles.text1}>{item.optionalMeal3.name}</Text>
                <Text style={styles.text2}>{item.optionalMeal3.price}.00MAD</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.row2}>
          <TouchableOpacity
            style={styles.button2}
            onPress={handleTakeOrder}
          >
            <Text style={styles.buttonText2}>Take the Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff7424',
  },
  upperRow: {
    flex: 0.5,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  currentLocationButton: {
    flexDirection: 'row',
    backgroundColor: '#FB0440',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 350,
    right: 13,
    borderRadius: 30,
    width: 55,
  },
  lowerRow: {
    flex: 0.5,
    backgroundColor: 'white',
  },
  row1: {
    flex: 0.8,

  },
  row2: {
    flex: 0.2,
 
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
  text1: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 20,
    color: 'grey',
    
  },
  buttonText2: {
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom : 20,
  },
  button2: {
    backgroundColor: '#ec8619',
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    
  
  },
});

export default LocationScreen;
