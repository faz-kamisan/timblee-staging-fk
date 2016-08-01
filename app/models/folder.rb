class Folder < ActiveRecord::Base
  belongs_to :business
  has_many :site_maps, dependent: :destroy
  validates :name, :business, presence: true
  validates :name, uniqueness: { scope: :business_id }

  before_save :format_name

  private

  def format_name
    self.name = self.name.strip.titleize
  end
end
