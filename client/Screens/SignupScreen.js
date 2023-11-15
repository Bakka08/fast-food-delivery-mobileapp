import React, { useState } from 'react';
import { View, Image, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install the icon library
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignup = async () => {
    // Check if the name (nom) is empty or only contains whitespace
    if (nom.trim() === '') {
      // Name is empty
      alert('Please enter your name.');
      return;
    }
  
    // Check if the email is in a valid email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      // Invalid email format
      alert('Please enter a valid email address.');
      return;
    }
  
    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      // Password is too short
      alert('Password must be at least 8 characters long.');
      return;
    }
  
    // Prepare the data to send to the API
    const userData = {
      nom: nom,
      email: email,
      password: password,
    };
  
    try {
      // Make an HTTP POST request to the API using Axios
      const response = await axios.post('http://192.168.1.108:8080/api/users/signup', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        navigation.navigate('LoginScreen');
      } else {
        alert('Email Already used');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <Image
          source={require('../images/logo.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.lowerRow}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            placeholder="John doe"
            value={nom}
            onChangeText={(text) => setNom(text)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Example@gmail.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordInput}>
            <TextInput
              style={styles.passwordTextInput}
              secureTextEntry={!passwordVisible}
              placeholder="* * * * * * * * * * * * *"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.togglePasswordButton}
            >
              <Icon
                name={passwordVisible ? 'eye-slash' : 'eye'} 
                size={20}
                color="#000" // Change the color as needed
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignup}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.linkContainer}>
            <Text style={styles.belowButtonText}>You already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}
            >
              <Text style={styles.signUpLink}>Login</Text>
            </TouchableOpacity>
          </View>
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
      backgroundColor: '#ff7424',
      justifyContent: 'center',
      alignItems: 'center',
    },
    lowerRow: {
      flex: 0.7,
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    image: {
      aspectRatio: 1,
      flex: 0.8,
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
      backgroundColor: '#ff7424',
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
    belowButtonText: {
      marginTop: 10,
      textAlign: 'center',
    },
    linkContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    signUpLink: {
      marginLeft: 5,
      color: '#ff7424', 
      fontWeight: 'bold',
      marginTop: 10,
    },
  });
  

  

export default SignupScreen;




