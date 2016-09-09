/*
script du carrousel
*/

var carrousel = {

    nbSlide: 0,
    nbCurrent: 1,
    elemCurrent: null,
    elem: null,
    timer: null,
    index: null,


    init: function(elem) {
        this.nbSlide = elem.find(".slide").length;

        //Pagination
        elem.append('<div class="navigation"</div>');
        for (var i = 1; i <= this.nbSlide; i++) {
            elem.find(".navigation").append("<span>" + i + "</span>");
        }

        elem.find(".navigation span").click(function(){carrousel.gotoSlide($(this).text());})
        elem.find(".btn-left").click(function(){carrousel.prev();})
        elem.find(".btn-right").click(function(){carrousel.next();})
        //Initialisation du carrousel
        this.elem = elem;
        this.elem.find(".slide").hide();
        this.elem.find(".slide:first").show();
        this.elemCurrent = elem.find(".slide:first");
        this.elem.find(".navigation span:first").addClass("active");

        //On cré le timer
        this.launchCarousel();

        //Stop quan on passe dessus
        elem.mouseover(carrousel.stop);
        elem.mouseout(carrousel.play);
    },

    launchCarousel: function() {
      clearInterval(this.timer);
      this.timer = window.setInterval("carrousel.next()",2000);
    },

    gotoSlide: function(num){
      console.log(num);
      num = Number(num);
      var index = num - 1;
      if (num==this.nbCurrent){return false;}
/*Animation fadein/fadeout
      this.elemCurrent.fadeOut();
      this.elem.find("#slide"+num).fadeIn();
*/

/*Animation en slide*/
      var sens = 1;
      if(num<this.nbCurrent){
          sens = -1;
        }
      var cssDeb = {"left": sens*this.elem.width()};
      var cssFin = {"left": -sens*this.elem.width()};
      this.elem.find("#slide"+num).show().css(cssDeb);
      this.elem.find("#slide"+num).animate({"top":0,"left":0},500);
      this.elemCurrent.animate(cssFin,500);

      this.elem.find(".navigation span").removeClass("active");
      this.elem.find(".navigation span:eq("+index+")").addClass("active");
      this.nbCurrent = num;
      this.elemCurrent = this.elem.find("#slide"+num);
      this.launchCarousel();
    },
    next: function(){
      var num = this.nbCurrent+1;
      if(num>this.nbSlide){
        num=1;
      }
      console.log(num);
      this.gotoSlide(num);
    },

    prev: function(){
      var num = this.nbCurrent-1;
      if(num<1){
        num=this.nbSlide;
      }
      this.gotoSlide(num);
    },
    stop: function(){
      window.clearInterval(carrousel.timer);
    },
    play: function(){
      carrousel.launchCarousel();
    }
}
$(function() {
    carrousel.init($("#carrousel"));
    //    alert(carrousel.nbSlide);
});
