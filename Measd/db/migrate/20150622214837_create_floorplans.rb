class CreateFloorplans < ActiveRecord::Migration
  def change
    create_table :floorplans do |t|
      t.references :user, index: true, foreign_key: true
      t.binary :sandbox

      t.timestamps null: false
    end
  end
end
