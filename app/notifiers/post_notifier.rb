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
  end

  def message
    "New post published: #{params[:record].title}"
  end

  def url
    post_url(params[:record])
  end
end
