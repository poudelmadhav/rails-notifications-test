class CreateNotificationTokens < ActiveRecord::Migration[8.1]
  def change
    create_table :notification_tokens do |t|
      t.references :user, null: false, foreign_key: true
      t.string :token, null: false
      t.integer :platform, null: false

      t.timestamps
      t.index [ :user_id, :platform, :token ], unique: true
    end
  end
end
