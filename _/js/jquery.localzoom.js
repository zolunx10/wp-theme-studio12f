/****
 * LocalZoom - jQuery Plugin
 * Author: zolunx10@hotmail.com
 * Vesion: 2011-12-01
 * licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function($) {
  var $viewer;
  function reset() {
    if ($viewer) {
      $viewer.remove();
    }
    $viewer= $('<div id="localzoom-viewer" class="clearfix">').css({
        'position': "absolute"
      , 'display': "none"
      , 'z-index': 100
    });
    $viewer.prependTo('body').mouseleave(function(e) {
      $(this).hide();
    });
  }
  $.fn.localzoom= function(settings) {
    var opts ={
      ratio: 1.4
      , speed: 200
      , border: 0
      , topMin: 120
      , show: function() {}
    };
    if (settings) {
      $.extend(opts, settings);
    }
    var $this= $(this);
    if (!$viewer) {
      reset();
    }
    $el= $this.clone().css({
      position: "relative"
    });
    var sc= {
      top: $this.offset().top
    , left: $this.offset().left
    , width: $this.width()
    , height: $this.height()
    };
    $viewer.hide().empty().append($el).css({
          "-moz-box-shadow": "0px 0px 12px black"
          ,"-webkit-box-shadow": "0px 0px 12px black"
          ,'top': sc.top
          ,'left': sc.left
    }).show();

    sc.top+=sc.height*(1-opts.ratio)/2, 
    sc.left+=sc.width*(1-opts.ratio)/2, 
    sc.width*=opts.ratio,
    sc.height*=opts.ratio;
    $viewer.stop().animate({
      top: sc.top
      ,left: sc.left
      }, opts.speed, opts.show);
    $el.animate({
        width:sc.width
      , height: sc.height
    }, opts.speed);
    // handle img in el (only the first one)
    var $img= $('img', $el).eq(0),
        imgSc= {
          width: $img.width()
        , height: $img.height()
        };
    $('img', $viewer).eq(0).css(imgSc).stop()
      .animate({
        width: imgSc.width*opts.ratio
      , height: imgSc.height*opts.ratio
      }, opts.speed);
  };
  $.localzoom= function(selector, settings) {
    var opts= $.extend({
      delay: 200
    }, settings);
    var tmr;
    $('body').delegate(selector, 'mouseenter', function() {
      clearTimeout(tmr);  tmr= null;
      var el= this;
      tmr =setTimeout(function() {
        $(el).localzoom(opts);
      }, opts.delay);
    }).delegate(selector, 'mouseleave', function() {
      clearTimeout(tmr);
    })
  };
})(jQuery);