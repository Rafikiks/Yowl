import React, { useState, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions, ScrollView, TextInput
} from 'react-native';
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
  const [posts, setPosts] = useState<any[]>([]); // État pour stocker les posts
  const [newComment, setNewComment] = useState('');  // État pour stocker le nouveau commentaire

  useEffect(() => {
    // Utilisation de l'API JSONPlaceholder pour récupérer des posts
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        // Formater les données pour ajouter une image aléatoire, likes et commentaires
        const formattedData = data.slice(0, 10).map(post => ({
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header avec les boutons icônes */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ghost</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="chatbubbles" size={28} color="white" />  {/* Icône de chat */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome5 name="heart" size={28} color="white" />  {/* Icône de coeur */}
            </TouchableOpacity>
          </View>
        </View>

        {/* Publication Section */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <Text style={styles.postUser}>{item.userName}</Text>
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
      <View style={styles.iconContainer}>
        {icons.map((icon) => (
          <TouchableOpacity key={icon.id} style={styles.iconButton}>
            <Ionicons 
              name={icon.icon}  // Utilisation de l'icône venant de react-native-vector-icons
              size={28} 
              color="white" 
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    borderBottomColor: '#333',
    backgroundColor: '#000',
    marginTop: 20,
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
    height: 400,  // Hauteur de l'image pour ressembler à Instagram
    borderRadius: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 14,
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
  iconContainer: {
    position: 'absolute',
    bottom: 0, // La barre est fixée au bas de l'écran
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',  // Les icônes sont espacées de manière égale
    alignItems: 'center',  // Alignement vertical des icônes
    backgroundColor: '#222',  // Fond noir
    paddingVertical: 15,  // Un peu plus de padding vertical pour augmenter la taille de la barre
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingHorizontal: 30,  // Espacement horizontal entre les icônes
    height: 80,  // Hauteur de la barre des icônes
  },
});

export default HomeScreen;