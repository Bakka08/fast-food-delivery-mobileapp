import React, { useState } from 'react';
import { View, Image, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const route = useRoute();
  const userId = route.params.userId;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleUpdate = () => {
    if (oldPassword.trim() === '' || newPassword.trim() === '') {
      alert('Please fill in both old and new passwords.');
    } else if (newPassword.length < 8) {
      alert('New password must be at least 8 characters long.');
    } else {
      // Both fields are not empty and the new password is of sufficient length
  
      // Make a PUT request to update the password using Axios
      axios
        .put(`http://192.168.1.108:8080/api/users/updatepassword/${userId}/${oldPassword}/${newPassword}`, {
        })
        .then(response => {
          // Handle the response here, e.g., show a success message
          alert('Password updated successfully!');
          setOldPassword('');
          setNewPassword('');
          navigation.navigate('HomeScreen', { userId: userId });
        })
        .catch(error => {
          // Handle errors, e.g., show an error message
          alert('Password update failed: ' + error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <Image source={require('../images/profile.png')} style={styles.image} />
      </View>
      <View style={styles.lowerRow}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Old Password</Text>
          <View style={styles.passwordInput}>
            <TextInput
              style={styles.passwordTextInput}
              secureTextEntry={!passwordVisible}
              placeholder="* * * * * * * * * * * * *"
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.togglePasswordButton}>
              <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordInput}>
            <TextInput
              style={styles.passwordTextInput}
              secureTextEntry={!passwordVisible}
              placeholder="* * * * * * * * * * * * *"
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.togglePasswordButton}>
              <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => { navigation.navigate('LoginScreen');}}>
            <Text style={styles.buttonText2}>Logout</Text>
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
      flex: 0.30,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    lowerRow: {
      flex: 0.7,
      backgroundColor: 'white',
    },
    image: {
      marginTop : 8,
      aspectRatio: 1,
      flex: 0.7,
      resizeMode: 'contain',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formGroup: {
      margin: 20,
    },
    label: {
      fontSize: 16,
      margin: 3,
      color: 'black',
      fontWeight: 'bold',
    },
    input: {
      marginTop: 10,
      backgroundColor: '#BCBDC0',
      borderColor: '#ff7424',
      borderRadius: 20,
      padding: 10,
    },
    passwordInput: {
      marginTop: 10,
      backgroundColor: '#BCBDC0',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 20,
      padding: 10,
    },
    passwordTextInput: {
      flex: 1,
    },
    togglePasswordButton: {
      padding: 5,
    },
    button: {
      backgroundColor: '#ec8619',
      borderRadius: 20,
      padding: 10,
      alignItems: 'center',
      height: 70,
      marginTop: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button2: {
      backgroundColor: '#FB0440',
      borderRadius: 20,
      padding: 10,
      alignItems: 'center',
      height: 70,
      marginTop: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 24,
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
    },
    buttonText2: {
      color: 'white',
      fontSize: 24,
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
    },
  
   
  });
  

  

export default SignupScreen;




