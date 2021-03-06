# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_20_202234) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
  end

  create_table "expenses", force: :cascade do |t|
    t.integer "amount"
    t.bigint "user_id"
    t.datetime "date"
    t.string "description"
    t.bigint "group_id"
    t.bigint "category_id"
    t.bigint "investec_transaction_id"
    t.index ["category_id"], name: "index_expenses_on_category_id"
    t.index ["group_id"], name: "index_expenses_on_group_id"
    t.index ["investec_transaction_id"], name: "index_expenses_on_investec_transaction_id", unique: true
    t.index ["user_id"], name: "index_expenses_on_user_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "name"
    t.bigint "users_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "color"
    t.index ["users_id"], name: "index_groups_on_users_id"
  end

  create_table "groups_running_totals", id: false, force: :cascade do |t|
    t.bigint "group_id", null: false
    t.bigint "running_total_id", null: false
  end

  create_table "groups_users", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "group_id", null: false
  end

  create_table "investec_transactions", force: :cascade do |t|
    t.integer "amount"
    t.string "currency_code"
    t.bigint "user_id"
    t.datetime "api_updated_at"
    t.boolean "is_simulated", default: false
    t.bigint "merchant_id"
    t.bigint "expense_id"
    t.index ["expense_id"], name: "index_investec_transactions_on_expense_id", unique: true
    t.index ["merchant_id"], name: "index_investec_transactions_on_merchant_id"
    t.index ["user_id"], name: "index_investec_transactions_on_user_id"
  end

  create_table "merchants", force: :cascade do |t|
    t.string "name"
    t.string "city"
    t.string "country_code"
    t.string "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "running_totals", force: :cascade do |t|
    t.bigint "user_id"
    t.float "total"
    t.bigint "expense_id"
    t.index ["expense_id"], name: "index_running_totals_on_expense_id"
    t.index ["user_id"], name: "index_running_totals_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "avatar"
  end

  add_foreign_key "expenses", "categories"
  add_foreign_key "expenses", "groups"
  add_foreign_key "investec_transactions", "merchants"
  add_foreign_key "investec_transactions", "users"
end
