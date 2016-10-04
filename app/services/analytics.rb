class Analytics
  class_attribute :backend
  self.backend = ::AnalyticsRuby

  def initialize(user)
    @user = user
    @business = user.business
  end

  def track_user_sign_up
    identify
    track(
      {
        user_id: user.id,
        event: 'Signed Up',
        'signed Up': user.created_at.strftime('%d %b %Y')
      }
    )
  end


  def track_pro_plan(old_subscription)
    identify
    business.reload
    track(
      {
        user_id: business.owner.id,
        event: 'Pro Plan taken',
        properties: {
          no_of_users: business.no_of_users,
          'monthly Spend': business.monthly_charge,
          old_plan: get_plan(old_subscription)
        }
      }
    )
  end

  def track_starter_plan(old_subscription)
    identify
    business.reload
    track(
      {
        user_id: business.owner.id,
        event: 'Starter Plan taken',
        properties: {
          old_plan: get_plan(old_subscription),
          owner_id: business.owner.id
        }
      }
    )
  end

  private

  def get_plan(subscription)
    subscription.present? ? 'Pro' : 'Starter'
  end

  def identify
    backend.identify(identify_params)
    backend.group(group_params)
  end

  attr_reader :user, :business

  def identify_params
    {
      user_id: user.id,
      traits: user_traits,
    }
  end

  def group_params
    {
      user_id: user.id,
      group_id: business.id,
      traits: business_traits,
    }
  end

  def user_traits
    {
      email: user.email,
      full_name: user.full_name,
      comments_count: user.comments.count
    }
  end

  def business_traits
    {
      owner_id: business.owner.id,
      business_name: business.name,
      trial_end_date: business.trial_end_at.strftime('%d %b %Y'),
      'monthly Spend': business.monthly_charge,
      plan: business.plan_name,
      no_of_sitemaps: business.sitemaps.count,
      first_sitemap_date: business.sitemaps.order(:created_at).first.try(:created_at).try(:strftime, '%d %b %Y'),
      comments_count: business.comments_count
    }
  end

  def track(options)
    options.merge(
      Intercom: {
        user_hash: OpenSSL::HMAC.hexdigest("sha256", INTERCOM_SECRET_KEY, "#{user.id}")
      }
    )
    backend.track(options)
  end
end
