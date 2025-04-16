import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFavorites } from '../context/FavoritesContext';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../context/UserContext'; // ✅ Import user context

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const { favorites } = useFavorites();
  const { userName, profileImage, setProfileImage } = useUser(); // ✅ From context

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access media library is required!');
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const openEmail = () => Linking.openURL('mailto:kultur@iku.edu.tr');
  const makeCall = (phone: string) => Linking.openURL(`tel:${phone}`);
  const openSocial = (url: string) => Linking.openURL(url);

  const FooterIcon = ({
    onPress,
    imageSource,
    label,
  }: {
    onPress: () => void;
    imageSource: any;
    label: string;
  }) => (
    <TouchableOpacity style={styles.footerItem} onPress={onPress}>
      <Image source={imageSource} style={styles.footerIcon} />
      <Text style={styles.footerText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient colors={['#ADD8E6', '#FFFFFF']} style={styles.headerGradient}>
          <Text style={styles.screenTitle}>My Profile</Text>
        </LinearGradient>

        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('../../assets/images/userpic.png')
            }
            style={styles.profilePic}
          />
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>

        <Text style={styles.optionText}>{userName || 'Guest'}</Text>
        <View style={styles.divider} />

        <Text style={styles.optionText}>Notifications</Text>
        <View style={styles.divider} />

        <TouchableOpacity onPress={() => router.push('/(tabs)/FavoritesScreen')}>
          <Text style={styles.sectionTitle}>My Favorites</Text>
        </TouchableOpacity>
        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Contact Info</Text>
        <View style={styles.contactRow}>
          <TouchableOpacity onPress={openEmail}>
            <Image source={require('../../assets/images/email.png')} style={styles.contactIcon} />
            <Text style={styles.iconLabel}>kultur@iku.edu.tr</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => makeCall('02124984141')}>
            <Image source={require('../../assets/images/phone.jpg')} style={styles.contactIcon} />
            <Text style={styles.iconLabel}>(0212) 498 41 41</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => makeCall('02124984306')}>
            <Image source={require('../../assets/images/telephone.png')} style={styles.contactIcon} />
            <Text style={styles.iconLabel}>(0212) 498 43 06</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialRow}>
          <View style={styles.iconWithLabel}>
            <TouchableOpacity onPress={() => openSocial('https://www.facebook.com/IKUEDU')}>
              <Image source={require('../../assets/images/facebook.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>İstanbul Kültür Üniversitesi</Text>
          </View>
          <View style={styles.iconWithLabel}>
            <TouchableOpacity onPress={() => openSocial('https://www.instagram.com/kulturuniversity/')}>
              <Image source={require('../../assets/images/instagram.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>@kulturuniversity</Text>
          </View>
          <View style={styles.iconWithLabel}>
            <TouchableOpacity onPress={() => openSocial('https://twitter.com/Kultur_uni')}>
              <Image source={require('../../assets/images/twitter.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <Text style={styles.iconLabel}>@Kultur_uni</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { alignItems: 'center' },
  headerGradient: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#003366',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 5,
  },
  changePhotoText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 15,
  },
  optionText: {
    fontSize: 24,
    color: '#003366',
    fontWeight: '300',
    marginVertical: 8,
  },
  divider: {
    width: '74%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '300',
    marginTop: 20,
    marginBottom: 10,
    color: '#003366',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
  },
  contactIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
    marginBottom: 40,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 2,
  },
  iconWithLabel: {
    alignItems: 'center',
    width: 90,
  },
  iconLabel: {
    fontSize: 10,
    textAlign: 'center',
    color: '#555',
    marginTop: 5,
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
  footerItem: {
    alignItems: 'center',
  },
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

export default ProfileScreen;