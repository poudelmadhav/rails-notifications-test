import consumer from "channels/consumer"

consumer.subscriptions.create("NotificationsChannel", {
  connected() {
    console.log("Connected to NotificationsChannel")
  },

  disconnected() {
    console.log("Disconnected from NotificationsChannel")
  },

  received(data) {
    console.log("Received notification:", data)
    // Show browser notification if permitted
    if (Notification.permission === "granted") {
      new Notification(data.title, {
        body: data.message,
        icon: "/icon.png"
      })
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(data.title, {
            body: data.message,
            icon: "/icon.png"
          })
        }
      })
    }
  }
});
