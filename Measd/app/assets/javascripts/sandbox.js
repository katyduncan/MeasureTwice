$(document).ready(function(){
  var draw = SVG('drawing').size(800, 600)

  var roomWidth = 550;
  var roomLength = 350;
  var line = draw.line(0,500, 800,500).stroke({ width: 1 })

  var room = draw.rect(roomWidth,roomLength)
  room.fill('white')
  room.stroke({color: 'black', width: 7, linejoin: 'round'})
  room.move(100,50)

  $('#room_width').val(room.width())
  $('#room_length').val(room.height())

  $('#room_form').submit(function(e){
    e.preventDefault();
    room.width($('#room_width').val())
    room.height($('#room_length').val())
  })

  var nightstand = draw.image('/assets/nightstand.png', 20,20)
  nightstand.move(10, 510)
  nightstand.attr({name: 'Nightstand', preserveAspectRatio: 'none'})


  var bed = draw.image('/assets/bed.png', 60,80)
  bed.move(40,510)
  bed.attr({name: 'Bed', preserveAspectRatio: 'none'})

  var desk = draw.image('/assets/desk.png', 60,30)
  desk.move(110,510)
  desk.attr({name: 'Desk', preserveAspectRatio: 'none'})

  var couch = draw.image('/assets/couch.png', 90,40)
  couch.move(180, 510)
  couch.attr({name: 'Couch', preserveAspectRatio: 'none'})

  var sofa = draw.image('/assets/sofa.png', 50,40)
  sofa.move(280,510)
  sofa.attr({name: 'Sofa', preserveAspectRatio: 'none'})

  var tvStand = draw.image('/assets/tvstand.png', 60,20)
  tvStand.move(340,510)
  tvStand.attr({name: 'TV Stand', preserveAspectRatio: 'none'})

  var doorLeft = draw.image('/assets/doorleft.png', 30,30)
  doorLeft.move(410,510)
  doorLeft.attr({name: 'Door', preserveAspectRatio: 'none'})


  var doorRight = draw.image('/assets/doorright.png', 30,30)
  doorRight.move(450,510)
  doorRight.attr({name: 'Door', preserveAspectRatio: 'none'})

  var windowFrame = draw.image('/assets/window.png', 50,6)
  windowFrame.move(490,510)
  windowFrame.attr({name: 'Window', preserveAspectRatio: 'none'})

  var electric = draw.image('/assets/outlet.png', 25,25)
  electric.move(550,510)
  electric.attr({name: 'Power Outlet', preserveAspectRatio: 'none'})

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

  toolBoxFurn.each(function(){
    this.on('click', function(){
      var clone = this.clone()
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
      $('#furn_name').val(element.attr('name'))
      $('#furn_width').val(element.width())
      $('#furn_length').val(element.height())
      $('#furn_rotation').val(element.transform('rotation'))
    })

    //update the furniture based on form input
    $('#furniture_form').on('submit', function(e){
      e.preventDefault()
      element.draggable(false)
      element.attr('name', $('#furn_name').val())
      element.width($('#furn_width').val())
      element.height($('#furn_length').val())
      element.transform({ rotation: $('#furn_rotation').val() })
      element.draggable()

    })

  })