class FloorplansController < ApplicationController
def index
    @floorplans = Floorplan.all
  end

  def show
    @floorplans = Floorplan.find(params[:id])
    render json: {data: @floorplan.svg_data}
  end

  def serve
    p "GOT HERE!!!"
    @floorplans = Floorplan.find(params[:id])
    # @user = @floorplans.user
    send_data(@floorplans.sandbox, :type => @floorplans.mime_type, :filename => "#{@floorplans.name}.png", :disposition => "inline")
  end

  def new
    @user = User.find(params[:user_id])
    @floorplans = @user.floorplans.new
  end

  def create
    p "MADE IT TO RUBY CREATE CONTROLLER"
    p params[:data]
    @user = User.find(params[:user_id])
    @floorplan = @user.floorplans.new(name: params[:name],svg_data: params[:data])

    # @floorplans = @user.floorplans.new(floorplan_params) do |t|
    #   if params[:floorplan][:sandbox]
    #     t.sandbox = params[:floorplan][:sandbox].read
    #     t.filename = params[:floorplan][:sandbox].original_filename
    #     t.mime_type = params[:floorplan][:sandbox].content_type
    #   end
    # end
    # if @floorplans.save
    #   redirect_to user_floorplan_path(@user, @floorplans)
    #   # add a notice that floorplan saved successfully
    # else
    #   render :action => "new"
    # end
    if @floorplan.save
      p @floorplan.svg_data
      render json: @floorplan
      # redirect_to user_floorplan_path(@user, @floorplan)
    else
      render :action => "new"
    end
  end

  def edit
  end

  def upload
    uploaded_io = params[:person][:picture]
    File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'wb') do |file|
      file.write(uploaded_io.read)
    end
  end

  def update
  end

  def destroy
  end

  private
    def floorplan_params
      # params.require(:floorplan).permit(params[:floorplan][:sandbox], :user_id, :name)
    end
end
