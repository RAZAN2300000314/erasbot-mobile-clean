import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const openCalendar = () => Linking.openURL('content://com.android.calendar/time/');
  const openEmailApp = () => Linking.openURL('mailto:');
  const openAnnouncements = () => {
    Linking.openURL('https://www.iku.edu.tr/en/announcements').catch(err =>
      console.error('An error occurred', err)
    );
  };
  const showAPIsAlert = () => Alert.alert('APIs', t('apiAlert'));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient colors={['#99d0e0', colors.background]} style={styles.headerGradient}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={openCalendar}>
            <Image source={require('../../assets/images/calendar.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openEmailApp}>
            <Image source={require('../../assets/images/email.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://aday.iku.edu.tr/tr/erasmus')}
          style={styles.background}
        >
          <Image
            source={require('../../assets/images/background.jpg')}
            style={styles.backgroundImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/UniversitiesScreen')} style={styles.centeredItem}>
          <Image source={require('../../assets/images/university.png')} style={styles.middleImage} />
          <Text style={[styles.labelText, { color: colors.text }]}>{t('universities')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/APIsScreen')} style={styles.centeredItem}>
          <Image source={require('../../assets/images/apis.png')} style={styles.middleImage} />
          <Text style={[styles.labelText, { color: colors.text }]}>{t('apis')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => router.push('/FeedbackScreen')} style={styles.centeredItem}>
          <Image source={require('../../assets/images/Feedback.png')} style={styles.middleImage} />
          <Text style={[styles.labelText, { color: colors.text }]}>{t('feedbackSection')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/ECTS')} style={styles.centeredItem}>
          <Image source={require('../../assets/images/ECTS.png')} style={styles.middleImage} />
          <Text style={[styles.labelText, { color: colors.text }]}>{t('ECTS')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <FooterIcon onPress={() => router.push('/(tabs)/homeScreen')} imageSource={require('../../assets/images/home.png')} label={t('home')} />
        <FooterIcon onPress={openAnnouncements} imageSource={require('../../assets/images/announcement.png')} label={t('advisory')} />
        <FooterIcon onPress={() => router.push('/(tabs)/erasbot')} imageSource={require('../../assets/images/erasbot.png')} label="ERASbot" />
        <FooterIcon onPress={() => router.push('/(tabs)/account')} imageSource={require('../../assets/images/account.png')} label={t('account')} />
        <FooterIcon onPress={() => router.push('/(tabs)/settings')} imageSource={require('../../assets/images/settings.png')} label={t('settings')} />
      </View>
    </View>
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
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  headerGradient: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingBottom: 15,
    paddingTop: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
    resizeMode: 'contain',
    tintColor: '#003366',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 20,
  },
  centeredItem: {
    alignItems: 'center',
  },
  middleImage: {
    width: 120,
    height: 150,
    resizeMode: 'contain',
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  background: {
    borderRadius: 17,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  backgroundImage: {
    maxWidth: '100%',
    width: 290,
    height: 140,
    resizeMode: 'cover',
    borderRadius: 10,
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

export default HomeScreen;