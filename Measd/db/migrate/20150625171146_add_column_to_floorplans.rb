class AddColumnToFloorplans < ActiveRecord::Migration
  def change
    add_column :floorplans, :svgtext, :text
  end
end
