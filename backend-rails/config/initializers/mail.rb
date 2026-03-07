if Rails.env.development? || Rails.env.production?
  ActionMailer::Base.delivery_method = :smtp
  ActionMailer::Base.smtp_settings = {
    address: ENV['SMTP_HOST'] || 'smtp.gmail.com',
    port: ENV['SMTP_PORT'] || 587,
    domain: ENV['SMTP_DOMAIN'] || 'localhost',
    user_name: ENV['SMTP_USER'],
    password: ENV['SMTP_PASSWORD'],
    authentication: 'plain',
    enable_starttls_auto: true
  }
end

