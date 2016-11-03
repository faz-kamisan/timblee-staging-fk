namespace :notifications do

  desc 'Send notification to all users'
  task send: :environment do

    puts "Starting - #{Time.zone.now}"

    User.notify_by_email.find_in_batches(batch_size: 50) do |batch|
      batch.each do |user|
        # Note - We could eager_load the notifications, not needed right now.
        notification_ids = user.notifications.not_sent.pluck(:id)

        UserMailer.delay.send_pending_notification(user.id, notification_ids)

        Notification.update_all({ email_sent: true }, { id: notification_ids })
      end
    end

    puts "Completed - #{Time.zone.now}"
  end

end
