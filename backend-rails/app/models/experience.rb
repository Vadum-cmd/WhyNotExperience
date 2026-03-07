class Experience < ApplicationRecord
  # Disable Single Table Inheritance since we use 'type' for experience type
  self.inheritance_column = nil
  
  belongs_to :boat

  # Use string enum for the 'type' column
  enum :type, { ride: 'ride', panorama: 'panorama', spritz_swim_panorama: 'spritz_swim_panorama' }

  validates :name, presence: true
  validates :duration, presence: true, numericality: { greater_than: 0, less_than_or_equal_to: 24 }
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :type, presence: true
end
