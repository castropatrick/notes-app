import { Stack } from 'expo-router';
import { View, LogBox } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import * as Notifications from 'expo-notifications';


LogBox.ignoreLogs(['expo-notifications: Android Push notifications']);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Layout() {
  return (
    <I18nextProvider i18n={i18n}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </I18nextProvider>
  );
}