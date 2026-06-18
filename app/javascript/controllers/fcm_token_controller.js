import { Controller } from "@hotwired/stimulus"
import { initializeApp } from "firebase-app"
import { getMessaging, getToken } from "firebase-messaging"

const firebaseConfig = {
  apiKey: "AIzaSyCr3GCSiFBs8_9x1EQxKh6MflCQfNT8YXc",
  authDomain: "madhav-messaging-bot.firebaseapp.com",
  databaseURL: "https://madhav-messaging-bot.firebaseio.com",
  projectId: "madhav-messaging-bot",
  storageBucket: "madhav-messaging-bot.firebasestorage.app",
  messagingSenderId: "782217935491",
  appId: "1:782217935491:web:61be376a087310d655b9b6"
}

export default class extends Controller {
  static values = { userId: Number }

  async register() {
    if (Notification.permission === "denied") return

    try {
      const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js")
      const permission = await Notification.requestPermission()
      if (permission !== "granted") return

      const app = initializeApp(firebaseConfig)
      const messaging = getMessaging(app)

      // Get VAPID key from Firebase Console > Project Settings > Cloud Messaging
      const token = await getToken(messaging, {
        vapidKey: "BGXn9g_iY7V5dI512_S0kH10jD1v67a4fv4E4phHk4oj71qj7rxcEej4JQ1VpRQKsjCY4wBcDm9D_HZJIeiFCXM",
        serviceWorkerRegistration: registration
      })

      if (token) await this.saveToken(token)
    } catch (error) {
      console.error("FCM registration failed:", error)
    }
  }

  async saveToken(token) {
    const csrf = document.querySelector("[name='csrf-token']").content
    const form = document.createElement("form")
    form.method = "POST"
    form.action = `/users/${this.userIdValue}/notification_tokens`
    form.style.display = "none"

    const addField = (name, value) => {
      const input = document.createElement("input")
      input.type = "hidden"
      input.name = name
      input.value = value
      form.appendChild(input)
    }

    addField("authenticity_token", csrf)
    addField("notification_token[token]", token)
    addField("notification_token[platform]", "fcm")

    document.body.appendChild(form)
    form.submit()
  }
}
