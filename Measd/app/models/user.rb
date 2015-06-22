class User < ActiveRecord::Base
  has_many :floorplans
  validates :name, presence: true
  validates :email, presence: true
end
