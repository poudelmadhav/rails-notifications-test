# To deliver this notification:
#
# PostNotifier.with(record: @post, message: "New post").deliver(User.all)

class PostNotifier < ApplicationNotifier
  deliver_by :email do |config|
    config.mailer = "PostMailer"
    config.method = "new_post"
  end

  # ActionCable setup for real-time browser notifications
  deliver_by :action_cable do |config|
    config.channel = "NotificationsChannel"
    config.stream = "madhav-stream"
    config.message = -> do
      Rails.logger.info "=== Broadcasting notification via ActionCable ==="
      post = record
      message = {
        title: post.title,
        content: post.content,
        published: post.published,
        url: Rails.application.routes.url_helpers.post_url(post, host: "localhost", port: 3000)
      }
      Rails.logger.info "Message: #{message.inspect}"
      message
    end
  end

  # 🤖🍏 Unified Mobile Setup (Firebase Cloud Messaging)
  deliver_by :fcm do |config|
    config.credentials = "config/fcm.json"
    config.device_tokens = -> { recipient.notification_tokens.where(platform: "fcm").pluck(:token) }

    config.json = ->(device_token) do
      post = record
      {
        message: {
          token: device_token,
          notification: {
            title: "New Post Published!",
            body: post.title
          },
          data: {
            post_id: post.id.to_s
          }
        }
      }
    end
  end
end
