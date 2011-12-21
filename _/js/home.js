$(document).ready(function()
    {
        $(".project").hide();
        $("#filter").hide();
        $("#stage").hide();
        var $item = $(".item");
        var $ele = $(".item a");
        var $info = $("#info a");
        var imageboxtype = $("#imagebox li.type").clone();
        var imageboxtime = $("#imagebox li.time").clone();
        $ele.eq(0).click(function()
            {
                $info.hide("slide",{direction:"left"},400);
                $ele.eq(0).clone().appendTo("div#info");
                $item.hide();
                $(".project").show("slide",{direction:"left"},400);
                $("#filter").show("slide",{direction:"left"},400);
            });

        $("#back a").click(function()
            {
                $info.show("slide",{direction:"left"},400);
                $("#info a").eq(1).remove();
                $item.show("slide",{direction:"left"},400);

                $(".project").hide(1000,"easeOutBounce");
                $("#filter").hide(1000,"easeOutBounce");
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
			itemsByTags[value].push(elem);
		});
		
	});

    var textbox = $('<div>');

	// Looping though the arrays in itemsByTags:
	$.each(itemsByTags,function(k,v){
		createList(k,v);
       	});
    textbox.appendTo('#imagebox');    
    $("#filter a").eq(0).click(function(){
          //$("#imagebox li.type").removeClass("vesibilityclass").addClass("unvesibilityclass");
              
          //$("#imagebox li.time").removeClass("unvesibilityclass").addClass("vesibilityclass");
        var preitems=$("#imagebox li.type").clone();  
        $("#imagebox li.type").each(function(){
            var $ele=$(this);
            $ele.animate({
                left:$("#imagebox li.time").filter(function(){
                    return $ele.attr("data-id")==$(this).attr("data-id")
                }).css('left'),
                bottom:$("#imagebox li.time").filter(function(){
                    return $ele.attr("data-id")==$(this).attr("data-id")
                }).css('bottom')
            },400,function(){
                    $("#imagebox li.type").hide();
                    $("#imagebox li.time").show();
            });
        });
              
        //$("#imagebox li.type").hide(0);
        //$("#imagebox li.time").show();

        $("#imagebox li.type").each(function(index){
            var $ele=$(this);
            $ele.animate({
                left:preitems.eq(index).css('left'),
                bottom:preitems.eq(index).css('bottom')},400);
         });
        //$("#imagebox li.time").removeClass("vesibilityclass").addClass("unvesibilityclass");
              
        //$("#imagebox li.type").removeClass("unvesibilityclass").addClass("vesibilityclass");

        $("#imagebox span.type").removeClass("vesibilityclass").addClass("unvesibilityclass");
        $("#imagebox span.time").removeClass("unvesibilityclass").addClass("vesibilityclass");
    });
 
    $("#filter a").eq(1).click(function(){
          var preitems=$("#imagebox li.time").clone();
          $("#imagebox li.time").each(function(index){
            var $ele=$(this);
            $ele.animate({
                left:$("#imagebox li.type").filter(function(){
                    return $ele.attr("data-id")==$(this).attr("data-id")
                }).css('left')
                ,bottom:$("#imagebox li.type").filter(function(){
                    return $ele.attr("data-id")==$(this).attr("data-id")
            }).css('bottom')},400,function(){
                            $("#imagebox li.time").hide();
                            $("#imagebox li.type").show();
                        });
          });
         //$("#imagebox li.time").hide(0);
         //$("#imagebox li.type").show(0);
         $("#imagebox li.time").each(function(index){
            var $ele=$(this);
            $ele.animate({
                left:preitems.eq(index).css('left'),
                bottom:preitems.eq(index).css('bottom')},400);
         });
     
        //$("#imagebox li.time").removeClass("vesibilityclass").addClass("unvesibilityclass");
              
        //$("#imagebox li.type").removeClass("unvesibilityclass").addClass("vesibilityclass");

         $("#imagebox span.time").removeClass("vesibilityclass").addClass("unvesibilityclass");
         $("#imagebox span.type").removeClass("unvesibilityclass").addClass("vesibilityclass");

        });
                
    function createList(text,items){
		
		// This is a helper function that takes the
		// text of a menu button and array of li items
		
		// Creating an empty unordered list:
        if(text != 'Type' && text != 'Time'){
		var ul = $('<ul>');
        var j,k;//k for the opacity
        switch(text){
        case('2007'):
            j=0;
            k=1;
            break;
        case('urban'):
            j=0;
            k=0;
            break;
        case('2008'):
            j=1;
            k=1;
            break;
        case('country'):
            j=1;
            k=0;
            break;
        case('2009'):
            j=2;
            k=1;
            break;
        case('building'):
            j=2;
            k=0;
            break;
        case('2010'):
            j=3;
            k=1;
            break;
        case('landscape'):
            j=3;
            k=0;
            break;
       case('2011'):
            j=4;
            k=1;
            break;
        case('other'):
            j=4;
            k=0;
            break;
        default:
            j=0;
            k=1;
        }
	    $.each(items,function(index,value){
			// Creating a copy of each li item
			// and adding it to the list:
		    var element = $(this);
            element.css({'position':'absolute','bottom':12+index*102,'left':j*132});
            if(k==0){
                //element.removeClass("vesibilityclass").addClass("unvesibilityclass");
                element.hide();
                element.removeClass("time").addClass("type");
            }
            else{
                //element.removeClass("unvesibilityclass").addClass("vesibilityclass");
                element.show();
                element.removeClass("type").addClass("time");
            }
            element.clone().appendTo(ul);
		});
        ul.appendTo('#imagebox');
        var tex = $('<span>',{
                html:text
        });
        tex.css({'position':'absolute','bottom':'0px','left':j*132});
        if(k==0){
            tex.removeClass("vesibilityclass").addClass("unvesibilityclass");
            tex.removeClass("time").addClass("type");
        }
        else{
            tex.removeClass("unvesibilityclass").addClass("vesibilityclass");
            tex.removeClass("type").addClass("time");
        }
        tex.appendTo(textbox);
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

    $(document).ready(function() {
      setTimeout(function() {
        
      }, 5000);
    })