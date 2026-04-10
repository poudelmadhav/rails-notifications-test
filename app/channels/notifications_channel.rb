class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_for 'madhav-stream'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
