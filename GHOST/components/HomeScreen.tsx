import React, { useState, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions, ScrollView, TextInput, Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importer useNavigation
import Ionicons from 'react-native-vector-icons/Ionicons';  // Importation d'Ionicons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';  // Importation de FontAwesome5

const { width } = Dimensions.get('window');

// Données des icônes en bas (avec les noms des icônes pour Ionicons ou FontAwesome)
const icons = [
  { id: '1', icon: 'home' },
  { id: '2', icon: 'search' },
  { id: '3', icon: 'plus-circle' },
  { id: '4', icon: 'notifications' },
  { id: '5', icon: 'person' },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation(); // Utiliser useNavigation pour obtenir l'objet de navigation
  const [posts, setPosts] = useState<any[]>([]); // État pour stocker les posts
  const [newComment, setNewComment] = useState('');  // État pour stocker le nouveau commentaire
  const [selectedTab, setSelectedTab] = useState('Posts'); // État pour gérer l'onglet sélectionné
  const [isAnonymous, setIsAnonymous] = useState(false); // État pour gérer le mode anonyme
  const [animatedValue] = useState(new Animated.Value(2)); // Valeur animée pour le bouton anonyme

  useEffect(() => {
    // Utilisation de l'API JSONPlaceholder pour récupérer des posts
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        // Formater les données pour ajouter une image aléatoire, likes et commentaires
        const formattedData = data.slice(0, 10).map((post: { id: { toString: () => any; }; userId: any; title: any; }) => ({
          id: post.id.toString(),
          userName: `User ${post.userId}`,
          content: post.title,
          imageUrl: `https://picsum.photos/seed/${post.id}/500/500`,  // Image de taille carrée (format Instagram)
          isImagePost: Math.random() > 0.5, // Random pour décider si c'est un post avec ou sans image
          likes: Math.floor(Math.random() * 1000),  // Nombre de likes aléatoire
          likedByUser: false,  // Ajouter un état pour savoir si l'utilisateur a liké ce post
          comments: [
            { userName: 'User1', text: 'Great post!' },
            { userName: 'User2', text: 'I totally agree with this.' },
          ],  // Ajouter des commentaires par défaut
        }));
        setPosts(formattedData);
      } catch (error) {
        console.error("Erreur lors du chargement des posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { 
              ...post, 
              likedByUser: !post.likedByUser,  // Inverser l'état de like pour ce post
              likes: post.likedByUser ? post.likes - 1 : post.likes + 1 // Augmenter ou diminuer le nombre de likes
            }
          : post
      )
    );
  };

  const handleComment = (postId: string) => {
    if (newComment.trim()) {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, comments: [...post.comments, { userName: 'CurrentUser', text: newComment }] }
            : post
        )
      );
      setNewComment('');
    }
  };

  const toggleAnonymousMode = () => {
    setIsAnonymous(!isAnonymous);
    Animated.timing(animatedValue, {
      toValue: isAnonymous ? 2 : 33,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header avec les boutons icônes */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('ConversationScreen')}>
            <Ionicons name="chatbubbles" size={28} color="white" />  {/* Icône de chat */}
          </TouchableOpacity>
          <View style={styles.headerTabs}>
            <TouchableOpacity 
              style={styles.tabButton} 
              onPress={() => setSelectedTab('Posts')}
            >
              <Text style={styles.tabText}>Posts</Text>
              {selectedTab === 'Posts' && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.tabButton} 
              onPress={() => {
                setSelectedTab('Vidéos');
                navigation.navigate('VideoFeedScreen' as never); // Rediriger vers VideoFeedScreen
              }}
            >
              <Text style={styles.tabText}>Vidéos</Text>
              {selectedTab === 'Vidéos' && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.customButtonContainer} onPress={toggleAnonymousMode}>
              <View style={styles.customButtonBackground} />
              <Animated.View style={[styles.customButtonForeground, { left: animatedValue }, isAnonymous && styles.customButtonForegroundActive]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Publication Section */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={{ uri: `https://via.placeholder.com/35x35` }} style={styles.profileImage} />
                <Text style={styles.postUser}>{item.userName}</Text>
              </View>
              <Text style={styles.postContent}>{item.content}</Text>
              
              {/* Vérifier si le post contient une image ou non */}
              {item.isImagePost ? (
                <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
              ) : (
                <View style={styles.postTextContainer}>
                  <Text style={styles.postText}>This is a text-only post.</Text>
                </View>
              )}

              {/* Section des likes et commentaires */}
              <View style={styles.postActions}>
                <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.actionContainer}>
                  <Ionicons 
                    name={item.likedByUser ? "heart" : "heart-outline"}  // Icône remplie ou outline selon le like
                    size={20} 
                    color={item.likedByUser ? "red" : "white"}  // Couleur rouge si liké, sinon blanc
                  />
                  <Text style={styles.actionText}>{item.likes} Likes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionContainer}>
                  <Ionicons name="chatbubble" size={20} color="white" />
                  <Text style={styles.actionText}>{item.comments.length} Comments</Text>
                </TouchableOpacity>
              </View>

              {/* Section des commentaires */}
              <View style={styles.commentSection}>
                <Text style={styles.commentTitle}>Comments:</Text>
                {item.comments.map((comment, index) => (
                  <View key={index} style={styles.commentContainer}>
                    <Text style={styles.commentUser}>{comment.userName}:</Text>
                    <Text style={styles.commentText}>{comment.text}</Text>
                  </View>
                ))}

                {/* Champ pour ajouter un commentaire */}
                <View style={styles.commentInputContainer}>
                  <TextInput
                    style={styles.commentInput}
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholder="Add a comment..."
                    placeholderTextColor="#aaa"
                  />
                  <TouchableOpacity 
                    onPress={() => handleComment(item.id)} 
                    style={styles.commentButton}
                  >
                    <Text style={styles.commentButtonText}>Post</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>

      {/* Footer Section avec les icônes */}
      <View style={styles.navBar}>
        <View style={styles.navBarContent}>
          <TouchableOpacity style={[styles.navBarItem, styles.homeContainer]} onPress={() => navigation.navigate('HomeScreen')}>
            <Ionicons name="home-outline" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navBarItem, styles.searchContainer]} onPress={() => navigation.navigate('SearchScreen')}>
            <Ionicons name="search-outline" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navBarItem, styles.communitiesContainer]} onPress={() => navigation.navigate('CommunitiesScreen')}>
            <Ionicons name="people-outline" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navBarItem, styles.userCountContainer]} onPress={() => navigation.navigate('UserCountScreen')}>
            <Ionicons name="stats-chart-outline" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navBarItem, styles.profileContainer]} onPress={() => navigation.navigate('ProfileScreen')}>
            <Ionicons name="person-circle-outline" size={35} color="#BB1DF0" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(208, 213, 216, 0.50)',
    backgroundColor: '#161616',
    marginTop: 60, // Augmenter la marge supérieure pour abaisser encore plus le header
  },
  headerTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  tabButton: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'SF Pro Text',
    fontWeight: '400',
    flexWrap: 'wrap',
  },
  tabIndicator: {
    width: 28,
    height: 1,
    backgroundColor: 'white',
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 20,
  },
  customButtonContainer: {
    width: 66,
    height: 35,
    position: 'relative',
    backgroundColor: '#252525',
    borderRadius: 17.5,
    overflow: 'hidden',
    marginLeft: 20,
  },
  customButtonBackground: {
    width: 62,
    height: 31,
    position: 'absolute',
    backgroundColor: 'rgba(217, 217, 217, 0.50)',
    borderRadius: 30,
    left: 2,
    top: 2,
  },
  customButtonForeground: {
    width: 31,
    height: 31,
    position: 'absolute',
    backgroundColor: '#D9D9D9',
    borderRadius: 15.5,
    top: 2,
  },
  customButtonForegroundActive: {
    backgroundColor: '#BB1DF0',
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
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: '#BB1DF0',
    marginRight: 10,
  },
  postUser: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '400',
    wordWrap: 'break-word',
  },
  postContent: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'SF Pro Rounded',
    fontWeight: '400',
    wordWrap: 'break-word',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 400,  // Hauteur de l'image pour ressembler à Instagram
    borderRadius: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  postTextContainer: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    marginTop: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '400',
    marginLeft: 5,
  },
  commentSection: {
    marginTop: 20,
  },
  commentTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentContainer: {
    marginBottom: 10,
  },
  commentUser: {
    color: '#aaa',
    fontWeight: 'bold',
  },
  commentText: {
    color: 'white',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#333',
    color: 'white',
    padding: 10,
    borderRadius: 20,
  },
  commentButton: {
    backgroundColor: '#444',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 20,
  },
  commentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  navBar: {
    width: '100%',
    paddingTop: 14,
    paddingBottom: 50, // Augmenter encore la hauteur de la barre de navigation
    paddingLeft: 36,
    paddingRight: 37,
    backgroundColor: '#161616',
    borderTopWidth: 1,
    borderTopColor: 'rgba(208, 213, 216, 0.50)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  navBarContent: {
    width: 320,
    position: 'relative',
  },
  navBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  homeContainer: {
    left: 0,
    top: 0,
  },
  searchContainer: {
    left: 95,
    top: 0,
  },
  communitiesContainer: {
    left: 190,
    top: 0,
  },
  userCountContainer: {
    left: 285,
    top: 0,
  },
  profileContainer: {
    left: 380,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;