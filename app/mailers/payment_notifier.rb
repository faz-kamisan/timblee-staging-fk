class PaymentNotifier < ActionMailer::Base
  default from: 'admin@timblee.com', to: 'pratibha@vinsol.com'

  def success(user, event)
    @event = event
    @user = user
    @business = user.business
    @amount = @event.data.object.amount / 100.to_f
    attachments['invoice.pdf'] = PdfGeneratorService.new("#{ Rails.root }/app/views/payment_notifier/success_invoice.html.erb", binding).generate_pdf
    if Rails.env.staging?
      smart_email_id = CampaignMonitor::SMART_EMAIL_IDS[:payment_success]
      tx_smart_mailer = CreateSend::Transactional::SmartEmail.new(CampaignMonitor::AUTH, smart_email_id)
      message = {
      'To' => "#{@user.full_name} <#{@user.email}>",
        'Data' => {
          'firstname' => @user.full_name,
          'card-last-four-digits' => @event.data.object.source.last4,
          'dollar-amount' => @amount,
          'x' => @business.no_of_users,
          'monthly charge' => @business.monthly_charge,
          'variableName' => @user.full_name
        }
      }
      response = tx_smart_mailer.send(message)
    else
      mail to: user.email, subject: 'Payment successfull for Pro subscription!'
    end
  end

  def refund(user, event)
    @event = event
    @user = user
    @amount_refunded = @event.data.object.amount_refunded / 100.to_f
    attachments['invoice.pdf'] = PdfGeneratorService.new("#{ Rails.root }/app/views/payment_notifier/refund_invoice.html.erb", binding).generate_pdf
    if Rails.env.staging?
      smart_email_id = CampaignMonitor::SMART_EMAIL_IDS[:payment_refund]
      tx_smart_mailer = CreateSend::Transactional::SmartEmail.new(CampaignMonitor::AUTH, smart_email_id)
      message = {
      'To' => "#{@user.full_name} <#{@user.email}>",
        'Data' => {
          'firstname' => @user.full_name,
          'dollar-amount' => @amount_refunded,
          'card-last-4-digits' => @event.data.object.source.last4
        }
      }
      response = tx_smart_mailer.send(message)
    else
      mail to: user.email, subject: 'Payment refunded for Pro subscription!'
    end
  end

  def failure(user, event)
    @event = event
    @user = user
    if Rails.env.staging?
      smart_email_id = CampaignMonitor::SMART_EMAIL_IDS[:payment_failure]
      tx_smart_mailer = CreateSend::Transactional::SmartEmail.new(CampaignMonitor::AUTH, smart_email_id)
      message = {
      'To' => "#{@user.full_name} <#{@user.email}>",
        'Data' => {
          'firstname' => @user.full_name,
          'card-last-four-digits' => @event.data.object.source.last4,
          'dollar-amount' => @amount,
          'x' => @business.no_of_users,
          'x hours' => ''
        }
      }
      response = tx_smart_mailer.send(message)
    else
      mail to: user.email, subject: 'Payment failure for Pro subscription!'
    end
  end

  def exception(user, exception)
    @exception = exception
    @user = user
    @business = user.business
    mail subject: 'Exception while taking subscription!'
  end
end
