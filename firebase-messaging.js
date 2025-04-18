// firebase-messaging.js
import messaging from '@react-native-firebase/messaging';

// Handle background notifications
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📩 Message handled in the background!', remoteMessage);
});
