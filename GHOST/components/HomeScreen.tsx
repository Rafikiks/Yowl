import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to HomeScreen!</Text>

      {/* Bouton pour aller aux préférences */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('PreferencesScreen')}
      >
        <Text style={styles.buttonText}>Go to Preferences</Text>
      </TouchableOpacity>

      {/* Bouton de déconnexion */}
      <TouchableOpacity 
        style={[styles.button, styles.logoutButton]} 
        onPress={() => navigation.navigate('WelcomeScreen')}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    width: width * 0.8,
    height: 50,
    backgroundColor: '#BB1DF0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#D0D5D8',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});

export default HomeScreen;