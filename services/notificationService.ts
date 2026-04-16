import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export function configurarNotificacoes() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export async function solicitarPermissaoNotificacoes(): Promise<boolean> {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Notificações Gerais",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#b400ff",
      sound: "default",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("[Notifications] Permissão negada pelo usuário.");
    return false;
  }

  return true;
}

export async function notificarBoasVindas(nomeOuEmail: string): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "👋 Bem-vindo(a) de volta!",
      body: `Olá, ${nomeOuEmail}! Suas notas estão te esperando.`,
      sound: "default",
      data: { tipo: "boas_vindas" },
    },
    trigger: null,
  });
}

export async function notificarNotaCriada(tituloNota: string): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "✅ Nota salva com sucesso!",
      body: `"${tituloNota}" foi adicionada às suas notas.`,
      sound: "default",
      data: { tipo: "nota_criada" },
    },
    trigger: null,
  });
}
