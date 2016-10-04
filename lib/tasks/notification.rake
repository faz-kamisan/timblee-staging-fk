namespace :notifications do
  desc 'Send notification to all users'
  task send: :environment do
    puts "Starting - #{Time.now}"
    Notification.not_mailed.distinct.pluck(:recipient_id).each do |user_id|
      user = User.find_by(id: user_id)
      notifications = Notification.not_mailed.where(recipient_id: user_id)
      UserMailer.delay.send_pending_notification(user_id, notifications.ids) if user.notify_by_email
      notifications.update_all(email_sent: true)
      puts "Sending mail to #{user.email}"
    end
    puts "Completed - #{Time.now}"
  end
end
