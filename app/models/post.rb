class Post < ApplicationRecord
  has_noticed_notifications

  validates :title, :content, presence: true
end
