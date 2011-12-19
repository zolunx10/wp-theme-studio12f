/****************************************
 * utility
 */

var isIE6 = navigator.appVersion.indexOf("MSIE 6") > 0;
/****
 * IE6不支持position:fixed需要修正
 */
function fixedPosition(el) {
  if(el && isIE6) {
    var top = parseInt(el.currentStyle.top);
    el.style.position = "absolute";
    $(window).scroll(function() {
      var t = (document.documentElement.scrollTop|| document.body.scrollTop) + top;
      if(t) {
        el.style.top = t;
      }
    });
  }
}

(function($) {
/****
 * y坐标转为absolute
 * 目前不处理relative, static
 */
$.fn.toAbsolute= function(options) {
  var cssPos= this.css('position');
  if (cssPos=="absolute") {
    return this;
  } else {
    var offset={
        top: parseInt(this.css('top')) ||0
    };
    if (cssPos=="fixed") {
      this.css({
        position: "absolute",
        top: $(window).scrollTop() +offset.top
      });
    } else  {
      offset= this.offset();
      this.css({
        position: "absolute",
        left: offset.left,
        top: offset.top
      });
    }
  }
};

/****
 * 随页面滚动而fixed, 类似taobao搜索时的那条"排序, 价格筛选..."
 * @param options {
     top    =0, fixed后的css值
 }
 */
$.fn.autoStick= function(options) {
  var opts= {
      top:0,
      scroll: null,
      stick: null,
      unstick: null
  };
  $.extend(opts, options);
  this.each(function(i) {
    var self= this,
    $this = $(this),
    offset = $this.offset(),
    threshold = offset.top- opts.top,
    cssOld = {
      position: $this.css('position'),
      width: $this.width(),
      top: $this.css('top'),
      left: $this.css('left')
    };
    $(window).resize(function() {
      offset= $this.offset();
      threshold= offset.top- opts.top;
    });
    var refresh= function(e) {
      var t= $(window).scrollTop();
      if (t>threshold) {
        if (!$this.hasClass('sticky')) {
          $this.addClass('sticky').css({
            position:"fixed",
            width: cssOld.width,
            top: opts.top,
            left: offset.left
          });
          fixedPosition(self);
          opts.stick && opts.stick.call(self);
        }
      } else {
        if ($this.hasClass('sticky')) {
          $this.removeClass('sticky').css(cssOld);
          opts.unstick && opts.unstick.call(self);
        }
      }
      opts.scroll && opts.scroll.call(self);
    };
    refresh();
    $(window).scroll(refresh);
  });
  return this;
};
})(window.jQuery);