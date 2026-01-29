# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_01_28_200000) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "blocks_orders", force: :cascade do |t|
    t.string "buyer_name", null: false
    t.string "buyer_phone"
    t.datetime "created_at", null: false
    t.text "notes"
    t.integer "quantity", default: 0, null: false
    t.string "status", default: "pending", null: false
    t.decimal "total_price", precision: 12, scale: 2, default: "0.0", null: false
    t.decimal "unit_price", precision: 10, scale: 2, default: "0.0", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["status"], name: "index_blocks_orders_on_status"
    t.index ["user_id"], name: "index_blocks_orders_on_user_id"
  end

  create_table "blocks_productions", force: :cascade do |t|
    t.decimal "amount_sold", precision: 12, scale: 2
    t.string "block_size", null: false
    t.string "block_type", null: false
    t.integer "blocks_produced", default: 0, null: false
    t.integer "blocks_sold"
    t.integer "cement_bags", default: 0, null: false
    t.datetime "created_at", null: false
    t.decimal "dust_cost", precision: 12, scale: 2, default: "0.0", null: false
    t.integer "dust_trips", default: 0, null: false
    t.decimal "electricity_cost", precision: 12, scale: 2
    t.decimal "manufacturing_pay", precision: 12, scale: 2, default: "0.0", null: false
    t.datetime "updated_at", null: false
    t.decimal "water_cost", precision: 12, scale: 2
    t.index ["created_at"], name: "index_blocks_productions_on_created_at"
  end

  create_table "jwt_denylists", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "exp"
    t.string "jti"
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_denylists_on_jti"
  end

  create_table "loader_expenditures", force: :cascade do |t|
    t.decimal "chop_money", precision: 12, scale: 2, null: false
    t.datetime "created_at", null: false
    t.decimal "fuel", precision: 12, scale: 2, null: false
    t.decimal "greasing", precision: 12, scale: 2, null: false
    t.datetime "updated_at", null: false
    t.decimal "washing", precision: 12, scale: 2, null: false
    t.index ["created_at"], name: "index_loader_expenditures_on_created_at"
  end

  create_table "loader_rentals", force: :cascade do |t|
    t.string "client_contact", null: false
    t.string "client_name", null: false
    t.datetime "created_at", null: false
    t.decimal "price_charged", precision: 12, scale: 2, null: false
    t.datetime "updated_at", null: false
    t.string "work_type", null: false
    t.index ["created_at"], name: "index_loader_rentals_on_created_at"
  end

  create_table "refresh_tokens", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "expires_at"
    t.boolean "revoked", default: false, null: false
    t.string "token", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["token"], name: "index_refresh_tokens_on_token", unique: true
    t.index ["user_id"], name: "index_refresh_tokens_on_user_id"
  end

  create_table "survey_rentals", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "last_four_digits", null: false
    t.string "machine_color", null: false
    t.integer "points"
    t.string "rentee_name", null: false
    t.boolean "took_stick", default: false, null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_survey_rentals_on_created_at"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "full_name"
    t.string "phone_number"
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.string "role"
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["phone_number"], name: "index_users_on_phone_number"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["role"], name: "index_users_on_role"
  end

  add_foreign_key "blocks_orders", "users"
  add_foreign_key "refresh_tokens", "users"
end
