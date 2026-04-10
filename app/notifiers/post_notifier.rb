# To deliver this notification:
#
# PostNotifier.with(record: @post, message: "New post").deliver(User.all)

class PostNotifier < ApplicationNotifier
  deliver_by :email do |config|
    config.mailer = "PostMailer"
    config.method = "new_post"
  end

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
end
