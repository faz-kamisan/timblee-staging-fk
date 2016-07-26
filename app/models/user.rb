class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :business
  has_many :folders, dependent: :destroy
  has_many :sitemaps, foreign_key: :creator_id

  before_create :create_business, unless: :business

  private
    def create_business
      business = Business.create(owner_id: self.id)
      self.business_id = business.id
    end
end
