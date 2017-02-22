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


  def self.export_logger
    @export_logger ||= Logger.new("#{Rails.root}/log/export.log")
  end

  def self.export_log(text)
    export_logger.info "\n#{ text }\n"
  end

  def self.export_highlight
    export_logger.info "\n#{ ':' * 140 }\n#{ ':' * 140 }\n"
  end

end
