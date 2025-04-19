import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Animated,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import QuickReplies from '../../components/QuickReplies';

const THEME_COLOR = '#4a90e2';

const ErasBotScreen = () => {
  const [messages, setMessages] = useState<string[]>([
    "ErasBot: Hi! I'm your Erasmus guide. How can I help you today?",
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const sendButtonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      scrollToBottom();
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleReply = (reply: string) => {
    const userMessage = `You: ${reply}`;
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      let botResponse = "ErasBot: I'll help you with that right away!";

      if (reply.includes('Show universities')) {
        botResponse = 'ErasBot: Opening list of available universities...';
        setTimeout(() => router.push('/UniversitiesScreen'), 1000);
      } else if (reply.includes('Nearby places')) {
        botResponse = 'ErasBot: Opening map to show nearby places...';
        setTimeout(() => Linking.openURL('https://www.google.com/maps'), 1000);
      } else if (reply.includes('Check booked courses')) {
        botResponse = 'ErasBot: Let me show you your booked courses...';
        setTimeout(() => router.push('/(tabs)/BookedScreen'), 1000);
      }

      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  const animateSendButton = () => {
    Animated.sequence([
      Animated.timing(sendButtonScale, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(sendButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    animateSendButton();
    setMessages(prev => [...prev, `You: ${inputText}`]);
    setInputText('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        `ErasBot: Thanks for your message! I'm here to help with anything related to your Erasmus experience.`,
      ]);
    }, 1000);
  };

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <LinearGradient
        colors={[THEME_COLOR, THEME_COLOR, '#60a5fa']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Image
            source={require('../../assets/erasbot.png')}
            style={styles.avatar}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.headerTitle}>ErasBot</Text>
            <Text style={styles.headerSubtitle}>Your Erasmus guide • Online</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Replies (under header) */}
      {!keyboardVisible && (
        <View style={styles.quickRepliesContainer}>
          <QuickReplies
            replies={[
              '✨ Show universities',
              '🌍 Nearby places',
              '📚 Check booked courses',
            ]}
            onReplyPress={handleReply}
          />
        </View>
      )}

      {/* Chat Area */}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.dateLabel}>Today, {formatTime()}</Text>

        {messages.map((msg, i) => {
          const isUser = msg.startsWith('You:');
          const messageContent = msg.substring(msg.indexOf(':') + 1);

          return (
            <View key={i} style={styles.messageRow}>
              {!isUser && (
                <Image
                  source={require('../../assets/erasbot.png')}
                  style={styles.messageBubbleAvatar}
                />
              )}
              <View
                style={[
                  styles.messageBubble,
                  isUser ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text style={isUser ? styles.userText : styles.botText}>
                  {messageContent}
                </Text>
              </View>
              {isUser && <View style={styles.spacerAvatar} />}
            </View>
          );
        })}
      </ScrollView>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="add-circle-outline" size={24} color={THEME_COLOR} />
        </TouchableOpacity>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Message ErasBot..."
            placeholderTextColor="#9ca3af"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity style={styles.micButton}>
            <MaterialCommunityIcons
              name="microphone-outline"
              size={22}
              color="#6b7280"
            />
          </TouchableOpacity>
        </View>

        <Animated.View style={{ transform: [{ scale: sendButtonScale }] }}>
          <TouchableOpacity
            onPress={handleSend}
            style={[
              styles.sendButton,
              !inputText.trim() ? styles.sendButtonDisabled : {},
            ]}
            disabled={!inputText.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={inputText.trim() ? '#ffffff' : '#bfdbfe'}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 12,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: '#e0f2fe',
    fontSize: 13,
    marginTop: 2,
  },
  quickRepliesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  dateLabel: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#64748b',
    marginBottom: 16,
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  messageBubble: {
    borderRadius: 20,
    padding: 12,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  messageBubbleAvatar: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  spacerAvatar: {
    width: 28,
    marginLeft: 8,
  },
  userBubble: {
    backgroundColor: THEME_COLOR,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
    marginLeft: 'auto',
  },
  botBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  userText: {
    color: '#fff',
    fontSize: 15,
  },
  botText: {
    color: '#1e293b',
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  attachButton: {
    marginRight: 8,
    padding: 4,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 8 : 4,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    color: '#0f172a',
  },
  micButton: {
    padding: 6,
    marginLeft: 2,
  },
  sendButton: {
    backgroundColor: THEME_COLOR,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: THEME_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  sendButtonDisabled: {
    backgroundColor: '#bfdbfe',
    shadowOpacity: 0,
  },
});

export default ErasBotScreen;
