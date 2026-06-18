class User < ApplicationRecord
  has_noticed_notifications
  has_many :notification_tokens, dependent: :destroy
end
