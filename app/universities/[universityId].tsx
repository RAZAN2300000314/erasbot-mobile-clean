import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { universityCourses } from '../data/universityCourses';
import UniversityCoursesScreen from './UniversityCoursesScreen';

type UniversityKey = keyof typeof universityCourses;

export default function UniversityCoursesWrapper() {
  const { universityId } = useLocalSearchParams<{ universityId?: string }>();

  const isValidUniversity =
    universityId !== undefined &&
    Object.keys(universityCourses).includes(universityId);

  if (!isValidUniversity) {
    return <Text style={styles.error}>University not found.</Text>;
  }

  return <UniversityCoursesScreen universityId={universityId as string} />;
}

const styles = StyleSheet.create({
  error: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
});
