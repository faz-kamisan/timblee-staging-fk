class Analytics
  class_attribute :backend
  self.backend = ::AnalyticsRuby

  ORPHAN_USERS_COMPANY = {name: 'Purgatory', id: 0}

  def initialize(user)
    @user = user
    @business = user.business
  end

  def track_user
    identify
  end

  def track_user_sign_up
    identify
    track(
      {
        user_id: user.id,
        event: 'Signed Up',
        properties: {
          signed_up: user.created_at.to_date
        }
      }
    )
  end

  def track_soft_delete
    disassociate_user_from_company
  end


  def track_pro_plan(old_subscription)
    identify
    business.reload
    trial_days_left = (business.trial_end_at.to_date - Date.current).to_i
    track(
      {
        user_id: business.owner.id,
        event: 'Pro Plan taken',
        properties: {
          trial_days_left: (trial_days_left > 0 ? trial_days_left : 0),
          no_of_users: business.no_of_users,
          'monthly Spend': business.monthly_charge,
          old_plan: business.get_plan(old_subscription)
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
          old_plan: business.get_plan(old_subscription),
          owner_id: business.owner.id
        }
      }
    )
  end

  private

  def identify
    backend.identify(identify_params)
    backend.group(group_params)
  end

  def disassociate_user_from_company
    backend.identify(
    {
      user_id: user.id,
      traits: {
        company: {
          id: business.id,
          remove: true
        }
      }
    })
    backend.group(
    {
      user_id: user.id,
      group_id: ORPHAN_USERS_COMPANY[:id],
      traits: {
        name: ORPHAN_USERS_COMPANY[:name]
      }
    })
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
      name: user.full_name,
      comments_count: user.comments.count,
      user_type: user.user_type,
      createdAt: user.created_at
    }
  end

  def business_traits
    {
      owner_id: business.owner.id,
      name: business.name,
      trial_end_date: business.trial_end_at.strftime('%d %b %Y'),
      'monthly Spend': business.monthly_charge,
      plan: business.plan_name,
      no_of_sitemaps: business.sitemaps.count,
      first_sitemap_date: business.sitemaps.order(:created_at).first.try(:created_at).try(:strftime, '%d %b %Y'),
      createdAt: business.created_at,
      comments_count: business.comments_count,
      trial_type: business.trial_days.to_s + ' days'
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
