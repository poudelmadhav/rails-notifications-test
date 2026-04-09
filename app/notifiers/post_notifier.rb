# To deliver this notification:
#
# PostNotifier.with(record: @post, message: "New post").deliver(User.all)

class PostNotifier < ApplicationNotifier
  deliver_by :database

  deliver_by :email do |config|
    config.mailer = "PostMailer"
    config.method = "new_post"
  end

  deliver_by :action_cable do |config|
    config.channel = "NotificationsChannel"
    config.stream = "notifications"
    config.message = :message
    config.title = :title
  end

  def message
    "New post published: #{params[:record].title}"
  end

  def title
    "New Post"
  end

  def url
    post_url(params[:record])
  end
end
