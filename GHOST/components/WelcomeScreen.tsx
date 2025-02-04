import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Assure-toi que le fichier s'appelle bien `types.ts`

const { width, height } = Dimensions.get('window');

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'WelcomeScreen'>>();

  return (
    <View style={styles.container}>
      {/* Barre de progression en haut */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}></View>
      </View>

      {/* Texte "Welcome" et "to Ghost" */}
      <View style={styles.topTextContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.toGhostText}>to Ghost</Text>
      </View>

      {/* Bouton Next */}
      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  progressBarContainer: {
    position: 'absolute',
    top: height * 0.13,
    left: 20,
    right: 20,
    height: 10,
    backgroundColor: 'rgba(208, 213, 216, 0.50)',
    borderRadius: 5,
  },
  progressBar: {
    width: '30%',
    height: '100%',
    backgroundColor: '#BB1DF0',
    borderRadius: 5,
  },
  topTextContainer: {
    position: 'absolute',
    top: height * 0.2,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  welcomeText: {
    width: 185,
    textAlign: 'center',
    color: 'white',
    fontSize: 36,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '400',
    marginBottom: 10,
  },
  toGhostText: {
    width: 185,
    textAlign: 'center',
    color: 'rgba(208, 213, 216, 0.50)',
    fontSize: 36,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '400',
    marginBottom: 40,
  },
  nextButton: {
    position: 'absolute',
    bottom: height * 0.1,
    width: width * 0.85,
    height: 53,
    backgroundColor: 'white',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#BB1DF0',
    fontSize: 16,
    fontFamily: 'SF Pro Display',
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default WelcomeScreen;