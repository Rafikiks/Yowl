import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions, ActivityIndicator 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const defaultPreferences = [
  { id: '1', nom: 'Sport', imageUrl: 'http://localhost:1337/uploads/10371437_2697fe5304.webp' },
  { id: '2', nom: 'Cuisine', imageUrl: 'http://localhost:1337/uploads/telechargement_1_92979fadcf.jpeg' },
  { id: '3', nom: 'Jeux & Tech', imageUrl: 'http://localhost:1337/uploads/telechargement_7f1746e255.jpeg' },
  { id: '4', nom: 'Litterature& Apprentissage', imageUrl: 'http://localhost:1337/uploads/etude_de_l_apprentissage_de_la_litterature_livre_de_pile_j82wbc_ba1b096f09.jpg' },
  { id: '5', nom: 'Musique', imageUrl: 'http://localhost:1337/uploads/images_8d48246a4d.jpeg' },
  { id: '6', nom: 'Arts', imageUrl: 'http://localhost:1337/uploads/istockphoto_636761588_612x612_6386b87e5b.jpg' },
  { id: '7', nom: 'Voyages & Nature', imageUrl: 'http://localhost:1337/uploads/12325430_4db98d52b9.webp' }
];

const PreferencesScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const togglePreference = (id: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(id) ? prev.filter((pref) => pref !== id) : [...prev, id]
    );
  };

  const savePreferences = async () => {
    if (selectedPreferences.length === 0) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:1337/api/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences: selectedPreferences }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l’enregistrement des préférences.');
      }

      console.log('Préférences enregistrées avec succès !');
      navigation.navigate('HomeScreen');

    } catch (error) {
      console.error('Erreur :', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>

      <FlatList
        data={defaultPreferences}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.card, 
              selectedPreferences.includes(item.id) && styles.selectedCard
            ]} 
            onPress={() => togglePreference(item.id)}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.itemText}>{item.nom}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.backButton} onPress={savePreferences} disabled={loading}>
        {loading ? <ActivityIndicator color="black" /> : <Text style={styles.backButtonText}>Next</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#161616',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 10,
    width: width * 0.4,
    height: 150,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: '#BB1DF0',
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#D0D5D8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default PreferencesScreen;