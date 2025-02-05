import React from 'react';
import { 
  View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions, ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const { width } = Dimensions.get('window');

// Données des stories
const stories = [
  { id: '1', imageUrl: 'https://example.com/story1.jpg', name: 'User 1' },
  { id: '2', imageUrl: 'https://example.com/story2.jpg', name: 'User 2' },
  { id: '3', imageUrl: 'https://example.com/story3.jpg', name: 'User 3' },
  // Ajoute d'autres stories ici
];

// Données des publications
const posts = [
  { id: '1', userName: '', content: 'This is a post!', imageUrl: 'https://example.com/post1.jpg' },
  { id: '2', userName: 'User 2', content: 'Another post here!', imageUrl: 'https://example.com/post2.jpg' },
  { id: '3', userName: 'User 3', content: 'This is awesome!', imageUrl: 'https://example.com/post3.jpg' },
  // Ajoute d'autres posts ici
];

// Données des icônes en bas
const icons = [
  { id: '1', name: 'Home', icon: 'home' },
  { id: '2', name: 'Search', icon: 'search' },
  { id: '3', name: 'Add', icon: 'add-circle' },
  { id: '4', name: 'Notifications', icon: 'notifications' },
  { id: '5', name: 'Profile', icon: 'person' },
];

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with Message and Like Buttons */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ghost</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="chatbubble-outline" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="heart-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stories Section */}
        <View style={styles.storiesContainer}>
          <FlatList
            horizontal
            data={stories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.storyCard}>
                <Image source={{ uri: item.imageUrl }} style={styles.storyImage} />
                <Text style={styles.storyName}>{item.name}</Text>
              </View>
            )}
          />
        </View>

        {/* Publications Section */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <Text style={styles.postUser}>{item.userName}</Text>
              <Text style={styles.postContent}>{item.content}</Text>
              <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
            </View>
          )}
        />
      </ScrollView>

      {/* Icons Section */}
      <View style={styles.iconContainer}>
        {icons.map((icon) => (
          <TouchableOpacity key={icon.id} style={styles.iconButton}>
            <Icon name={icon.icon} size={28} color="white" />
            <Text style={styles.iconName}>{icon.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fond noir
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Pour donner plus d'espace pour les icônes en bas
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#000',
    marginTop: 40, // Ajouté pour descendre la barre
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 20,
  },
  storiesContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },
  storyCard: {
    marginRight: 15,
    alignItems: 'center',
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  storyName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  postCard: {
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
  postUser: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
    color: 'white',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  iconContainer: {
    position: 'absolute', // Fixe la barre au bas de l'écran
    bottom: 10, // Remonte encore la barre de footer
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#222',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen;