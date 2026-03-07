class ApplicationMailer < ActionMailer::Base
  default from: ENV['SMTP_USER'] || 'noreply@boat.com'
  layout 'mailer'
end

