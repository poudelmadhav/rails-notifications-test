import consumer from "channels/consumer"

console.log("Creating NotificationsChannel subscription...")

consumer.subscriptions.create("NotificationsChannel", {
  connected() {
    console.log("✅ Connected to NotificationsChannel!")
    // Request notification permission if not already granted
    if (Notification.permission === "default") {
      Notification.requestPermission()
    }
  },

  disconnected() {
    console.log("❌ Disconnected from NotificationsChannel")
  },

  rejected() {
    console.log("❌ Subscription rejected")
  },

  received(data) {
    console.log("📨 Received notification:", data)
    // Show browser notification if permitted
    if (Notification.permission === "granted") {
      const notification = new Notification(data.title, {
        body: data.content,
        icon: "/icon.png" // You can change this to a valid icon path
      })

      notification.onclick = () => {
        window.focus()
        if (data.url) {
          window.location.href = data.url
        }
      }
    }
  }
})
