$(document).ready(function(){
 var draw = SVG('drawing').size(800, 600)

 var roomWidth = 400;
 var roomLength = 250;
 var line = draw.line(0,500, 800,500).stroke({ width: 1 })

 var room = draw.rect(roomWidth,roomLength)
 room.fill('white')
 room.stroke({color: 'black', width: 1})
 room.move(200,50)

 $('#room_form').submit(function(e){
   e.preventDefault();
   room.width($('#room_width').val())
   room.height($('#room_length').val())
 })

 var bed = draw.image('assets/bed.png', 50,75)
 bed.move(50,510)
 bed.attr('name', 'Bed')

 var couch = draw.image('assets/couch.png', 139, 50)
 // couch.transform({scale: 100/couch.height()})
 couch.move(120, 510)
 couch.attr('name', 'Couch')
 console.log(couch.width())

 var toolBoxFurn = draw.group()
 toolBoxFurn.add(bed)
 toolBoxFurn.add(couch)

 var sandboxFurn = draw.group()
 sandboxFurn.attr('name', 'sandbox')

 toolBoxFurn.each(function(){
   this.on('click', function(){
     var clone = this.clone()
     console.log(clone.id())
     clone.move(0,0)
     clone.draggable()
     sandboxFurn.add(clone)
   })
 })

   var element;
   //update form for the furniture
   $('svg').on('click', 'g[name="sandbox"] image', function(){
     element = SVG.get(this.getAttribute('id'))
     // element.select().resize()
     console.log(element.ratio)
     $('#furn_name').val(element.attr('name'))
     $('#furn_width').val(element.width())
     $('#furn_length').val(element.height())
     $('#furn_rotation').val(element.transform('rotation'))
   })

   //update the furniture based on form input
   $('#furniture_form').on('submit', function(e){
     e.preventDefault()

     var xScale = $('#furn_width').val() / element.width()
     var yScale = $('#furn_length').val() / element.height()
     element.attr('name', $('#furn_name').val())
     element.scale(xScale, yScale)
     element.width($('#furn_width').val())
     // element.height($('#furn_length').val())
     element.transform({ rotation: $('#furn_rotation').val() })
   })

 })