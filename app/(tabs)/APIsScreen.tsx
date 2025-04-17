import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchFeatureToggles } from '../../services/toogleService'; // ✅ ONLY this

interface ApiItem {
  id: string;
  title: string;
  description: string;
  image: any;
  url: string;
  enabled: boolean;
}

const APIsScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [apiItems, setApiItems] = useState<ApiItem[]>([]);

  useEffect(() => {
    const loadToggles = async () => {
      const toggles = await fetchFeatureToggles(); // ✅ Firestore-based config

      setApiItems([
        {
          id: '1',
          title: 'TripAdvisor',
          description: 'TripAdvisor helps students explore top-rated restaurants, attractions, and local experiences during their Erasmus stay.',
          image: require('../../assets/images/tripadvisor.png'),
          url: 'https://www.tripadvisor.com/',
          enabled: toggles.tripadvisor,
        },
        {
          id: '2',
          title: 'Yelp',
          description: 'Yelp provides reviews and recommendations on local businesses, making it easier for students to find food, services, and entertainment nearby.',
          image: require('../../assets/images/yelp.png'),
          url: 'https://www.yelp.com/',
          enabled: toggles.yelp,
        },
        {
          id: '3',
          title: 'Weather',
          description: 'OpenWeather gives students real-time weather updates, helping them plan their activities and stay prepared for all conditions.',
          image: require('../../assets/images/weather.png'),
          url: 'https://www.meteored.com/',
          enabled: toggles.weather,
        },
        {
          id: '4',
          title: 'Google Maps',
          description: 'Google Maps assists students in navigating their new city, finding key locations, and planning efficient travel routes.',
          image: require('../../assets/images/map.png'),
          url: 'https://www.google.com/maps',
          enabled: toggles.maps,
        },
      ]);
    };

    loadToggles();
  }, []);

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  const filteredItems = apiItems
    .filter(item => item.enabled)
    .filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <LinearGradient colors={['#ADD8E6', '#FFFFFF']} style={styles.headerGradient}>
        <Text style={styles.screenTitle}>APIs Management</Text>
      </LinearGradient>

      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search APIs..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {filteredItems.map(item => (
        <View key={item.id}>
          <Text style={styles.apiTitle}>{item.title}</Text>
          <TouchableOpacity onPress={() => openLink(item.url)}>
            <Image source={item.image} style={styles.apiImage} />
          </TouchableOpacity>
          <Text style={styles.apiText}>{item.description}</Text>
        </View>
      ))}

      <View style={styles.footer}>
        <FooterIcon onPress={() => router.push('/(tabs)/homeScreen')} imageSource={require('../../assets/images/home.png')} label="Education" />
        <FooterIcon onPress={() => router.push('/(tabs)/erasbot')} imageSource={require('../../assets/images/erasbot.png')} label="ERASbot" />
        <FooterIcon onPress={() => router.push('/(tabs)/account')} imageSource={require('../../assets/images/account.png')} label="Account" />
        <FooterIcon onPress={() => router.push('/(tabs)/BookedScreen')} imageSource={require('../../assets/images/booked.png')} label="Booked" />
        <FooterIcon onPress={() => router.push('/(tabs)/settings')} imageSource={require('../../assets/images/settings.png')} label="Settings" />
      </View>
    </ScrollView>
  );
};

type FooterIconProps = {
  onPress: () => void;
  imageSource: any;
  label: string;
};

const FooterIcon: React.FC<FooterIconProps> = ({ onPress, imageSource, label }) => (
  <TouchableOpacity style={styles.footerItem} onPress={onPress}>
    <Image source={imageSource} style={styles.footerIcon} />
    <Text style={styles.footerText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 3 },
  scrollContent: { paddingBottom: 120 },
  headerGradient: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 15,
  },
  header: { alignItems: 'center', marginBottom: 20 },
  searchBar: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    margin: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    alignSelf: 'center',
    marginTop: 10,
  },
  apiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center',
    color: '#000',
  },
  apiImage: {
    width: '100%',
    height: 90,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  apiText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
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
  footerIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  footerText: {
    fontSize: 11,
    marginTop: 5,
    color: '#000',
  },
});

export default APIsScreen;
