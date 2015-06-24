$(document).ready(function(){
  var draw = SVG('drawing').size(800, 600);
  var elem = document.getElementById('drawing');

  var drawOffSetX = elem.offsetLeft;
  var drawOffSetY = elem.offsetTop;

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

  //var rect = draw.rect.fill('images/shade.jpg')
  //var test = rect.fill(draw.image('/assets/couch.png', 90, 40))
  //rect.move(100,100)

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

    var selected = false;
    var a = -1;
    var selectTop, selectBottom, selectLeft, selectRight;
    selectTop = draw.line(0,0,0,0).stroke({width: 1}); selectBottom = draw.line(0,0,0,0).stroke({width: 1}); selectLeft = draw.line(0,0,0,0).stroke({width: 1}); selectRight = draw.line(0,0,0,0).stroke({width: 1});
    var knob = draw.circle(0).stroke({color: "blue", width: 2});
    var connectKnob = draw.circle(0);
    var connectLine = draw.line(0,0,0,0);
    connectKnob.attr({fill: "blue"});
    knob.attr({ fill: "green"});
    knob.attr('name','rotationKnob');
    var padding=3;
    var set1 = draw.set();
    set1.add(selectTop); set1.add(selectBottom); set1.add(selectRight); set1.add(selectLeft);
    set1.add(knob); set1.add(connectKnob); set1.add(connectLine);
    var vmousedown = false;
    var mouseX, mouseY;
    var centerX,centerY;
    var mOldX,mOldY;
    var mPreviousAngle, mCurrentAngle;// both are angles relative to center of object
    var deltaAngle;
//end variable intialization
    $('svg').on('click', function(){
      if(a>-1){ a -= 1; }

      if(a == -1 ){
        selectTop.plot(0,0,0,0).stroke({ width: 1});
        selectBottom.plot(0,0,0,0).stroke({ width: 1});
        selectLeft.plot(0,0,0,0).stroke({ width: 1});
        selectRight.plot(0,0,0,0).stroke({ width: 1});
        knob.radius(0);
        connectKnob.radius(0);
        connectLine.plot(0,0,0,0).stroke({ width: 1});
      }
    })

$('svg').on('mousedown','circle[name = "rotationKnob"]',function(ev){
  vmousedown = true;
  mouseX = ev.pageX;
  mouseY = ev.pageY;
  centerX = element.cx();
  centerY = element.cy();
  mOldX = ev.pageX - drawOffSetX - centerX;
  mOldY = ev.pageY - drawOffSetY - centerY;
});
$('svg').on('mousemove',function(ev){
   if (vmousedown === false){ return; }
   //minus 90 puts it in perspective from object center
  //mPreviousAngle = 90 - angleGetter(mOldY/mOldX)*(360/(2*Math.PI));
  mPreviousAngle = 90 - Math.atan(mOldY/mOldX)*(360/(2*Math.PI));
  var mPreviousAngle2 = angleGetter(mOldX,mOldY,mPreviousAngle);
  console.log("previous ",mPreviousAngle, mPreviousAngle2);
  //mCurrentAngle = 90 - angleGetter((ev.pageY- drawOffSetY - centerY)  / (ev.pageX- drawOffSetX - centerX))*(360/(2*Math.PI));

   mCurrentAngle = 90 - Math.atan( (ev.pageY- drawOffSetY - centerY)  / (ev.pageX- drawOffSetX - centerX) )*(360/(2*Math.PI));
   var mCurrentAngle2 = angleGetter((ev.pageX- drawOffSetX - centerX),(ev.pageY- drawOffSetY - centerY),mCurrentAngle);
  console.log("Current ",mCurrentAngle, mCurrentAngle2);

  deltaAngle = mCurrentAngle - mPreviousAngle;

   //console.log(centerX, centerY);
   //console.log(mOldX, mOldY);
   //console.log(mPreviousAngle,mCurrentAngle,deltaAngle);
   // took off degrees = deltaAngle*-1; for testing

   degrees = deltaAngle*-1;
   // if( ((ev.pageY- drawOffSetY - centerY) > 0) && ((ev.pageX- drawOffSetX - centerX) < 0))
   // {
   //    degrees = 180 + degrees;
   // }

   //console.log("degrees = "+ degrees);
   degrees = element.transform("rotation") + degrees;

   if(degrees > 360){
     degrees = degrees % 360;
   }
   //console.log(degrees);
   element.rotate(degrees);
   set1.rotate(degrees, centerX, centerY);
   // mOldX = ev.pageX - drawOffSetX - centerX;
   // mOldY = ev.pageY - drawOffSetY - centerY;
});//end mousemove event

$('svg').on('mouseup',function(ev){
  if (vmousedown === false){ return; }

   vmousedown = false;

});//end mouseup event


$('svg').on('click', 'g[name="sandbox"] image', function(){
      if(a==-1){a +=2;}
      if(a==0){a+=1}
      element = SVG.get(this.getAttribute('id'))

    if(a == 1 || 0 ){
       // var cx = element.x();
       // var cy = element.y();
      draw.rotate(0,0,0);
      sandboxFurn.rotate(0);


      set1.rotate(element.transform("rotation"), centerX, centerY);
      // console.log('***************************');
      // console.log(element.transform());
      // set1.each(function(){ console.log(this.transform() )});
      // console.log('***************************');
      var tx = element.transform("x");
      var ty = element.transform("y");

      set1.transform({x: tx});
      set1.transform({y: ty});

      //element.transform({ rotation: 37.5 })
       var x = element.x() - padding;
       var x2 = x + element.width() + padding;
       var y = element.y() - padding;
       var y2 = y + element.height() + padding;
        selectTop.plot(x, y, x2, y ).stroke({ width: 1});
        selectBottom.plot(x, y2, x2, y2 ).stroke({ width: 1});
        selectLeft.plot(x, y, x, y2 ).stroke({ width: 1});
        selectRight.plot(x2, y, x2, y2 ).stroke({ width: 1});
        knob.radius(4); knob.move(x-2 +(x2-x)/2,y2+18)
        connectKnob.radius(4); connectKnob.move(x-2 +(x2-x)/2,y2);
        connectLine.plot(x+2 +(x2-x)/2,y2+4,x+2 +(x2-x)/2,y2+17).stroke({ width: 1});
        // draw.rotate(0);
        // sandboxFurn.rotate(0)

        //console.log(cx,cy);
        //set1.rotate(0)
        // set1.rotate(element.transform("rotation"), centerX, centerY)


     }
  })

  })


var angleGetter = function (x,y,degree){
  if(x > 0 && y > 0){
    return degree;
  }
  if(x < 0 && y > 0){
    return (180 + degree);
  }
  if(x < 0 && y < 0){
    return (degree + 180);
  }
  if(x > 0 && y < 0){
    return (degree + 360);
  }
}