import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import QuickReplies from '../../components/QuickReplies';

const ErasBotScreen = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const router = useRouter();

  const handleReply = (reply: string) => {
    setMessages(prev => [...prev, `You: ${reply}`]);

    // Navigation logic based on reply
    if (reply.includes('Check booked courses')) {
      router.push('/(tabs)/BookedScreen');
    } else if (reply.includes('Nearby places')) {
      Linking.openURL('https://www.google.com/maps');
    } else if (reply.includes('Show universities')) {
      router.push('/UniversitiesScreen');
    }
  };

  return (
    <View style={styles.container}>
      {messages.map((msg, i) => (
        <Text key={i} style={styles.message}>{msg}</Text>
      ))}

      <QuickReplies
        replies={['✅Show universities', '🌍Nearby places', '📅Check booked courses']}
        onReplyPress={handleReply}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  message: {
    fontSize: 16,
    marginVertical: 4,
    color: '#000',
  },
});

export default ErasBotScreen;
