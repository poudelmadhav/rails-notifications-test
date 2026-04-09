import consumer from "channels/consumer"

consumer.subscriptions.create("NotificationsChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
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
