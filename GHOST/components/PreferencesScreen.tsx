import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PreferencesScreen: React.FC = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferences</Text>

      {/* Changer le mode (clair/sombre) */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setDarkMode(!darkMode)}
      >
        <Text style={styles.buttonText}>
          Dark Mode: {darkMode ? 'ON' : 'OFF'}
        </Text>
      </TouchableOpacity>

      {/* Activer/Désactiver les notifications */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setNotificationsEnabled(!notificationsEnabled)}
      >
        <Text style={styles.buttonText}>
          Notifications: {notificationsEnabled ? 'ON' : 'OFF'}
        </Text>
      </TouchableOpacity>

      {/* Retour à la HomeScreen */}
      <TouchableOpacity 
        style={[styles.button, styles.backButton]} 
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
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
  title: {
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
  backButton: {
    backgroundColor: '#D0D5D8',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});

export default PreferencesScreen;