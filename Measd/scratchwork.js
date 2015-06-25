function overlap(selectedElement,group){
  var occupiedCoordinates = [];
  group.each(function(i){
    var x = this.x(); //top left corner of object
    var y = this.y();
    occupiedCoordinates.push([]);
    occupiedCoordinates[i].push([x,y]);
    if(this.transform("rotation") !== 0){
      for(var i=0; i < this.width(); i++)
      {
        x = x + tan(this.transform("rotation"));
        y = y + tan(this.transform("rotation"));
        occupiedCoordinates[i].push([x,y]);
      }
        x = this.x(); //top left corner of object
        y = this.y();
      for(var i=0; i < this.height(); i++)
      {
        x = x + tan(this.transform("rotation"));
        y = y + tan(this.transform("rotation"));

      }
    }
  });
}