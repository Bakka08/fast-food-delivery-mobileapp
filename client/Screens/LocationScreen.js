import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const LocationScreen = ({ navigation }) => {
  const route = useRoute();
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
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      } else {
        console.warn("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const makeOrder = async () => {
    if (selectedLocation) {
      const url = `http://192.168.1.108:8080/api/users/addorder/${userId}/${selectedLocation.longitude}/${selectedLocation.latitude}`;
      
      try {
        const response = await axios.get(url);

        if (response.data === "done") {
          alert("Your order has been placed.");
          navigation.navigate('CommandeScreen', {userId: userId ,});
        } else if (response.data === "empty") {
          alert( "There are no meals in the basket.");
        } else {
          alert( "Received an unknown response.");
        }
      } catch (error) {
        console.error("Error making the order:", error);
      }
    } else {
      alert("Please select a location on the map.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: 31.629473,
              longitude: -7.981084,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleLocationSelection}
          >
            {selectedLocation && (
              <Marker coordinate={selectedLocation} title="Selected Location" />
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
        <TouchableOpacity
          style={styles.button2}
          onPress={makeOrder}
        >
          <Text style={styles.buttonText2}>Make the Order</Text>
        </TouchableOpacity>
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
    flex: 0.9,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  upperRowRow1: {
    marginTop: 10,
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 23,
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
    justifyContent : 'center',
    position: 'absolute',
    top: 700,
    right: 13,
    borderRadius : 30,
    width : 55,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginRight : 10,
    fontWeight: 'bold',
  },
  lowerRow: {
    flex: 0.1,
    backgroundColor: 'white',
  },
  text: {
    marginTop: 5,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  button2: {
    backgroundColor: '#ec8619',
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    
  
  },
  buttonText2: {
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom : 20,
  },
});

export default LocationScreen;
