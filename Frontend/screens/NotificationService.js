// NotificationService.js
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

// Bildirim ayarları
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Bildirim planlama fonksiyonu
export async function scheduleNotification(title, body, reminderFrequency) {
  let trigger;
  switch (reminderFrequency) {
    case "10 second":
      trigger = { seconds: 1 * 60 }; // 1 dakika
      break;
    case "5 minutes":
      trigger = { seconds: 5 * 60 }; // 5 dakika
      break;
    case "30 minutes":
      trigger = { seconds: 30 * 60 }; // 30 dakika
      break;
    case "1 hour":
      trigger = { seconds: 60 * 60 }; // 1 saat
      break;
    case "2 hours":
      trigger = { seconds: 2 * 60 * 60 }; // 2 saat
      break;
    case "3 hours":
      trigger = { seconds: 3 * 60 * 60 }; // 3 saat
      break;
    case "4 hours":
      trigger = { seconds: 4 * 60 * 60 }; // 4 saat
      break;
    case "Immediate": // Anında bildirim
      trigger = null;
      break;
    default:
      return; // Bildirim sıklığı belirlenmemişse çıkış yap
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: trigger,
  });
}

// Bildirim izinlerini alma fonksiyonu
export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Bildirimlere izin verilmedi!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Bildirimler fiziksel bir cihazda test edilmelidir!");
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

// Bildirim iptal etme fonksiyonu
export async function cancelAllScheduledNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
