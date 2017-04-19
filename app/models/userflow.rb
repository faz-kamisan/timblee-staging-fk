class Userflow < ActiveRecord::Base

  belongs_to :sitemap
  has_many :screens, dependent: :destroy
  has_many :comments, through: :sitemap
  has_many :page_comments, through: :sitemap

  before_create :set_name, unless: :name

  validates :sitemap, presence: true

  private
    def set_name
      default_name = sitemap.name + ' Flow '
      new_userflow_numbers = self.sitemap.userflows.where("name ~* ?", "^#{default_name}\\d+$").pluck(:name).map {|name| name.match(/\d*$/)[0].to_i}.sort
      if(new_userflow_numbers[0] == 1)
        first_unoccupied_number = (new_userflow_numbers.select.with_index { |number, index| number == index + 1 }[-1]) + 1
        self.name = default_name + first_unoccupied_number.to_s
      else
        self.name = "#{default_name}1"
      end
    end
end
