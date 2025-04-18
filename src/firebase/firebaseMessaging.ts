import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert, Platform } from 'react-native';

/**
 * Request permission for notifications and return Expo push token.
 */
export async function requestUserPermission(): Promise<string | undefined> {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Permission denied for push notifications');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('🔑 Expo Push Token:', token);

    // TODO: Save this token to Firestore if needed

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  } else {
    alert('Push notifications only work on physical devices.');
  }

  return token;
}

/**
 * Listen for foreground notifications and show alerts.
 */
export function listenToForegroundMessages(): Notifications.Subscription {
  return Notifications.addNotificationReceivedListener((notification: Notifications.Notification) => {
    Alert.alert(
      notification.request.content.title || 'Notification',
      notification.request.content.body || 'You have a new message.'
    );
  });
}
