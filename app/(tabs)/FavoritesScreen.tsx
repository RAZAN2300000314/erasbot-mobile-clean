// app/(tabs)/FavoritesScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { LinearGradient } from 'expo-linear-gradient';

const FavoritesScreen = () => {
  const { favorites, removeFavorite } = useFavorites();

  const renderItem = ({ item }: any) => (
    <View style={styles.favoriteItem}>
      <View>
        <Text style={styles.courseName}>{item.name}</Text>
        <Text style={styles.courseCode}>Code: {item.courseCode}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFavorite(item.courseCode)}>
        <Image source={require('../../assets/images/close.png')} style={styles.removeIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#ADD8E6', '#FFFFFF']} style={styles.headerGradient}>
        <Text style={styles.screenTitle}>My Favorites</Text>
      </LinearGradient>

      {favorites.length === 0 ? (
        <Text style={styles.noFavorites}>You haven't added any courses yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.courseCode}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerGradient: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#003366',
  },
  noFavorites: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#000',
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#D0E7FF',
    borderRadius: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#003366',
  },
  courseCode: {
    fontSize: 14,
    color: '#555',
  },
  removeIcon: {
    width: 20,
    height: 20,
    tintColor: '#cc0000',
  },
});
