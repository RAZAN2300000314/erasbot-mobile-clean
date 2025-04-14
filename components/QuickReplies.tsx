// components/QuickReplies.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type QuickReplyProps = {
  replies: string[];
  onReplyPress: (reply: string) => void;
};

const QuickReplies: React.FC<QuickReplyProps> = ({ replies, onReplyPress }) => {
  return (
    <View style={styles.container}>
      {replies.map((reply, index) => (
        <TouchableOpacity key={index} style={styles.replyButton} onPress={() => onReplyPress(reply)}>
          <Text style={styles.replyText}>{reply}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  replyButton: {
    backgroundColor: '#A6CFFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 5,
  },
  replyText: {
    color: '#003366',
    fontSize: 14,
  },
});

export default QuickReplies;
