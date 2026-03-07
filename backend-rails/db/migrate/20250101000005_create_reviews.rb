class CreateReviews < ActiveRecord::Migration[8.0]
  def change
    create_table :reviews, id: :uuid do |t|
      t.references :booking, null: false, foreign_key: true, type: :uuid
      t.references :reviewer, null: false, foreign_key: { to_table: :users }, type: :uuid
      t.references :reviewee, null: false, foreign_key: { to_table: :users }, type: :uuid
      t.integer :rating, null: false
      t.text :comment

      t.timestamps
    end
  end
end

