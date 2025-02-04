import 'react-native-gesture-handler'; 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './components/WelcomeScreen';
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;