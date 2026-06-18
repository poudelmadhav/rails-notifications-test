importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCr3GCSiFBs8_9x1EQxKh6MflCQfNT8YXc",
  authDomain: "madhav-messaging-bot.firebaseapp.com",
  databaseURL: "https://madhav-messaging-bot.firebaseio.com",
  projectId: "madhav-messaging-bot",
  storageBucket: "madhav-messaging-bot.firebasestorage.app",
  messagingSenderId: "782217935491",
  appId: "1:782217935491:web:61be376a087310d655b9b6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || "New Notification", {
    body: body || "",
    icon: "/icon.png"
  });
});
