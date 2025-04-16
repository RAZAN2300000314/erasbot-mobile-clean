import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '../context/ThemeContext';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {
  const router = useRouter();
  const { theme, isDarkMode, toggleTheme } = useAppTheme();
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const changeLanguage = (lang: 'en' | 'tr') => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang === 'tr' ? 'Türkçe' : 'English');
  };

  useEffect(() => {
    const currentLang = i18n.language === 'tr' ? 'Türkçe' : 'English';
    setSelectedLanguage(currentLang);
  }, [i18n.language]);

  const handleLogout = () => {
    console.log('User Logged Out');
    router.replace('/LoginScreen');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={['#ADD8E6', colors.background]}
        style={styles.headerGradient}
      >
        <Text style={[styles.screenTitle, { color: colors.text }]}>{t('settings')}</Text>
      </LinearGradient>

      {/* Language Selector */}
      <View style={styles.languageSelector}>
        <View style={styles.languageRow}>
          <Image
            source={require('../../assets/images/language1.png')}
            style={styles.languageIcon}
          />
          <Text style={[styles.label, { color: colors.text, marginLeft: 10 }]}> {t('language')} </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10, marginLeft: 5 }}>
          <TouchableOpacity onPress={() => changeLanguage('en')}>
            <Text style={[styles.languageText, { color: selectedLanguage === 'English' ? colors.primary : colors.text }]}> English </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeLanguage('tr')}>
            <Text style={[styles.languageText, { color: selectedLanguage === 'Türkçe' ? colors.primary : colors.text }]}> Türkçe </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dark Mode Toggle */}
      <TouchableOpacity onPress={toggleTheme} style={styles.settingOption}>
        <Image
          source={require('../../assets/images/darkmode.png')}
          style={[styles.settingIcon, { width: 130, height: 130, marginRight: -7 }]}
        />
        <Text style={[styles.label, { color: colors.text }]}>{t('darkMode')}</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity onPress={handleLogout} style={styles.settingOption}>
        <Image
          source={require('../../assets/images/logout.png')}
          style={styles.settingIcon}
        />
        <Text style={[styles.label, { color: colors.text }]}>{t('logout')}</Text>
      </TouchableOpacity>

      {/* Footer Navigation */}
      <View style={[styles.footer, { backgroundColor: colors.card }]}>
        <FooterIcon
          onPress={() => router.push('/(tabs)/homeScreen')}
          imageSource={require('../../assets/images/home.png')}
          label={t('education')}
        />
        <FooterIcon
          onPress={() => router.push('/(tabs)/erasbot')}
          imageSource={require('../../assets/images/erasbot.png')}
          label="ERASbot"
        />
        <FooterIcon
          onPress={() => router.push('/(tabs)/account')}
          imageSource={require('../../assets/images/account.png')}
          label={t('account')}
        />
        <FooterIcon
          onPress={() => router.push('/(tabs)/BookedScreen')}
          imageSource={require('../../assets/images/booked.png')}
          label={t('booked')}
        />
        <FooterIcon
          onPress={() => router.push('/(tabs)/settings')}
          imageSource={require('../../assets/images/settings.png')}
          label={t('settings')}
        />
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
  },
  headerGradient: {
    width: '100%',
    height: 97,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingBottom: 5,
    paddingTop: 15,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingIcon: {
    width: 70,
    height: 60,
    marginRight: 20,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  languageSelector: {
    flexDirection: 'column',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  languageText: {
    fontSize: 14,
    marginRight: 10,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
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
  },
});

export default SettingsScreen;
