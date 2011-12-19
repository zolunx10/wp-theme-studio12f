(function($){

/****
 * data [{
    tags {} 标签
    href
    src 图片路径
    alt 
 }]
 */
  var LiClassifier= function(el, opts) {
    var defaults= {
      type: null,   //初始分类依据
      cols: 1,
      width: 40,
      height:40,
      gutter:5,
      tplCol: ""
    };    
    this.el= el;
    var sc= {
      width:opts.width+opts.gutter*2,
      height:opts.height+opts.gutter*2
    };
    opts= $.extend({}, defaults, opts);
    this.sc= sc;
    this.opts= opts;
    this.type= opts.type;
    this.data= null;
  }
  LiClassifier.prototype.render= function(data) {
    this.data= data;
    this.resort(this.type);
  }
  LiClassifier.prototype.resort= function(type) {
    var 
      self= this,
      $el= $(this.el),
      $newel= $('<ul class="cfy-container">'),
      set= {};
    if (!type) {
      return;
    }
    type= type.toLowerCase();
    //将各data重新分类到指定集合
    $.each(this.data, function(i, v) {
      var t= v.tags[type];
      if (!t) {
        return;
      }
      if (! set[t] ) {
        set[t]=[v];
      } else {
        set[t].push(v);
      }
      return;
    });
    /****
     * 将一个img加入col并调整位置
     */
    function addImg(col, el, index) {
      index= index || $('a.cfy-item', col).length;
      var 
          sc= this.sc,
          n= this.opts.col,
          x= (index %n) *sc.width,
          y= (index /n) *sc.height;
      $(el).css({
        position: "absolute",
        bottom: y,
        left: x
      });
    }
    //将分好的set加入dom
    $.each(set, function(k, v) {
      //结算mustache
      var view= {
        title: k,
        items: v
      };
      var t= Mustache.to_html(self.opts.tplCol, view);
      $newel.append(t);
    })
    //动画
    $('a', $newel[0]).hover(function(e) {

      }).fancybox();
    $(this.el).empty();
    $newel.appendTo(this.el);
  }


/*
$(document).ready(function()
    {
        $(".project").hide();
        $("#filter").hide();
        $("#stage").hide();
        var $item = $("#items .item")
        var $ele = $("#items .item a")
        $ele.click(function()
            {
                $item.eq(0).text("项目");
                $item.slice(1).hide();
                $(".project").show();
                $("#filter").show();
            });

        $("#back a").click(function()
            {
                $item.eq(0).text("概况");
                $item.slice(1).show();
                $(".project").hide();
                $("#filter").hide();
            });

    var items = $('#stage li'),
	itemsByTags = {};
	// Looping though all the li items:
	
	items.each(function(i){
		var elem = $(this),
			tags = elem.data('tags').split(',');
		    
		// Adding a data-id attribute. Required by the Quicksand plugin:
		elem.attr('data-id',i);
		
		$.each(tags,function(key,value){
		
			// Removing extra whitespace:
			value = $.trim(value);
			if(!(value in itemsByTags)){
				// Create an empty array to hold this item:
				itemsByTags[value] = [];
			}
			
			// Each item is added to one array per tag:
			itemsByTags[value].push(elem);
		});
		
	});


	// Looping though the arrays in itemsByTags:
	$.each(itemsByTags,function(k,v){
		createList(k,v);
	});
    
    $("#imagebox .first:odd").hide();
    $("#filter a").eq(0).click(function(){
        $("#imagebox .first:odd").hide("fast");
        $("#imagebox .first:even").show("fast");
    }
    );
    $("#filter a").eq(1).click(function(){
        $("#imagebox .first:odd").show("fast");
        $("#imagebox .first:even").hide("fast");
    }
    );
    function createList(text,items){
		
		// This is a helper function that takes the
		// text of a menu button and array of li items
		
		// Creating an empty unordered list:
        if(text != 'Type' && text != 'Time'){
		var ul = $('<ul>');
		
	    $.each(items,function(index,value){
			// Creating a copy of each li item
			// and adding it to the list:
		    var element = $(this);
            element.css({'position':'absolute','bottom':index*102})
            element.clone().appendTo(ul);
		});
        var div = $('<div>',{'id':text,'class':'first'});
        ul.appendTo(div);
        divtext = $('<div>',{html:text});
        divtext.appendTo(div);
        div.appendTo('#imagebox');
        }
        else{
		// Creating a menu item. The unordered list is added
		// as a data parameter (available via .data('list'):
		var a = $('<a>',{
			html: text,
			href:'#',
			data: {list:ul}
		}).appendTo('#filter');
    }

    }

  })
  */
  $(document).ready(function() {
    var data=[];
    $('#stage').hide();
    $('#stage li').each(function(i) {
      //TODO 从dom提取所需数据
      var t= $(this).data('tags').split(',');
      var tags= {};
      for (var j=0; j<2; j++) {
        tags[t[j].toLowerCase()]= t[j+2];
      }
      data.push({
        tags: tags,
        href: $('img', this).attr('src'),
        src: $('img', this).attr('src')
      });
    })
    
    var classfier= new LiClassifier($('#imagebox')[0], {
      type:'Time',
      tplCol: $('#tpl-cfy-col').html(),
      cols:2
    });
    classfier.render(data);

    window.classfier= classfier;
  })
})(window.jQuery);