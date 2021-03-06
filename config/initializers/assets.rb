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
  payments.js
  billing.js
  progress.js
  plan.js
  modal_fix.js
  team.js
  my_info.js
  toggle_class.js
  personalization.js
  jump_to.js
  rename_sitemap.js
  canvas_body.scss
  duplicate.js
  production_hotjar.js
  staging_hotjar.js
  notification.js
  intercom.js
  dragula.min.js
  dragula.min.css
  webpack-bundle.js
  webpack-vendor.js
  canvas_export.scss
  canvas_export_png.scss
  pdf.js
  png.js
  banner.js
  editor.scss
  flowchart.js
  flowchart_extended.js
  flowchart.css
  comment.js
)
# Add client/assets/ folders to asset pipeline's search path.
# If you do not want to move existing images and fonts from your Rails app
# you could also consider creating symlinks there that point to the original
# rails directories. In that case, you would not add these paths here.
# If you have a different server bundle file than your client bundle, you'll
# need to add it here, like this:
# Rails.application.config.assets.precompile += %w( server-bundle.js )

# Add folder with webpack generated assets to assets.paths
Rails.application.config.assets.paths << Rails.root.join("app", "assets", "webpack")
Rails.application.config.assets.paths << Rails.root.join("vendor", "assets", "javascripts", "emoji")
