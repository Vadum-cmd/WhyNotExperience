class CreateExperiences < ActiveRecord::Migration[8.0]
  def change
    create_table :experiences, id: :uuid do |t|
      t.references :boat, null: false, foreign_key: true, type: :uuid
      t.integer :experience_type, null: false
      t.string :name, null: false
      t.integer :duration, null: false
      t.text :description, array: true, default: []
      t.decimal :price, precision: 10, scale: 2, null: false

      t.timestamps
    end

    add_index :experiences, :boat_id
  end
end

