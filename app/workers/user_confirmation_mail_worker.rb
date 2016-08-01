class UserConfirmationMailWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'mailer'

  def perform(user_id)
    user = User.find(user_id)
    unless user.confirmed?
      user.send_confirmation_instructions
    end
  end
end
