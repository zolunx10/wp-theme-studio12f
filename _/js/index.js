(function(exports) {
  function(src) {
    var 
        $src= $(src),
        $dst= $(src).clone();
    $dst.css({
      position: "absolute",
      top: 0,
      left: 0,
      width: $src.width(),
      height: $src.height()
      });
    $dst.hide().appendTo($src.parent());
    

    $src.css({
      visibility: "hidden"
    });  
    $dst.show().css({
      position: "visible"
      }).show();
  }
})(window);