import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useBookedCourses } from '../context/BookedCoursesContext';

const BookedScreen = () => {
  const router = useRouter();
  const { bookedCourses, removeBookedCourse } = useBookedCourses();
  const [searchText, setSearchText] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(bookedCourses);

  useEffect(() => {
    const filtered = bookedCourses.filter(course =>
      course.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchText, bookedCourses]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#ADD8E6', '#FFFFFF']} style={styles.headerGradient} />

      <TextInput
        style={styles.searchInput}
        placeholder="Search your booked courses..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <Text style={styles.header}>MY COURSES LIST</Text>

      {filteredCourses.length > 0 ? (
        <FlatList
          data={filteredCourses}
          renderItem={({ item }) => (
            <View style={styles.courseRow}>
              <Text style={styles.courseItem}>{item.name}</Text>
              <TouchableOpacity onPress={() => removeBookedCourse(item.id)}>
                <Image source={require('../../assets/images/close.png')} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.emptyText}>No matching courses found.</Text>
      )}

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
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  headerGradient: {
    width: '100%',
    height: 97,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingBottom: 15,
    paddingTop: 15,
  },
  searchInput: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    margin: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'rgb(3, 74, 146)',
  },
  courseRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D0E7FF',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  
  courseItem: {
    fontSize: 18,
    color: '#333',
  },
  deleteIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
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

export default BookedScreen;
