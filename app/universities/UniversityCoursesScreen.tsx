import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFavorites } from '../context/FavoritesContext';
import { useBookedCourses } from '../context/BookedCoursesContext';
import { universityCourses } from '../data/universityCourses';

type Course = {
  id: string;
  name: string;
  courseCode: string;
};

type UniversityCoursesScreenProps = {
  universityId: string;
};

export default function UniversityCoursesScreen({ universityId }: UniversityCoursesScreenProps) {
  const router = useRouter();
  const { addFavorite } = useFavorites();
  const { addBookedCourse } = useBookedCourses();
  const [searchText, setSearchText] = useState('');

  const university = universityCourses[universityId];
  if (!university) {
    return <Text style={styles.error}>University not found.</Text>;
  }

  const filteredCourses = university.courses.filter((course) =>
    course.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#ADD8E6', '#FFFFFF']} style={styles.headerGradient} />
      <TextInput
        style={styles.searchBar}
        placeholder="Search courses..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Text style={styles.header}>{university.name} Courses</Text>

      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.courseCode}
        renderItem={({ item }) => {
          const courseWithId = { ...item, id: item.courseCode }; // Ensure 'id' for FavoritesContext
          return (
            <View style={styles.courseContainer}>
              <View style={styles.courseInfo}>
                <Text style={styles.courseName}>{item.name}</Text>
                <Text style={styles.courseDetails}>Code: {item.courseCode}</Text>
              </View>
              <View style={styles.courseActions}>
                <TouchableOpacity onPress={() => addBookedCourse(courseWithId)} style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addFavorite(courseWithId)}>
                  <Image source={require('../../assets/images/heart.png')} style={styles.heartIcon} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <View style={styles.footer}>
        <FooterIcon onPress={() => router.push('/(tabs)/homeScreen')} imageSource={require('../../assets/images/home.png')} label="Education" />
        <FooterIcon onPress={() => router.push('/(tabs)/erasbot')} imageSource={require('../../assets/images/erasbot.png')} label="ERASbot" />
        <FooterIcon onPress={() => router.push('/(tabs)/account')} imageSource={require('../../assets/images/account.png')} label="Account" />
        <FooterIcon onPress={() => router.push('/(tabs)/BookedScreen')} imageSource={require('../../assets/images/booked.png')} label="Booked" />
        <FooterIcon onPress={() => router.push('/(tabs)/settings')} imageSource={require('../../assets/images/settings.png')} label="Settings" />
      </View>
    </View>
  );
}

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
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerGradient: {
    width: '100%',
    height: 97,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 15,
  },
  searchBar: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    margin: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  header: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'rgb(26, 71, 117)',
  },
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#D0E7FF',
    borderRadius: 10,
    marginVertical: 5,
    width: '95%',
    alignSelf: 'center',
  },
  courseInfo: { flex: 1 },
  courseName: { fontSize: 18, fontWeight: 'bold', color: '#003366' },
  courseDetails: { fontSize: 14, color: '#555' },
  courseActions: { flexDirection: 'row', alignItems: 'center' },
  addButton: {
    backgroundColor: '#A6CFFF',
    borderRadius: 13,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButtonText: { fontSize: 15, color: '#fff' },
  heartIcon: { width: 28, height: 28 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
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
  error: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
});
