import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Button , Image } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <Image
        source={require('../images/logo.png')}
        style={styles.image}
      />
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
  image: {
    aspectRatio: 1,
    flex: 0.2, 
    resizeMode: 'contain', 
    alignItems: 'center', 
  }
});
export default LoadingScreen;
