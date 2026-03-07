class GovernmentalEmailService
  def send_booking_confirmation(booking)
    governmental_email = ENV['GOVERNMENTAL_EMAIL'] || 'government@example.com'

    guest_documents_list = (booking.guest_documents || []).map.with_index do |doc, index|
      "Guest #{index + 1}:\n- Name: #{doc['name']}\n- Document Type: #{doc['documentType']}\n- Document Number: #{doc['documentNumber']}"
    end.join("\n\n") || 'No documents provided'

    email_content = <<~EMAIL
      BOAT RIDE CONFIRMATION REQUEST

      Booking Details:
      - Booking ID: #{booking.id}
      - Boat: #{booking.boat.name}
      - Host: #{booking.boat.host.name}
      - Date: #{booking.date}
      - Start Time: #{booking.start_time.strftime("%H:%M")}
      - End Time: #{booking.end_time.strftime("%H:%M")}
      - Duration: #{booking.duration} hours
      - Number of Guests: #{booking.guests}

      Guest Documents:
      #{guest_documents_list}

      Please confirm this boat ride booking.

      This is an automated message from the BOAT booking system.
    EMAIL

    begin
      Mail.deliver do
        from ENV['SMTP_USER']
        to governmental_email
        subject "Boat Ride Confirmation Request - Booking #{booking.id}"
        body email_content
      end

      Rails.logger.info("Governmental email sent for booking #{booking.id}")
    rescue => e
      Rails.logger.error("Failed to send governmental email: #{e.message}")
      raise "Failed to send confirmation email to governmental authorities"
    end
  end
end

