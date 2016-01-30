class ItemsController < ApplicationController

	before_action :set_item, only: [:update, :destroy]

	def index
		@items = Item.order(created_at: :desc)
		@item = Item.new
	end

	def create
		@item = Item.create(item_params)
		respond_to do |format|
			format.html { redirect_to root_path}
			format.js {}
		end
	end

	def update
		@item.update(item_params)
		respond_to do |format|
			format.html { redirect_to root_path }
			format.js {}
		end
	end

	def destroy
		@item.destroy
		respond_to do |format|
			format.html { redirect_to root_path }
			format.js {}
		end
	end

	private

	def set_item
		@item = Item.find(params[:id])
	end

	def item_params
		params.require(:item).permit(:description, :completed)
	end
end
