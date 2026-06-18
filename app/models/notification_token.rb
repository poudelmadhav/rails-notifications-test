class NotificationToken < ApplicationRecord
  belongs_to :user

  enum :platform, { fcm: 0, apns: 1 }

  validates :token, presence: true
  validates :token, uniqueness: { scope: [ :user_id, :platform ] }
end
