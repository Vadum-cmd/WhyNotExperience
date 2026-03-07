class User < ApplicationRecord
  # Generate UUID before validation if not present
  before_validation :generate_uuid, on: :create

  # Override password_digest methods to use password_hash column if it exists
  def password_digest
    if self.class.column_names.include?('password_hash')
      read_attribute(:password_hash)
    else
      read_attribute(:password_digest)
    end
  end

  def password_digest=(value)
    if self.class.column_names.include?('password_hash')
      write_attribute(:password_hash, value)
    else
      write_attribute(:password_digest, value)
    end
  end

  has_secure_password

  enum :role, { guest: 0, host: 1, admin: 2 }

  has_many :boats, foreign_key: 'host_id', dependent: :destroy
  has_many :bookings, dependent: :destroy
  has_many :reviews_as_reviewer, class_name: 'Review', foreign_key: 'reviewer_id', dependent: :destroy
  has_many :reviews_as_reviewee, class_name: 'Review', foreign_key: 'reviewee_id', dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true
  validates :role, presence: true

  def generate_jwt_token
    JWT.encode(
      {
        id: id,
        email: email,
        role: role,
        exp: 7.days.from_now.to_i
      },
      Rails.application.credentials.secret_key_base || ENV['JWT_SECRET'] || 'secret'
    )
  end

  private

  def generate_uuid
    self.id ||= SecureRandom.uuid
  end
end
