import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const conversations = [
  { id: '1', userName: 'User1', lastMessage: 'Hello!' },
  { id: '2', userName: 'User2', lastMessage: 'How are you?' },
  // Ajoutez plus de conversations ici
];

const ConversationsScreen: React.FC = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: { id: string; userName: string; lastMessage: string } }) => (
    <TouchableOpacity style={styles.conversationItem} onPress={() => navigation.navigate('ChatScreen', { userName: item.userName })}>
      <Text style={styles.userName}>{item.userName}</Text>
      <Text style={styles.lastMessage}>{item.lastMessage}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Conversations</Text>
      </View>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40, // Ajouter une marge supérieure pour descendre le header
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  conversationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: 'gray',
    fontSize: 14,
  },
});

export default ConversationsScreen;