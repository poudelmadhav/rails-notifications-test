# RailsNotificationTest

A Rails 8.1 application for testing multi-channel notifications using the [noticed](https://github.com/noticedhq/noticed) gem.

## Notification Channels

| Channel | Status | Details |
|---------|--------|---------|
| **Email** | ✅ Implemented | ActionMailer with Mailhog (SMTP on port 1025, UI at http://localhost:8025) |
| **Browser (ActionCable)** | ✅ Implemented | Solid Cable adapter + Browser Notification API |
| **Mobile (FCM)** | ✅ Implemented | Firebase Cloud Messaging via `noticed` — works for Android, iOS, and Web |

## How It Works

When a post is created or updated, `PostNotifier` dispatches notifications to all users:

```ruby
PostNotifier.with(record: @post).deliver_later(User.all)
```

This triggers via Solid Queue (background job):

1. **Email** — `PostMailer#new_post` sends a notification email via Mailhog
2. **ActionCable** — Broadcasts to `NotificationsChannel`, received client-side as a native browser notification
3. **FCM** — Sends push notification to all registered device tokens via Firebase Cloud Messaging

## FCM Setup

1. Download your Firebase service account JSON from Firebase Console → Project Settings → Service Accounts
2. Save it to `config/fcm.json`
3. Grant the service account the **Firebase Cloud Messaging Admin** role in Google Cloud IAM
4. Users register their devices on the user page (`/users/1`) by clicking "Register browser for push notifications"

### FCM Token Registration Flow

- **Web:** Stimulus controller (`fcm_token_controller.js`) requests notification permission, gets the FCM token via Firebase JS SDK, and POSTs it to `NotificationTokensController`
- **Mobile:** POST to `/users/:user_id/notification_tokens` with `{ notification_token: { token: "...", platform: "fcm" } }`

## Tech Stack

- **Ruby 4.0.5 / Rails 8.1**
- **MySQL** — primary database, also backs cache (Solid Cache), queue (Solid Queue), and ActionCable (Solid Cable)
- **Solid Queue** — database-backed background job processor
- **Tailwind CSS** — styling
- **Mailhog** — local email testing
- **Noticed** — multi-channel notification orchestration
- **Firebase Cloud Messaging** — mobile and web push notifications

## Setup

```bash
bundle install
rails db:create db:migrate db:seed
bin/dev
```

Start Mailhog separately:

```bash
mailhog
```

## Development

- Web: `http://localhost:3000`
- Mailhog UI: `http://localhost:8025`
- Background worker runs automatically via `Procfile.dev`
