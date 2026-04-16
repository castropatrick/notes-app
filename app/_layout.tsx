import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { configurarNotificacoes } from '../services/notificationService';

export default function Layout() {
  useEffect(() => {
    configurarNotificacoes();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />
}