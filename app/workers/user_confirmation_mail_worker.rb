class UserConfirmationMailWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'mailer'

  def perform(user_id)
    user = User.find_by(id: user_id)
    if user && !user.confirmed?
      user.send_confirmation_instructions
    end
  end
end
