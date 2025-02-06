import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importer useNavigation

const { width } = Dimensions.get('window');

const videos = [
  { id: '1', videoUrl: 'https://via.placeholder.com/500x500' },
  { id: '2', videoUrl: 'https://via.placeholder.com/500x500' },
  // Ajoutez plus de vidéos ici
];

const VideoFeedScreen: React.FC = () => {
  const navigation = useNavigation(); // Utiliser useNavigation pour obtenir l'objet de navigation

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.videoCard}>
            <Image source={{ uri: item.videoUrl }} style={styles.video} />
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HomeScreen')} // Naviguer vers HomeScreen
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  videoCard: {
    backgroundColor: '#222',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  video: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#BB1DF0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VideoFeedScreen;