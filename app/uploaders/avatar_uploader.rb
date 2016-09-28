require 'carrierwave/processing/mini_magick'

class AvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  version :thumb do
    process resize_to_fit: [100, 100], if: :is_not_svg?
  end

  def is_not_svg?(picture)
    picture.content_type != "image/svg+xml"
  end

  def store_dir
    "assets/uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_whitelist
    %w(jpg jpeg gif png)
  end

  def manipulate!
    Rails.logger.info "*" * 30
    Rails.logger.info "In manipulate"
    cache_stored_file! if !cached?
    Rails.logger.info "*" * 30

    Rails.logger.info current_path
    Rails.logger.info @format
    Rails.logger.info system('$PATH')
    Rails.logger.info "Opening Image"
    image = ::MiniMagick::Image.open(current_path)

    Rails.logger.info "*" * 30
    
    begin
      image.format(@format.to_s.downcase) if @format
      image = yield(image)
      image.write(current_path)
      image.run_command("identify", current_path)
    ensure
      image.destroy!
    end
  rescue ::MiniMagick::Error, ::MiniMagick::Invalid => e
    default = I18n.translate(:"errors.messages.mini_magick_processing_error", :e => e, :locale => :en)
    message = I18n.translate(:"errors.messages.mini_magick_processing_error", :e => e, :default => default)
    raise CarrierWave::ProcessingError, message
  end

end
