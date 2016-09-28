class LoggerExtension

  def self.stripe_logger
    @stripe_logger ||= Logger.new("#{Rails.root}/log/stripe.log")
  end

  def self.stripe_log(text)
    stripe_logger.info "\n#{ text }\n"
  end

  def self.highlight
    stripe_logger.info "\n#{ ':' * 140 }\n#{ ':' * 140 }\n"
  end

end
