class FloorplansController < ApplicationController
def index
    @floorplans = Floorplan.all
  end

  def show
    @floorplan = Floorplan.find(params[:id])
    p @floorplan
    p "SVG:"
    # p @floorplan.svg_data
    p @floorplan.svgtext
    render json: {data: @floorplan.svgtext}
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

    @user = User.find(params[:user_id])
    @floorplan = @user.floorplans.new(name: params[:name],svgtext: params[:data])
    if @floorplan.save
      p @floorplan.svgtext
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
