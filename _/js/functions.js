// remap $ to $
var exports= window;
(function($){
var RE_URICMP=/[?&](\w+)=([^&=]*)/ig;
/****
 * 单击首页小图标时用fancybox显示相册
 */
exports.makeGallery= function(settings) {
  var opts= {
    jsonUrl: "/"
  };
  opts= $.extend(opts, settings);
  var galleryCache={};
  var openFancy= function(objs) {
      $.fancybox(objs, {
          nextClick: true
        , arrows: true
        , nextEffect: 'fade'
        , prevEffect: 'fade'
        , helpers : { 
            thumbs : {
              width : 50
            , height: 50
            , source: function(obj) { return obj.src; }
            }
          }
      });
  }
  $('body').delegate('.ngg-thumbnail a.ngg-link', 'click', function() {
    var t, params={},
        $this= $(this),
        href= opts.getHref ? opts.getHref(this) : this.href;
    $.fancybox.showLoading();
    RE_URICMP.lastIndex= 0;
    while (t=RE_URICMP.exec(href)) {
      params[t[1]]= t[2];
    }
    var gid= params['gallery'];
    if (galleryCache[gid]) {
      openFancy(galleryCache[gid]);
    } else {
      $.getJSON(opts.jsonUrl+"?callback=json&format=json&method=gallery&api_key=studio12F&id="+gid, function(json) {
          if (! json.images) {
            $.fancybox.hideLoading();
            return false;
          }
          var imgs= json.images,
              objs=[];
          var title= $this.attr('title');
          for (var i=0, ii=imgs.length; i<ii; i++) {
            objs.push({
              href: imgs[i].imageURL,
              src: imgs[i].thumbURL,
              title: title
              //, title: imgs[i].description
            });
          }
          galleryCache[gid]= objs;
          openFancy(objs);
      });
    }
    return false;
  });
}


/* trigger when page is ready */

$(document).ready(function(){
  //左右键翻页
  if ($('.navigation').length>0) {
    var aPrev= $('.prev-posts a').attr('href'),
        aNext= $('.next-posts a').attr('href');
    $('body').keydown(function(e) {
      if (aPrev && e.which==37) {  //keyleft
        //$('.prev-posts a').first().click(); 无法触发跳转
        window.location.href = aPrev;
      } else if (aNext && e.which==39) { //keyright
        window.location.href = aNext;
      }
    })
  };
});
  
})(window.jQuery);

/* optional triggers

$(window).load(function() {
	
});

$(window).resize(function() {
	
});

*/