import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const QrScreen = ({ navigation }) => {
  const route = useRoute();
  const orderId = route.params.orderId;
  const userId = route.params.userId;

  // Initialize the countdown timer state
  const [countdown, setCountdown] = useState(30 * 60); // 30 minutes in seconds

  // Create a function to update the countdown
  const updateCountdown = () => {
    if (countdown > 0) {
      setCountdown(countdown - 1); // Subtract one second
    }
  };

  // Use the setInterval function to update the countdown every second
  useEffect(() => {
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Clear the interval when the countdown reaches zero
    if (countdown === 0) {
      clearInterval(countdownInterval);
    }

    // Clear the interval when the component unmounts
    return () => clearInterval(countdownInterval);
  }, [countdown]);

  // Format the remaining time as "minutes:seconds"
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // State to control the visibility of the bell and camera icons
  const [showBellIcon, setShowBellIcon] = useState(true);
  const [showCameraIcon, setShowCameraIcon] = useState(false);

  // Function to handle clicking the bell icon
  const handleBellClick = () => {
    // Make an Axios GET request
    axios.get(`http://192.168.1.108:8080/api/users/ringbell/${orderId}`)
      .then((response) => {
        // After a successful response, hide the bell icon, show the camera icon, and hide the timer
        setShowBellIcon(false);
        setShowCameraIcon(true);
        setCountdown(0); // Hide the timer by setting it to 0
      })
      .catch((error) => {
        console.error('Error ringing the bell:', error);
      });
  };

  return (
    <View style={styles.container}>
      {showBellIcon && (
        <TouchableOpacity onPress={handleBellClick}>
          <Icon name="bell" size={200} color="grey" />
        </TouchableOpacity>
      )}
      {showCameraIcon && (
        <TouchableOpacity onPress={() => navigation.navigate('CameraScreen', { orderId , userId: userId  })}>
          <Icon name="camera" size={200} color="grey" />
        </TouchableOpacity>
      )}
      {countdown > 0 && (
        <Text style={styles.text}>{formatTime(countdown)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    position: 'absolute',
    top: 150,
    justifyContent: 'center',
    fontSize: 70,
    color: 'grey',
  },
});

export default QrScreen;
