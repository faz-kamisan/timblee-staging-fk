class PaymentNotifier < ActionMailer::Base
  default from: 'admin@timblee.com'

  def success(user, event)
    @event = event
    @user = user
    @amount = @event.data.object.amount / 100
    attachments['invoice.pdf'] = PdfGeneratorService.new("#{ Rails.root }/app/views/payment_notifier/success_invoice.html.erb", binding).generate_pdf
    mail to: user.email, subject: 'Payment successfull for Pro subscription!'
  end

  def refund(user, event)
    @event = event
    @user = user
    @amount_refunded = @event.data.object.amount_refunded / 100
    attachments['invoice.pdf'] = PdfGeneratorService.new("#{ Rails.root }/app/views/payment_notifier/refund_invoice.html.erb", binding).generate_pdf
    mail to: user.email, subject: 'Payment refunded for Pro subscription!'
  end

  def failure(user, event)
    @event = event
    @user = user
    mail to: user.email, subject: 'Payment failure for Pro subscription!'
  end
end