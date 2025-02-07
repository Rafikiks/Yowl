import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Video from 'react-native-video'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import DocumentPicker from 'react-native-document-picker'; 

const { width, height } = Dimensions.get('window');

// 📂 Liste des vidéos locales
const initialVideos = [
  { id: '1', videoUrl: require('../assets/vidéo1.mp4') },
  
  { id: '3', videoUrl: require('../assets/vidéo3.mp4') }, 
];

const VideoFeedScreen: React.FC = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); 
  const [videos, setVideos] = useState(initialVideos);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<Video[]>([]); 

  // 📂 Ajouter une vidéo depuis les fichiers
  const addVideo = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.video,
      });
      setVideos([...videos, { id: (videos.length + 1).toString(), videoUrl: res.uri }]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("Sélection annulée");
      } else {
        console.error("Erreur lors de la sélection de la vidéo : ", err);
      }
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
        ref={(ref) => (videoRefs.current[index] = ref!)}
        source={typeof item.videoUrl === 'string' ? { uri: item.videoUrl } : item.videoUrl}
        style={styles.video}
        resizeMode="cover"
        controls
        paused={!isFocused || currentVideoIndex !== index}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onError={(error) => console.log("Erreur de lecture de la vidéo : ", error)}
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

      {/* 📂 Bouton pour ajouter une vidéo */}
      <TouchableOpacity style={styles.addButton} onPress={addVideo}>
        <Text style={styles.addButtonText}>+ Ajouter une Vidéo</Text>
      </TouchableOpacity>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
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
    position: 'absolute',
    top: 40,
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
    fontWeight: '400',
  },
  tabTextActive: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  tabIndicator: {
    width: 28,
    height: 1,
    backgroundColor: 'white',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#BB1DF0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
    marginTop: 80, 
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    fontWeight: '600',
  },
  subHeaderText: {
    color: 'white',
    fontSize: 14,
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