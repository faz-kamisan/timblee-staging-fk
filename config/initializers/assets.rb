#Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.

Rails.application.config.assets.precompile += %w(
  folders.js
  moreOptions.js
  sitemaps.js
  show_modal.js
  show_sucessful_reset_password_sent_modal.js
  tagIt.js
  invitations.js
  delete_user.js
  delete_sitemap.js
  apply-twemoji.js
  payments.js
  billing.js
  progress.js
  plan.js
  modal_fix.js
)
