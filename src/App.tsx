// src/App.tsx or app/_layout.tsx or wherever your app starts

import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './notifications/notificationService';

export default function App() {
  useEffect(() => {
    // 🔔 Register for notifications
    registerForPushNotificationsAsync();

    // 🔔 Handle notification received while app is in foreground
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('🔔 Notification received in foreground:', notification);
    });

    // 🔚 Clean up listener on unmount
    return () => subscription.remove();
  }, []);

  return (
    // Replace with your actual UI
    null
  );
}
