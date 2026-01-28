class CreateRefreshTokens < ActiveRecord::Migration[8.1]
  def change
    create_table :refresh_tokens do |t|
      t.string :token, null: false
      t.references :user, null: false, foreign_key: true
      t.datetime :expires_at
      t.boolean :revoked, default: false, null: false

      t.timestamps
    end
    add_index :refresh_tokens, :token, unique: true
  end
end
