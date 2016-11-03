require 'createsend'

class CampaignMonitor

  AUTH = { api_key: Rails.application.secrets.campaign_monitor['api_key'] }
  SMART_EMAIL_IDS = {
    email_updated_verfication:                'cc76a3d4-a9cb-4c65-a428-da8616a70741',
    email_verification_1:                     'd40f9026-5e45-4245-aa08-7fea4dc9d271',
    forgot_password_email:                    '1ff7d0ae-5ec2-4bcb-877b-b66961a73800',

    new_user_invitation_reminder:             'b260e5c0-79aa-4c73-939d-e7fe570772d0',
    user_updates_their_email:                 'd1623e12-1231-40cd-b56c-e0c5383ac55f',
    admin_changes_team_member_email:          'b07c95d8-eadc-414c-a0ff-f4ec4756e3cf',
    admin_request_user_password_reset:        'ff8d4e96-57fc-4ca9-b990-044a9da55f28',
    email_verification_2:                     'ecc72182-d978-49cc-9f0f-b7285a6e981e',
    email_verification_3:                     'ac214d9f-7c7d-44e0-841c-6c26fea511d6',
    email_verification_4:                     '0895d30f-8844-499c-9f66-ae3be9674c88',
    resend_verification_email:                '1157aa2a-854b-48df-af5b-71f42d590a40',
    verification_email_locked_out:            'a61903fd-424c-4b99-b1cc-5b6ef3ce470d',

    account_activity_10_mins_batched_emails:  '',
    admin_changes_user_role_to_admin:         'd730588b-0309-44cb-bd76-49dfdab39369',
    account_deletion_request:                 '164bae64-37c2-4971-81af-7c40013006ac',
    invite_users_to_timble:                   'e9865900-6caf-4358-b03e-c2cb761f6d25',
    confirmation_instructions:                'd40f9026-5e45-4245-aa08-7fea4dc9d271',
    reconfirmation_instructions:              'cc76a3d4-a9cb-4c65-a428-da8616a70741',
    reset_password_instructions:              '1ff7d0ae-5ec2-4bcb-877b-b66961a73800',
    share_sitemap:                            '3707da03-0c49-47a0-878e-c33955e64b33',
    payment_success:                          '340f25ef-942d-435d-8b67-e1d3feb6609d',
    payment_failure:                          '3904f499-cc31-4717-baf2-5cf16830ca23',
    payment_refund:                           'd559e4a1-2c9c-4508-a081-08651d44456a',
    
    guest_notification_email:                 '5032a076-acef-4efa-9914-5fdcda216d62'
  }
end
