require 'carrierwave/processing/mini_magick'

class AvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  process resize_to_fit: [100, 100], :if => :is_not_svg?

  def is_not_svg?(picture)
    picture.content_type != "image/svg+xml"
  end

  def store_dir
    "assets/uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_whitelist
    %w(jpg jpeg gif png)
  end
end
