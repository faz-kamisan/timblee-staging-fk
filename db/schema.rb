# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20161003132051) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "businesses", force: :cascade do |t|
    t.string   "name"
    t.string   "logo"
    t.string   "stripe_customer_id"
    t.integer  "owner_id"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.integer  "trial_days"
    t.boolean  "has_plan",           default: false
    t.boolean  "is_pro",             default: false
  end

  create_table "cards", force: :cascade do |t|
    t.string   "last4"
    t.string   "brand"
    t.integer  "business_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "comments", force: :cascade do |t|
    t.string   "message"
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.integer  "commenter_id"
    t.string   "commenter_type"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "folders", force: :cascade do |t|
    t.string   "name"
    t.integer  "business_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "guests", force: :cascade do |t|
    t.string   "full_name"
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notifications", force: :cascade do |t|
    t.string   "message"
    t.string   "link_to"
    t.integer  "user_id"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.boolean  "email_sent",   default: false
    t.integer  "recipient_id"
  end

  create_table "page_types", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "icon_name"
  end

  create_table "pages", force: :cascade do |t|
    t.string   "name"
    t.integer  "sitemap_id"
    t.integer  "page_type_id"
    t.integer  "parent_id"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.integer  "position"
    t.integer  "uid"
    t.integer  "section_id"
    t.string   "state",        default: "active"
    t.boolean  "footer",       default: false
  end

  create_table "plans", force: :cascade do |t|
    t.string   "name"
    t.integer  "cost_in_cents"
    t.string   "stripe_plan_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "sections", force: :cascade do |t|
    t.string   "name"
    t.boolean  "default"
    t.integer  "sitemap_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "state",      default: "active"
  end

  create_table "sitemap_shared_users", force: :cascade do |t|
    t.integer  "sitemap_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "user_email"
  end

  create_table "sitemaps", force: :cascade do |t|
    t.string   "name"
    t.integer  "folder_id"
    t.integer  "business_id"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "state"
    t.string   "public_share_token"
    t.boolean  "trial",              default: false
  end

  create_table "subscriptions", force: :cascade do |t|
    t.integer  "quantity"
    t.integer  "no_of_users"
    t.integer  "business_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.datetime "start_at"
    t.datetime "end_at"
    t.string   "stripe_subscriptions_id"
  end

  add_index "subscriptions", ["business_id"], name: "index_subscriptions_on_business_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "full_name"
    t.string   "avatar"
    t.boolean  "is_admin",               default: false
    t.integer  "business_id"
    t.string   "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer  "invitation_limit"
    t.integer  "invited_by_id"
    t.string   "invited_by_type"
    t.integer  "invitations_count",      default: 0
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.boolean  "notify_by_email",        default: true
    t.datetime "deleted_at"
    t.boolean  "is_super_admin",         default: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["invitation_token"], name: "index_users_on_invitation_token", unique: true, using: :btree
  add_index "users", ["invitations_count"], name: "index_users_on_invitations_count", using: :btree
  add_index "users", ["invited_by_id"], name: "index_users_on_invited_by_id", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "subscriptions", "businesses"
end
