// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation, route, handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={handleShowPassword} style={styles.eyeButton}>
          <Text>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPasswordButton}>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupButton}>
        <Text>Signup</Text>
      </TouchableOpacity>
      <Button
        title="Login"
        onPress={() => {
          // Simulate authentication success
          handleLogin();

          // Navigate to Home screen
          navigation.replace('Home'); // replace instead of navigate to clear the stack
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
  },
  eyeButton: {
    padding: 10,
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  signupButton: {
    marginTop: 10,
  },
});
