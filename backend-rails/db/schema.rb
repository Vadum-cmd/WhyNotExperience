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

ActiveRecord::Schema[8.0].define(version: 2026_03_07_140000) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"
  enable_extension "pgcrypto"

  create_table "boats", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "host_id", null: false
    t.string "name", limit: 255, null: false
    t.string "model", limit: 255, null: false
    t.integer "year", null: false
    t.string "location", limit: 255, null: false
    t.integer "capacity", null: false
    t.integer "cabins", null: false
    t.decimal "length", precision: 10, scale: 2, null: false
    t.decimal "price", precision: 10, scale: 2, null: false
    t.decimal "rating", precision: 3, scale: 2, default: "0.0"
    t.integer "review_count", default: 0
    t.text "images", default: [], array: true
    t.datetime "created_at", precision: nil, default: -> { "now()" }
    t.datetime "updated_at", precision: nil, default: -> { "now()" }
    t.index ["host_id"], name: "idx_boats_host_id"
    t.index ["location"], name: "idx_boats_location"
  end

  create_table "bookings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "boat_id", null: false
    t.uuid "experience_id", null: false
    t.date "date", null: false
    t.time "start_time", null: false
    t.time "end_time", null: false
    t.integer "duration", null: false
    t.integer "guests", null: false
    t.decimal "total_price", precision: 10, scale: 2, null: false
    t.string "status", limit: 20, default: "pending", null: false
    t.jsonb "guest_documents"
    t.datetime "created_at", precision: nil, default: -> { "now()" }
    t.datetime "updated_at", precision: nil, default: -> { "now()" }
    t.text "images", default: [], array: true
    t.index ["boat_id"], name: "idx_bookings_boat_id"
    t.index ["date"], name: "idx_bookings_date"
    t.index ["status"], name: "idx_bookings_status"
    t.index ["user_id"], name: "idx_bookings_user_id"
    t.check_constraint "status::text = ANY (ARRAY['pending'::character varying, 'confirmed'::character varying, 'completed'::character varying, 'cancelled'::character varying]::text[])", name: "bookings_status_check"
  end

  create_table "experiences", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "boat_id", null: false
    t.string "type", limit: 50, null: false
    t.string "name", limit: 255, null: false
    t.integer "duration", null: false
    t.text "description", default: [], array: true
    t.decimal "price", precision: 10, scale: 2, null: false
    t.datetime "created_at", precision: nil, default: -> { "now()" }
    t.datetime "updated_at", precision: nil, default: -> { "now()" }
    t.time "start_time"
    t.time "end_time"
    t.index ["boat_id"], name: "idx_experiences_boat_id"
    t.check_constraint "type::text = ANY (ARRAY['ride'::character varying, 'panorama'::character varying, 'spritz_swim_panorama'::character varying]::text[])", name: "experiences_type_check"
  end

  create_table "reviews", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "booking_id", null: false
    t.uuid "reviewer_id", null: false
    t.uuid "reviewee_id", null: false
    t.integer "rating", null: false
    t.text "comment"
    t.datetime "created_at", precision: nil, default: -> { "now()" }
    t.datetime "updated_at", precision: nil, default: -> { "now()" }
    t.check_constraint "rating >= 1 AND rating <= 5", name: "reviews_rating_check"
  end

  create_table "users", id: :uuid, default: nil, force: :cascade do |t|
    t.string "email", limit: 255, null: false
    t.string "password_hash", limit: 255
    t.string "name", limit: 255, null: false
    t.string "role", limit: 20, null: false
    t.datetime "created_at", precision: nil, default: -> { "now()" }
    t.datetime "updated_at", precision: nil, default: -> { "now()" }
    t.string "provider"
    t.string "uid"
    t.string "stripe_verification_session_id"
    t.string "stripe_verification_status", default: "pending"
    t.datetime "stripe_verification_verified_at", precision: nil
    t.text "bio"
    t.text "avatar"
    t.text "languages", default: [], array: true
    t.index ["provider", "uid"], name: "index_users_on_provider_and_uid", where: "(provider IS NOT NULL)"
    t.index ["stripe_verification_session_id"], name: "index_users_on_stripe_verification_session_id"
    t.index ["stripe_verification_status"], name: "index_users_on_stripe_verification_status"
    t.unique_constraint ["email"], name: "users_email_key"
  end

  add_foreign_key "boats", "users", column: "host_id", name: "boats_host_id_fkey", on_delete: :cascade
  add_foreign_key "bookings", "boats", name: "bookings_boat_id_fkey", on_delete: :cascade
  add_foreign_key "bookings", "experiences", name: "bookings_experience_id_fkey", on_delete: :cascade
  add_foreign_key "bookings", "users", name: "bookings_user_id_fkey", on_delete: :cascade
  add_foreign_key "experiences", "boats", name: "experiences_boat_id_fkey", on_delete: :cascade
  add_foreign_key "reviews", "bookings", name: "reviews_booking_id_fkey", on_delete: :cascade
  add_foreign_key "reviews", "users", column: "reviewee_id", name: "reviews_reviewee_id_fkey", on_delete: :cascade
  add_foreign_key "reviews", "users", column: "reviewer_id", name: "reviews_reviewer_id_fkey", on_delete: :cascade
end
