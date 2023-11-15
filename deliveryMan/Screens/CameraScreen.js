import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CameraScreen = () => {
  const route = useRoute();
  const orderId = route.params.orderId;
  const userId = route.params.userId;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setData(data);

    try {
      const response = await axios.get(
        `http://192.168.1.108:8080/api/users/scanqr/${data}/${orderId}`
      );
      
      // Handle the response as needed
      // For example, show an alert with the response data
      Alert.alert('Order is delivered', ``, [
        {
          text: 'Go Back Home',
          onPress: () => {
            // Navigate to CommandeScreen
            navigation.navigate('CommandeScreen', {  userId: userId  });
          },
        },
      ]);
    } catch (error) {
      console.error('Error making the Axios request:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default CameraScreen;
