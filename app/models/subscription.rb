class Subscription < ActiveRecord::Base
  belongs_to :business
  belongs_to :user

  validates :no_of_users, :quantity, :business, presence: true

  before_create :add_start_at_and_end_at

  def add_start_at_and_end_at
    self.start_at = (business.in_trial_period? || ((Time.current - business.trial_end_at) < 10.days)) ? business.trial_end_at : Time.current
    self.end_at = start_at + 1.month
  end

  def in_future?
    start_at > Time.current && end_at > Time.current
  end

  def active?
    start_at < Time.current && end_at > Time.current
  end

  def update_end_time(time)
    update(end_at: time)
  end

end
