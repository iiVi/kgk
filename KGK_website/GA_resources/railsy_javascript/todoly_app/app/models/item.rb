class Item < ActiveRecord::Base
	before_create :set_completed

	def set_completed
		self.completed = false
		self
	end
end
