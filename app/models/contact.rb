class Contact < ActiveRecord::Base
  has_many :numbers

  validates :email, uniqueness: true

  def to_s
    "#{self.id}: #{self.firstname} #{self.lastname} (#{self.email})"
  end

  def self.email_duplicate?(email)
    Contact.find_by_email(email) ? true : false
  end

end