import React, { useState, useRef, useId } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Video from 'react-native-video'; // Importation du composant Video
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importation des icônes

const { width, height } = Dimensions.get('window');

// Liste initiale des vidéos locales (MP4)
const initialVideos = [
  { id: '1', videoUrl: require('../assets/vidéo1.mp4') },
  { id: '2', videoUrl: require('../assets/vidéo2.mp4') },
  { id: '3', videoUrl: require('../assets/vidéo3.mp4') },
  { id: '4', videoUrl: require('../assets/vidéo4.mp4') },
  { id: '5', videoUrl: require('../assets/vidéo5.mp4') },
  { id : '6', videoUrl: require('../assets/vidéo6.mp4') },
  {id:'7', videoUrl: require('../assets/vidéo7.mp4')},
];

const VideoFeedScreen: React.FC = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Vérifier si l'écran est focalisé
  const [videos, setVideos] = useState(initialVideos);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // État pour suivre l'index de la vidéo actuellement visible
  const videoRefs = useRef<Video[]>([]); // Références aux composants Video

  const loadMoreVideos = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      // Simuler le chargement de plus de vidéos
      setTimeout(() => {
        const moreVideos = [
          { id: (videos.length + 1).toString(), videoUrl: require('../assets/vidéo1.mp4') },
          { id: (videos.length + 2).toString(), videoUrl: require('../assets/vidéo2.mp4') },
          { id: (videos.length + 3).toString(), videoUrl: require('../assets/vidéo3.mp4') },
          { id: (videos.length + 4).toString(), videoUrl: require('../assets/vidéo4.mp4') },
          { id: (videos.length + 5).toString(), videoUrl: require('../assets/vidéo5.mp4') },
          { id: (videos.length + 6).toString(), videoUrl: require('../assets/vidéo6.mp4') },
          { id: (videos.length + 7).toString(), videoUrl: require('../assets/vidéo7.mp4') },
           // Ajoutez plus de vidéos ici
           // Ajoutez plus de vidéos ici

        ];
        setVideos([...videos, ...moreVideos]);
        setLoadingMore(false);
      }, 1500);
    }
  };

  const handleViewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentVideoIndex(index);
    }
  };

  const renderItem = ({ item, index }: { item: { id: string; videoUrl: any }, index: number }) => (
    <View style={styles.videoCard}>
      <Video
        ref={(ref) => (videoRefs.current[index] = ref!)} // Stocker la référence du composant Video
        source={item.videoUrl} // Utilisation du fichier local
        style={styles.video}
        resizeMode="cover"
        controls
        paused={!isFocused || currentVideoIndex !== index} // Mettre en pause si ce n'est pas la vidéo actuelle ou si l'écran n'est pas focalisé
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onError={(error) => console.log("Video load error: ", error)} // Gérer les erreurs
      />
      {loading && <ActivityIndicator size="large" color="#BB1DF0" style={styles.loader} />}
      <View style={styles.videoOverlay}>
        <View style={styles.videoHeader}>
          <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/35x35' }} />
        </View>
        <View style={styles.videoFooter}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chatbubble-outline" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="ellipsis-horizontal" size={35} color="white" />
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
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  videoFooter: {
    flexDirection: 'column', // Mettre les icônes à la verticale
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginBottom: 50, // Remonter les boutons
  },
  iconButton: {
    marginVertical: 10,
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

export default VideoFeedScreen;