class CreateBoats < ActiveRecord::Migration[8.0]
  def change
    create_table :boats, id: :uuid do |t|
      t.references :host, null: false, foreign_key: { to_table: :users }, type: :uuid
      t.string :name, null: false
      t.string :model, null: false
      t.integer :year, null: false
      t.string :location, null: false
      t.integer :capacity, null: false
      t.integer :cabins, null: false
      t.decimal :length, precision: 10, scale: 2, null: false
      t.decimal :price, precision: 10, scale: 2, null: false
      t.decimal :rating, precision: 3, scale: 2, default: 0.0
      t.integer :review_count, default: 0
      t.text :images, array: true, default: []

      t.timestamps
    end

    add_index :boats, :host_id
    add_index :boats, :location
  end
end

