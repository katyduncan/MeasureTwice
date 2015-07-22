$(document).on('page:change',function(){
 derekEgg();
});

var derekEgg = function(){

  var soundEffects = {
    katy: '/sounds/kirbyhi.wav',
    majd: '/sounds/kirbyYah.wav',
    nate: '/sounds/foxWoah.wav',
    ryan: '/sounds/yoshiHowl.wav'
  };

   var imgs = [
     new Image(),
     new Image(),
     new Image(),
     new Image(),
     new Image(),
     new Image(),
     new Image(),
     new Image(),
     new Image()
   ];

   imgs[0].src = '/img/team/blackpiece.png';
   imgs[1].src = '/img/team/katy.jpg';
   imgs[2].src = '/img/team/majd.jpg';
   imgs[3].src = '/img/team/nate.jpg';
   imgs[4].src = '/img/team/ryan.jpg';
   imgs[5].src = '/img/team/pinkKirby.png';
   imgs[6].src = '/img/team/blueKirby.png';
   imgs[7].src = '/img/team/fireFox.png';
   imgs[8].src = '/img/team/yoshi.png';

   $('.hoverelement').on('mouseover', function(){
      if (this.id === "katyPic"){
        this.src=imgs[1].src
      }else if (this.id === "majdPic"){
        this.src=imgs[2].src
      }else if (this.id === "natePic"){
        this.src=imgs[3].src
      }else if (this.id === "ryanPic"){
        this.src=imgs[4].src
      }
    }); //ends mouseover element

   $('.hoverelement').on('mouseleave', function(){
     if (this.id === "katyPic"){
      this.src=imgs[5].src
      playSound(soundEffects["katy"]);
      }else if (this.id === "majdPic"){
        this.src=imgs[6].src
        playSound(soundEffects["majd"]);
      }else if (this.id === "natePic"){
        this.src=imgs[7].src
        playSound(soundEffects["nate"]);
      }else if (this.id === "ryanPic"){
        this.src=imgs[8].src
        playSound(soundEffects["ryan"]);
      }
    }); //ends mouse leave event
}; //ends function derek

var playSound = function(file){
  var snd = new Audio(file);
  return snd.play();
}//ends play sound
