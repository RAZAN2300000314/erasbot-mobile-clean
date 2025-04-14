import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, ResizeMode } from 'expo-av';
import { useFavorites } from '../context/FavoritesContext';
const universities = [
  { id: 'iku', name: 'Istanbul Kultur University' },
  { id: 'nurnberg', name: 'Tenchische Hochschul Nürnberg Georg Simon Ohm' },
  { id: 'deggendorf', name: 'Deggendorf Institute of Technology' },
  { id: 'oulu', name: 'University of Oulu' },
  { id: 'alcala', name: 'Universidad de Alcalá' },
  { id: 'vsb', name: 'VSB Technical University of Ostrava' },
  { id: 'jonkoping', name: 'Jönköping University' },
  { id: 'lodzTech', name: 'Lodz University of Technology' },
  { id: 'paedubice', name: 'University of Paedubice' },
  { id: 'tallinn', name: 'Tallinn University of Technology' },
  { id: 'daffodil', name: 'Daffodil International University' },
  { id: 'lodz', name: 'University of Lodz' },
  { id: 'nysa', name: 'Nysa University of Applied Sciences' },
  { id: 'karlsruhe', name: 'Hochschule Karlsruhe' },
];

const UniversitiesScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const filteredUniversities = universities.filter(u =>
    u.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (universityId: string) => {
    router.push({ pathname: '/universities/[universityId]', params: { universityId } });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#ADD8E6', '#FFFFFF']} style={styles.headerGradient} />
      <TextInput
        style={styles.searchBar}
        placeholder="Search universities..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Text style={styles.header}>Available Universities</Text>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredUniversities.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.universityItem}
            onPress={() => handleSelect(item.id)}
          >
            <Text style={styles.universityText}>{item.name}</Text>
          </TouchableOpacity>
        ))}

        <Video
          source={require('../../assets/videos/youtube.mp4')}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          style={{
            width: '90%',
            height: 200,
            alignSelf: 'center',
            marginVertical: 20,
          }}
        />
      </ScrollView>

      <View style={styles.footer}>
        <FooterIcon onPress={() => router.push('/(tabs)/homeScreen')} imageSource={require('../../assets/images/home.png')} label="Education" />
        <FooterIcon onPress={() => router.push('/(tabs)/erasbot')} imageSource={require('../../assets/images/erasbot.png')} label="ERASbot" />
        <FooterIcon onPress={() => router.push('/(tabs)/account')} imageSource={require('../../assets/images/account.png')} label="Account" />
        <FooterIcon onPress={() => router.push('/(tabs)/BookedScreen')} imageSource={require('../../assets/images/booked.png')} label="Booked" />
        <FooterIcon onPress={() => router.push('/(tabs)/settings')} imageSource={require('../../assets/images/settings.png')} label="Settings" />
      </View>
    </View>
  );
};

const FooterIcon = ({ onPress, imageSource, label }: { onPress: () => void, imageSource: any, label: string }) => (
  <TouchableOpacity style={styles.footerItem} onPress={onPress}>
    <Image source={imageSource} style={styles.footerIcon} />
    <Text style={styles.footerText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center' },
  headerGradient: {
    width: '100%', height: 90,
    justifyContent: 'center', alignItems: 'flex-end',
    paddingRight: 20, paddingBottom: 15, paddingTop: 15,
  },
  searchBar: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    margin: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  
  header: {
    fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: 'rgb(19, 85, 151)',
  },
  universityItem: {
    backgroundColor: '#D0E7FF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
  },
  universityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003366',
  },
  scrollContent: { paddingBottom: 130 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 8,
    zIndex: 10,
  },
  footerItem: { alignItems: 'center' },
  footerIcon: { width: 30, height: 30, resizeMode: 'contain' },
  footerText: { fontSize: 11, marginTop: 5, color: '#000' },
});

export default UniversitiesScreen;
