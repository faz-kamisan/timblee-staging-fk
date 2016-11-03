namespace :notifications do

  desc 'Send notification to all users'
  task send: :environment do

    puts "Starting - #{Time.zone.now}"

    notification_ids_sent = []

    User.active.notify_by_email.find_in_batches(batch_size: 25) do |batch|
      batch.each do |user|
        # Note - We could eager_load the notifications, not needed right now.
        notification_ids = user.notifications.not_sent.pluck(:id)

        if notification_ids.present?
          UserMailer.delay.send_pending_notification(user.id, notification_ids)

          notification_ids_sent += notification_ids
        end
      end

      Notification.where(id: notification_ids_sent).update_all(email_sent: true)
    end

    puts "Completed - #{Time.zone.now}"
  end

end
