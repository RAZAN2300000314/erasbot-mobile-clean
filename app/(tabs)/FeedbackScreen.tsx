import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { submitFeedback } from '../../services/feedbackService';
import { useTheme } from '@react-navigation/native';

const FeedbackScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const { colors } = useTheme();

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      Alert.alert('Missing Information', 'Please fill in all fields before submitting.');
      return;
    }

    const success = await submitFeedback({
      name,
      email,
      subject,
      message,
    });

    if (success) {
      Alert.alert('Thank You!', 'Your feedback has been submitted.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } else {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <LinearGradient colors={['#ADD8E6', colors.background]} style={styles.headerGradient}>
            <Text style={[styles.title, { color: colors.text }]}>Feedback Form</Text>
          </LinearGradient>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />

            <Text style={[styles.label, { color: colors.text }]}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={[styles.label, { color: colors.text }]}>Subject:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Subject"
              placeholderTextColor="#999"
              value={subject}
              onChangeText={setSubject}
            />

            <Text style={[styles.label, { color: colors.text }]}>Message:</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Enter your message"
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit →</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { alignItems: 'center', paddingBottom: 120 },
  headerGradient: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  formGroup: { width: '90%' },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#000',
  },
  textArea: {
    height: 100,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    marginBottom: 20,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#6188c1',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FeedbackScreen;
