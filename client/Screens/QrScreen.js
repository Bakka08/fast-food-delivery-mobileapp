import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg'; 

const QrScreen = ({ navigation }) => {
  const route = useRoute();
  const item = route.params.item;
  
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <QRCode
          value={item.qr} 
          size={230} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff7424',
  },
  container2: {
    backgroundColor: "#E6E6E6",
    borderRadius: 28,
    width: 300,
    height: 350,
    borderWidth: 5,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
});

export default QrScreen;
