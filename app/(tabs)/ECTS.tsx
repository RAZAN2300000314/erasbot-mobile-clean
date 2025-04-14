import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { ectsData } from '../data/ectsData';
import { useRouter } from 'expo-router';

type Course = {
  code?: string;
  name?: string;
  grade?: number | string;
  localGrade?: string;
  ikuGrade?: string;
  ectsGrade?: string;
  ects: number | string;
  note?: string;
};

type UniversityData = {
  university: string;
  courses: Course[];
};

const ECTS = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredUniversities = ectsData.filter((univ: UniversityData) =>
    univ.university.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient colors={['#ADD8E6', colors.background]} style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>ECTS Tables</Text>
      </LinearGradient>

      {/* Search Bar */}
      <TextInput
        style={[styles.searchInput, { borderColor: colors.border, color: colors.text }]}
        placeholder="Search university"
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      {/* Scrollable Table Data */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredUniversities.map((univ, index) => (
          <View key={index} style={styles.universitySection}>
            <Text style={[styles.universityTitle, { color: colors.primary }]}>📘 {univ.university}</Text>

            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Code</Text>
              <Text style={styles.tableHeaderText}>Course</Text>
              <Text style={styles.tableHeaderText}>Grade</Text>
              <Text style={styles.tableHeaderText}>ECTS</Text>
            </View>

            {univ.courses.map((course: Course, idx: number) => (
              <View key={idx} style={styles.tableRow}>
                <Text style={styles.tableCell}>{course.code ?? '—'}</Text>
                <Text style={styles.tableCell}>{course.name ?? '—'}</Text>
                <Text style={styles.tableCell}>
                  {('grade' in course && course.grade !== undefined) ? course.grade
                    : ('localGrade' in course && course.localGrade !== undefined) ? course.localGrade
                    : ('ikuGrade' in course && course.ikuGrade !== undefined) ? course.ikuGrade
                    : ('ectsGrade' in course && course.ectsGrade !== undefined) ? course.ectsGrade
                    : '—'}
                </Text>
                <Text style={styles.tableCell}>{course.ects}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer */}
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 90,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgb(19, 85, 151)',
  },
  searchInput: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    margin: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  universitySection: {
    marginBottom: 30,
  },
  universityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e0e0e0',
    padding: 6,
    borderRadius: 4,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
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

export default ECTS;
