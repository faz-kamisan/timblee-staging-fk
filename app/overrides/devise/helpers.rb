Devise::Mailers::Helpers.module_eval do
  include Devise::Controllers::UrlHelpers
  def devise_mail(record, action, opts={})
    initialize_from_record(record)
    # override action when reconfirmation is requested.
    if Rails.env.development?
      if action == :confirmation_instructions && record.pending_reconfirmation?
        action = :reconfirmation_instructions
      end

      puts CreateSend::Transactional::SmartEmail.new(CampaignMonitor::AUTH, get_smart_email_id(action)).send(get_message_hash(record, action, opts))
    else
      mail headers_for(action, opts)
    end
  end

  def get_smart_email_id(action)
    CampaignMonitor::SMART_EMAIL_IDS[action]
  end

  def get_message_hash(record, action, opts)
    { 'To' => headers_for(action, opts)[:to], 'Data' => get_data_hash(record, action) }
  end

  def get_data_hash(record, action)
    data_hash = { 'firstname' => record.full_name }
    if action == :confirmation_instructions
      data_hash.merge!({ 'show the whole verification link here': user_confirmation_url(confirmation_token: @token) })
    end
    if action == :reset_password_instructions
      data_hash.merge!({ 'show the whole verification link here': edit_user_password_url(reset_password_token: @token) })
    end
    if action == :reconfirmation_instructions
      data_hash.merge!({ 'show the whole verification link here': user_confirmation_url(confirmation_token: @token) })
    end

    data_hash
  end
end
