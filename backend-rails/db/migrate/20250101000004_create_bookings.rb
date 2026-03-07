class CreateBookings < ActiveRecord::Migration[8.0]
  def change
    create_table :bookings, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :boat, null: false, foreign_key: true, type: :uuid
      t.references :experience, null: false, foreign_key: true, type: :uuid
      t.date :date, null: false
      t.time :start_time, null: false
      t.time :end_time, null: false
      t.integer :duration, null: false
      t.integer :guests, null: false
      t.decimal :total_price, precision: 10, scale: 2, null: false
      t.integer :status, null: false, default: 0
      t.jsonb :guest_documents

      t.timestamps
    end

    add_index :bookings, :user_id
    add_index :bookings, :boat_id
    add_index :bookings, :date
    add_index :bookings, :status
  end
end

