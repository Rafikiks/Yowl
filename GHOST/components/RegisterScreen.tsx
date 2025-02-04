import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  // Fonction pour traiter l'inscription
  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    Alert.alert('Succès', 'Inscription réussie !', [
      {
        text: 'OK',
        onPress: () => navigation.navigate("PreferencesScreen"), // Redirection après inscription
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Barre de progression */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}></View>
      </View>

      {/* Champs Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Username / E-mail</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Write here ..."
            placeholderTextColor="rgba(208, 213, 216, 0.50)"
            keyboardType="email-address"
          />
        </View>
      </View>

      {/* Champs Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Write here ..."
            placeholderTextColor="rgba(208, 213, 216, 0.50)"
            secureTextEntry
          />
        </View>
      </View>

      {/* Champs Confirm Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Write here ..."
            placeholderTextColor="rgba(208, 213, 216, 0.50)"
            secureTextEntry
          />
        </View>
      </View>

      {/* Boutons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginRedirectButton} onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.loginRedirectButtonText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  progressBarContainer: {
    width: width * 0.9,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'absolute',
    top: 80,
    zIndex: 0,
  },
  progressBar: {
    width: '50%',
    height: '100%',
    backgroundColor: '#BB1DF0',
    borderRadius: 5,
  },
  inputContainer: {
    width: width * 0.85,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Nunito',
    fontWeight: '700',
    marginBottom: 8,
  },
  inputWrapper: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'white',
    padding: 4,
  },
  textInput: {
    width: '100%',
    height: 48,
    padding: 10,
    color: 'white',
    fontSize: 12,
    fontFamily: 'Nunito',
    fontWeight: '700',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: height * 0.08,
    width: width * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  registerButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#BB1DF0',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'SF Pro Display',
    fontWeight: '600',
  },
  loginRedirectButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#D0D5D8',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginRedirectButtonText: {
    fontSize: 16,
    color: '#161616',
    fontFamily: 'SF Pro Display',
    fontWeight: '600',
  },
});

export default RegisterScreen;