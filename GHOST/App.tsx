import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './components/WelcomeScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import PreferencesScreen from './components/PreferencesScreen';
import HomeScreen from './components/HomeScreen';
import VideoFeedScreen from './components/VideoFeedScreen'; // Import de la nouvelle page
import ConversationScreen from './components/ConversationsScreen'; // Import de la nouvelle page
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="WelcomeScreen" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="VideoFeedScreen" component={VideoFeedScreen} /> 
        <Stack.Screen name="ConversationScreen" component={ConversationScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;