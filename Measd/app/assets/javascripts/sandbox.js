$(document).ready(function(){
  var draw = SVG('drawing').size(800, 500)

  var convertToInches = .5
  var convertToPixels = 2
  var roomWidth = 432;
  var roomLength = 288;
  var line = draw.line(0,400, 800,400).stroke({ width: 1 })

  var room = draw.rect(roomWidth,roomLength)
  room.fill('white')
  room.stroke({color: 'black', width: 7, linejoin: 'round'})
  room.cx(400)
  room.cy(200)

  $('#room_width').val(room.width() * convertToInches)
  $('#room_length').val(room.height() * convertToInches)

  $('#room_form').submit(function(e){
    e.preventDefault();
    room.width($('#room_width').val() * convertToPixels)
    room.height($('#room_length').val() * convertToPixels)
    room.cx(400)
    room.cy(200)
    $('#room_form').hide();
  })

  var nightstand = draw.image('/assets/nightstand.png', 20,20)
  nightstand.move(10, 410)
  nightstand.attr({name: 'Nightstand', preserveAspectRatio: 'none'})

  var bed = draw.image('/assets/bed.png', 60, 80)
  bed.move(40,410)
  bed.attr({name: 'Bed'})

  var desk = draw.image('/assets/desk.png', 60,30)
  desk.move(110,410)
  desk.attr({name: 'Desk', preserveAspectRatio: 'none'})

  var couch = draw.image('/assets/couch.png', 90,40)
  couch.move(180, 410)
  couch.attr({name: 'Couch', preserveAspectRatio: 'none'})

  var sofa = draw.image('/assets/sofa.png', 50,40)
  sofa.move(280,410)
  sofa.attr({name: 'Sofa', preserveAspectRatio: 'none'})

  var tvStand = draw.image('/assets/tvstand.png', 60,20)
  tvStand.move(340,410)
  tvStand.attr({name: 'TV Stand', preserveAspectRatio: 'none'})

  var doorLeft = draw.image('/assets/doorleft.png', 30,30)
  doorLeft.move(410,410)
  doorLeft.attr({name: 'Door', preserveAspectRatio: 'none'})


  var doorRight = draw.image('/assets/doorright.png', 30,30)
  doorRight.move(450,410)
  doorRight.attr({name: 'Door', preserveAspectRatio: 'none'})

  var windowFrame = draw.image('/assets/window.png', 50,6)
  windowFrame.move(490,410)
  windowFrame.attr({name: 'Window', preserveAspectRatio: 'none'})

  var electric = draw.image('/assets/outlet.png', 25,25)
  electric.move(550,410)
  electric.attr({name: 'Power Outlet', preserveAspectRatio: 'none'})

  var intersectable = draw.group()
  intersectable.add(nightstand)
  intersectable.add(bed)
  intersectable.add(desk)
  intersectable.add(couch)
  intersectable.add(sofa)
  intersectable.add(tvStand)
  intersectable.add(doorLeft)
  intersectable.add(room)

  var toolBoxFurn = draw.group()
  toolBoxFurn.add(nightstand)
  toolBoxFurn.add(bed)
  toolBoxFurn.add(desk)
  toolBoxFurn.add(couch)
  toolBoxFurn.add(sofa)
  toolBoxFurn.add(tvStand)
  toolBoxFurn.add(doorLeft)
  toolBoxFurn.add(doorRight)
  toolBoxFurn.add(windowFrame)
  toolBoxFurn.add(electric)

  var sandboxFurn = draw.group()
  sandboxFurn.attr('name', 'sandbox')
  var element;
  var clone;

  //select furniture from sandbox
  $('svg').on('click', 'g[name="sandbox"] image', function(){
    element = SVG.get(this.getAttribute('id'))
  })

  //toolbox click
  toolBoxFurn.each(function(){
    this.on('click', function(){
      $("#furniture_form").show()
      $('#furn_name').val(this.attr('name'))
      $('#furn_width').val(this.width())
      $('#furn_length').val(this.height())
      // $('#furn_rotation').val(this.transform('rotation'))
      clone = this.clone()
    })
  })


    //update the furniture based on form input
    $('#furniture_form').on('submit', function(e){
      e.preventDefault()
      clone.move(10,10)
      clone.draggable()
      sandboxFurn.add(clone)
      clone.attr('name', $('#furn_name').val())
      clone.width($('#furn_width').val())
      clone.height($('#furn_length').val())
      $("#furniture_form").hide()

      // element.draggable(false)
      // element.transform({ rotation: $('#furn_rotation').val() })
      // element.draggable()

    })

  })