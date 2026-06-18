# RailsNotificationTest

A Rails 8.1 application for testing multi-channel notifications using the [noticed](https://github.com/noticedhq/noticed) gem.

## Notification Channels

| Channel | Status | Details |
|---------|--------|---------|
| **Email** | ✅ Implemented | ActionMailer with Mailhog (SMTP on port 1025, UI at http://localhost:8025) |
| **Browser (ActionCable)** | ✅ Implemented | Solid Cable adapter + Browser Notification API |
| **Browser (Web Push)** | 🔜 Planned | Service worker scaffolding in place |
| **iOS (APNs)** | 🔜 Planned | via noticed-apns |
| **Android (FCM)** | 🔜 Planned | via noticed-fcm |

## How It Works

When a post is created or updated, `PostNotifier` dispatches notifications to all users:

```ruby
PostNotifier.with(record: @post).deliver_later(User.all)
```

This triggers via Solid Queue (background job):
1. **Email** — `PostMailer#new_post` sends a notification email
2. **ActionCable** — Broadcasts to `NotificationsChannel`, received client-side as a native browser notification

## Tech Stack

- **Ruby 4.0.5 / Rails 8.1**
- **MySQL** — primary database, also backs cache (Solid Cache), queue (Solid Queue), and ActionCable (Solid Cable)
- **Solid Queue** — database-backed background job processor
- **Tailwind CSS** — styling
- **Mailhog** — local email testing
- **Noticed** — multi-channel notification orchestration

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
