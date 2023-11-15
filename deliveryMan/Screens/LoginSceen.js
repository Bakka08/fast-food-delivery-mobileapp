import React, { useState } from 'react';
import { View, Image, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import axios from 'axios';



const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      alert('Please fill in all the fields.');
      return;
    }

    axios
      .get(`http://192.168.1.108:8080/api/users/loginD/${email}/${password}`)
      .then((response) => {
        if (response.data > 0) {
          setEmail('');
          setPassword('');
          navigation.navigate('CommandeScreen', { userId: response.data });
        } else {
          alert('Invalid email or password.');
        }
      })
      .catch((error) => {
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <Image source={require('../images/logo.png')} style={styles.image} />
      </View>
      <View style={styles.lowerRow}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Example@gmail.com"
            value={email}
            onChangeText={text => setEmail(text)}
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
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.togglePasswordButton}>
              <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
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

export default LoginScreen;
