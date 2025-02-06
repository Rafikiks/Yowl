import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video'; // Importation du composant Video
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importation des icônes

const { width, height } = Dimensions.get('window');

// Liste initiale des vidéos locales (MP4)
const initialVideos = [
  { id: '1', videoUrl: require('../assets/vidéo1.mp4') }, // Exemple de vidéo locale
  // Ajoutez plus de vidéos ici
];

const VideoFeedScreen: React.FC = () => {
  const navigation = useNavigation();
  const [videos, setVideos] = useState(initialVideos);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMoreVideos = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      // Simuler le chargement de plus de vidéos
      setTimeout(() => {
        const moreVideos = [
          { id: (videos.length + 1).toString(), videoUrl: require('../assets/vidéo1.mp4') },
          // Ajoutez plus de vidéos ici
        ];
        setVideos([...videos, ...moreVideos]);
        setLoadingMore(false);
      }, 1500);
    }
  };

  const renderItem = ({ item }: { item: { id: string; videoUrl: any } }) => (
    <View style={styles.videoCard}>
      <Video
        source={item.videoUrl} // Utilisation du fichier local
        style={styles.video}
        resizeMode="cover"
        controls
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onError={(error) => console.log("Video load error: ", error)} // Gérer les erreurs
      />
      {loading && <ActivityIndicator size="large" color="#BB1DF0" style={styles.loader} />}
      <View style={styles.videoOverlay}>
        <View style={styles.videoHeader}>
          <Text style={styles.headerText}>Redemptor</Text>
          <Text style={styles.subHeaderText}>Florian_le_fou</Text>
        </View>
        <View style={styles.videoFooter}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chatbubble-outline" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="ellipsis-horizontal" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.tabText}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabTextActive}>Vidéos</Text>
          <View style={styles.tabIndicator} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={loadMoreVideos}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#BB1DF0" /> : <View style={{ height: 20 }} />}
        pagingEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'transparent', // Fond transparent
    position: 'absolute',
    top: 40, // Positionner plus bas
    width: '100%',
    zIndex: 1,
  },
  tabButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'SF Pro Text',
    fontWeight: '400',
  },
  tabTextActive: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'SF Pro Text',
    fontWeight: '700',
  },
  tabIndicator: {
    width: 28,
    height: 1,
    backgroundColor: 'white',
    marginTop: 4,
  },
  videoCard: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  videoOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    padding: 20,
  },
  videoHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'SF Pro Rounded',
    fontWeight: '600',
  },
  subHeaderText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'SF Pro Text',
    fontWeight: '400',
  },
  videoFooter: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  iconButton: {
    marginVertical: 10,
  },
});

export default VideoFeedScreen;