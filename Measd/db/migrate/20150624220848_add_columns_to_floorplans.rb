class AddColumnsToFloorplans < ActiveRecord::Migration
  def change
    add_column :floorplans, :name, :string
    add_column :floorplans, :svg_data, :string
  end
end
