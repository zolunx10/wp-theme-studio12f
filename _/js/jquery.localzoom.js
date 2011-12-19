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
    $viewer.prependTo('body');
  }
  $.fn.localzoom= function(settings) {
    var opts ={
      ratio: 1.4
      , speed: 200
      , border: 0
      , topMin: 120
    };
    if (settings) {
      $.extend(opts, settings);
    }
    var $this= $(this);
    if (!$viewer) {
      reset();
    }
    $el= $this.clone().css({
      position: "static"
    });
    var sc= {
      top: $this.offset().top
    , left: $this.offset().left
    , width: $this.width()
    , height: $this.height()
    };
    $viewer.hide().empty().append($el).css($.extend(sc, {
          "-moz-box-shadow": "0px 0px 12px black"
          ,"-webkit-box-shadow": "0px 0px 12px black"
    })).show();

    sc.top+=sc.height*(1-opts.ratio)/2, 
    sc.left+=sc.width*(1-opts.ratio)/2, 
    sc.width*=opts.ratio,
    sc.height*=opts.ratio;
    $viewer.stop().animate(sc, opts.speed);
    $('img', $el).each(function(){
      var t= {
        width: Math.round( $(this).width()*opts.ratio)
        , height: Math.round( $(this).height()*opts.ratio )
      };
      $(this).animate({
        width: t.width
      , height: t.height
      }, opts.speed);
    });
  };
  $.localzoom= function(selector, settings) {
    var tmr;
    $('body').delegate(selector, 'mouseenter', function() {
      clearTimeout(tmr);  tmr= null;
      var el= this;
      tmr =setTimeout(function() {
        $(el).localzoom(settings);
      }, settings.delay ||200);
    }).delegate(selector, 'mouseleave', function() {
      clearTimeout(tmr);
    })
  };
})(jQuery);