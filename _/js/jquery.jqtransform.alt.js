/*
 * altered by zolunX10@hotmail.com
 * 将替代部分div改为span, 优化jqSelect部分的事件调用
 */
/*
 *
 * jqTransform
 * by mathieu vilaplana mvilaplana@dfc-e.com
 * Designer ghyslain armand garmand@dfc-e.com
 *
 *
 * Version 1.0 25.09.08
 * Version 1.1 06.08.09
 * Add event click on Checkbox and Radio
 * Auto calculate the size of a select element
 * Can now, disabled the elements
 * Correct bug in ff if click on select (overflow=hidden)
 * No need any more preloading !!
 * 
 ******************************************** */
 
(function($){
	var defaultOptions = {preloadImg:true};
	var jqTransformImgPreloaded = false;

	var jqTransformPreloadHoverFocusImg = function(strImgUrl) {
		//guillemets to remove for ie
		strImgUrl = strImgUrl.replace(/^url\((.*)\)/,'$1').replace(/^\"(.*)\"$/,'$1');
		var imgHover = new Image();
		imgHover.src = strImgUrl.replace(/\.([a-zA-Z]*)$/,'-hover.$1');
		var imgFocus = new Image();
		imgFocus.src = strImgUrl.replace(/\.([a-zA-Z]*)$/,'-focus.$1');				
	};

	
	/***************************
	  Labels
	***************************/
	var jqTransformGetLabel = function(objfield){
		var selfForm = $(objfield.get(0).form);
		var oLabel = objfield.next();
		if(!oLabel.is('label')) {
			oLabel = objfield.prev();
			if(oLabel.is('label')){
				var inputname = objfield.attr('id');
				if(inputname){
					oLabel = selfForm.find('label[for="'+inputname+'"]');
				} 
			}
		}
		if(oLabel.is('label')){return oLabel.css('cursor','pointer');}
		return false;
	};
	
	/* Hide all open selects */
	var jqTransformHideSelect = function(oTarget){
		var ulVisible = $('.jqTransformSelectWrapper ul:visible');
		ulVisible.each(function(){
			var oSelect = $(this).parents(".jqTransformSelectWrapper:first").find("select").get(0);
			//do not hide if click on the label object associated to the select
			if( !(oTarget && oSelect.oLabel && oSelect.oLabel.get(0) == oTarget.get(0)) ){$(this).hide();}
		});
	};
	/* Check for an external click */
	var jqTransformCheckExternalClick = function(event) {
		if ($(event.target).parents('.jqTransformSelectWrapper').length === 0) { jqTransformHideSelect($(event.target)); }
	};

	/* Apply document listener */
	var jqTransformAddDocumentListener = function (){
		$(document).mousedown(jqTransformCheckExternalClick);
	};	
			
	/* Add a new handler for the reset action */
	var jqTransformReset = function(f){
		var sel;
		$('.jqTransformSelectWrapper select', f).each(function(){sel = (this.selectedIndex<0) ? 0 : this.selectedIndex; $('ul', $(this).parent()).each(function(){$('a:eq('+ sel +')', this).click();});});
		$('a.jqTransformCheckbox, a.jqTransformRadio', f).removeClass('jqTransformChecked');
		$('input:checkbox, input:radio', f).each(function(){if(this.checked){$('a', $(this).parent()).addClass('jqTransformChecked');}});
	};

	/***************************
	  Buttons
	 ***************************/
	$.fn.jqTransInputButton = function(){
		return this.each(function(){
			var newBtn = $('<button id="'+ this.id +'" name="'+ this.name +'" type="'+ this.type +'" class="'+ this.className +' jqTransformButton"><span><span>'+ $(this).attr('value') +'</span></span>')
				.hover(function(){newBtn.addClass('jqTransformButton_hover');},function(){newBtn.removeClass('jqTransformButton_hover')})
				.mousedown(function(){newBtn.addClass('jqTransformButton_click')})
				.mouseup(function(){newBtn.removeClass('jqTransformButton_click')})
			;
			$(this).replaceWith(newBtn);
		});
	};
	
	/***************************
	  Text Fields 
	 ***************************/
	$.fn.jqTransInputText = function(){
		return this.each(function(){
			var $input = $(this);
	
			if($input.hasClass('jqtranformdone') || !$input.is('input')) {return;}
			$input.addClass('jqtranformdone');
	
			var oLabel = jqTransformGetLabel($(this));
			oLabel && oLabel.bind('click',function(){$input.focus();});
	
			var inputSize=$input.width();
			if($input.attr('size')){
				inputSize = $input.attr('size')*10;
				$input.css('width',inputSize);
			}
			
			$input.addClass("jqTransformInput").wrap('<span class="jqTransformInputWrapper"><span class="jqTransformInputInner"><span></span></span></span>');
			var $wrapper = $input.parent().parent().parent();
			$wrapper.css("width", inputSize);
			$input
				.focus(function(){$wrapper.addClass("jqTransformInputWrapper_focus");})
				.blur(function(){$wrapper.removeClass("jqTransformInputWrapper_focus");})
				.hover(function(){$wrapper.addClass("jqTransformInputWrapper_hover");},function(){$wrapper.removeClass("jqTransformInputWrapper_hover");})
			;
	
			/* If this is safari we need to add an extra class */
			$.browser.safari && $wrapper.addClass('jqTransformSafari');
			//$.browser.safari && $input.css('width',$wrapper.width()+16);
			this.wrapper = $wrapper;
			
		});
	};
	
	/***************************
	  Check Boxes 
	 ***************************/	
	$.fn.jqTransCheckBox = function(){
		return this.each(function(){
			if($(this).hasClass('jqTransformHidden')) {return;}

			var $input = $(this);
			var inputSelf = this;

			//set the click on the label
			var oLabel=jqTransformGetLabel($input);
			oLabel && oLabel.click(function(){aLink.trigger('click');});
			
			var aLink = $('<a href="#" class="jqTransformCheckbox"></a>');
			//wrap and add the link
			$input.addClass('jqTransformHidden').wrap('<span class="jqTransformCheckboxWrapper"></span>').parent().prepend(aLink);
			//on change, change the class of the link
			$input.change(function(){
				this.checked && aLink.addClass('jqTransformChecked') || aLink.removeClass('jqTransformChecked');
				return true;
			});
			// Click Handler, trigger the click and change event on the input
			aLink.click(function(){
				//do nothing if the original input is disabled
				if($input.attr('disabled')){return false;}
				//trigger the envents on the input object
				$input.trigger('click').trigger("change");	
				return false;
			});

			// set the default state
			this.checked && aLink.addClass('jqTransformChecked');		
		});
	};
	/***************************
	  Radio Buttons 
	 ***************************/	
	$.fn.jqTransRadio = function(){
		return this.each(function(){
			if($(this).hasClass('jqTransformHidden')) {return;}

			var $input = $(this);
			var inputSelf = this;
				
			oLabel = jqTransformGetLabel($input);
			oLabel && oLabel.click(function(){aLink.trigger('click');});
	
			var aLink = $('<a href="#" class="jqTransformRadio" rel="'+ this.name +'"></a>');
			$input.addClass('jqTransformHidden').wrap('<span class="jqTransformRadioWrapper"></span>').parent().prepend(aLink);
			
			$input.change(function(){
				inputSelf.checked && aLink.addClass('jqTransformChecked') || aLink.removeClass('jqTransformChecked');
				return true;
			});
			// Click Handler
			aLink.click(function(){
				if($input.attr('disabled')){return false;}
				$input.trigger('click').trigger('change');
	
				// uncheck all others of same name input radio elements
				$('input[name="'+$input.attr('name')+'"]',inputSelf.form).not($input).each(function(){
					$(this).attr('type')=='radio' && $(this).trigger('change');
				});
	
				return false;					
			});
			// set the default state
			inputSelf.checked && aLink.addClass('jqTransformChecked');
		});
	};
	
	/***************************
	  TextArea 
	 ***************************/	
	$.fn.jqTransTextarea = function(){
		return this.each(function(){
			var textarea = $(this);
	
			if(textarea.hasClass('jqtransformdone')) {return;}
			textarea.addClass('jqtransformdone');
	
			oLabel = jqTransformGetLabel(textarea);
			oLabel && oLabel.click(function(){textarea.focus();});
			
			var strTable = '<table cellspacing="0" cellpadding="0" border="0" class="jqTransformTextarea">';
			strTable +='<tr><td id="jqTransformTextarea-tl"></td><td id="jqTransformTextarea-tm"></td><td id="jqTransformTextarea-tr"></td></tr>';
			strTable +='<tr><td id="jqTransformTextarea-ml">&nbsp;</td><td id="jqTransformTextarea-mm"><span></span></td><td id="jqTransformTextarea-mr">&nbsp;</td></tr>';	
			strTable +='<tr><td id="jqTransformTextarea-bl"></td><td id="jqTransformTextarea-bm"></td><td id="jqTransformTextarea-br"></td></tr>';
			strTable +='</table>';					
			var oTable = $(strTable)
					.insertAfter(textarea)
					.hover(function(){
						!oTable.hasClass('jqTransformTextarea-focus') && oTable.addClass('jqTransformTextarea-hover');
					},function(){
						oTable.removeClass('jqTransformTextarea-hover');					
					})
				;
				
			textarea
				.focus(function(){oTable.removeClass('jqTransformTextarea-hover').addClass('jqTransformTextarea-focus');})
				.blur(function(){oTable.removeClass('jqTransformTextarea-focus');})
				.appendTo($('#jqTransformTextarea-mm span',oTable))
			;
			this.oTable = oTable;
			if($.browser.safari){
				$('#jqTransformTextarea-mm',oTable)
					.addClass('jqTransformSafariTextarea')
					.find('span')
						.css('height',textarea.height())
						.css('width',textarea.width())
				;
			}
		});
	};
	
	/***************************
	  Select 
	 ***************************/	
	$.fn.jqTransSelect = function(option){
    //当在外围单击时关闭下拉框
    var $selectors= [];
      $('body').click(function(){
        $.each($selectors, function() {
          $(this).hide();
        });
        
      });
		return this.each(function(index){
			var $select = $(this);
            option =option ||{};
            option.index =option.index ||index;
			if($select.hasClass('jqTransformHidden')) {return;}
			if($select.attr('multiple')) {return;}
            $select.css('visibility', "hidden");

			var oLabel  =  jqTransformGetLabel($select);
			/* First thing we do is Wrap it */
			var $wrapper = $select
				.addClass('jqTransformHidden')
				.wrap('<span class="jqTransformSelectWrapper"></span>')
				.parent()
				.css('z-index', 10-option.index)
			;
			
			/* Now add the html for the select */
			$wrapper.prepend('<span><span class="jqTransformSelectInput"></span><a href="#" class="jqTransformSelectOpen"></a></span><ul></ul>');
			var $ul = $('ul', $wrapper).css({
        'width': $select.width(),
        'top': $wrapper.height()
        }).hide();
            var liHeight =null;
            function updateUl(that){
              //TODO: too simple sometimes naive
              var $lis =$ul.find('li'), $opts =$select.children('option');
              if ($lis.length ==$opts.length
                  && $lis.first().text() ==$opts.first().text()){
                return;
              }
              $ul.empty();
              /* Now we add the options */
              $('option', $select).each(function(i){
                  $this =$(this);
                  var oLi = $('<li tabindex="'+ i +'">'+ $this.html() +'</li>');
                  oLi.first().data('val', $this.val());
                  $ul.append(oLi);
              });
              /* Add click handler to the a */
              $a =$ul.find('li');
              $a.click(function(){
                      $('li.selected', $wrapper).removeClass('selected');
                      $(this).addClass('selected');	
                      /* Fire the onchange event */
                      if ($select[0].selectedIndex != $(this).attr('tabindex')) { 
                        $select[0].selectedIndex = $(this).attr('tabindex'); $select.change(); 
                      }
                      $select[0].selectedIndex = $(this).attr('tabindex');
                      $('span.jqTransformSelectInput', $wrapper).html($(this).html());
                      $ul.hide();
                      return false;
              });
              if (option['optionOver']){
                $a.hover(option['optionOver'], option['optionOut']);
              }

              // Set the new width
              var iSelectWidth = $select.outerWidth();
              var oSpan = $('span:first',$wrapper);
              var newWidth = (iSelectWidth > oSpan.innerWidth())?iSelectWidth+oLinkOpen.outerWidth():$wrapper.width();
              $wrapper.css('width',newWidth);
              $ul.css('width',newWidth-2);
              oSpan.css({width:iSelectWidth});
          
              //show the ul to calculate the block, if ul is not displayed li height value is 0
              $ul.css({display:'block',visibility:'hidden'});
              // Calculate the height if necessary, less elements that the default height
              liHeight =($('li:first',$ul).height());
              var iSelectHeight = ($('li',$ul).length)*liHeight;//+1 else bug ff
              if (iSelectHeight < $ul.height()){
                $ul.css({height:iSelectHeight,'overflow':'auto'});//hidden else bug with ff
              } else{
                $ul.css("height", $ul.css("max-height")|| "200px");
              }
              
              /* Apply the click handler to the Open */
              $ul.css({display:'none',visibility:'visible'});
              $ul.css('overflow', "auto");
            }
            var that =this;
            var oLinkOpen = //$('a.jqTransformSelectOpen', $wrapper)
                $wrapper
                .click(function(e){
                  if($select.attr('disabled')){return false;}
                    //Check if box is already open to still allow toggle, but close all other selects
                  if( $ul.css('display') == 'none' ) {jqTransformHideSelect();} 
                  if ($ul.css('display')=='block') {
                      $ul.slideUp('fast');
                  } else {
                     updateUl.call(that);
                      $ul.slideDown('fast', function(){
                      var $aSelected =$('li.selected', $ul);
                      if ($aSelected.length <=0){
                        $aSelected =$('li', $ul).first();
                      }
                      //var offSet = ($aSelected.offset().top - $ul.offset().top);
                      var offSet =$ul.find('li').index($aSelected) *liHeight;
                      //$ul.animate({scrollTop: offSet});
                      $ul.scrollTop(offSet);
                    });
                  }
                  return false;
                })
            ;
            updateUl.call(that);
			
			/* Set the default */
			$('li:eq('+ this.selectedIndex +')', $ul).click();
      /*
			$wrapper.click(function(){
        $("a.jqTransformSelectOpen",this).trigger('click');
      });
      */
			oLabel && oLabel.click(function(){$("a.jqTransformSelectOpen",$wrapper).trigger('click');});
			this.oLabel = oLabel;
		  
      $selectors.push($ul);	
		});
	};
	$.fn.jqTransform = function(options){
		var opt = $.extend({},defaultOptions,options);
		
		/* each form */
		 return this.each(function(){
			var selfForm = $(this);
			if(selfForm.hasClass('jqtransformdone')) {return;}
			selfForm.addClass('jqtransformdone');
			
			$('input:submit, input:reset, input[type="button"]', this).jqTransInputButton();			
			$('input:text, input:password', this).jqTransInputText();			
			$('input:checkbox', this).jqTransCheckBox();
			$('input:radio', this).jqTransRadio();
			$('textarea', this).jqTransTextarea();
			
			if( $('select', this).jqTransSelect().length > 0 ){jqTransformAddDocumentListener();}
			selfForm.bind('reset',function(){var action = function(){jqTransformReset(this);}; window.setTimeout(action, 10);});
			
			//preloading dont needed anymore since normal, focus and hover image are the same one
			/*if(opt.preloadImg && !jqTransformImgPreloaded){
				jqTransformImgPreloaded = true;
				var oInputText = $('input:text:first', selfForm);
				if(oInputText.length > 0){
					//pour ie on eleve les ""
					var strWrapperImgUrl = oInputText.get(0).wrapper.css('background-image');
					jqTransformPreloadHoverFocusImg(strWrapperImgUrl);					
					var strInnerImgUrl = $('span.jqTransformInputInner',$(oInputText.get(0).wrapper)).css('background-image');
					jqTransformPreloadHoverFocusImg(strInnerImgUrl);
				}
				
				var oTextarea = $('textarea',selfForm);
				if(oTextarea.length > 0){
					var oTable = oTextarea.get(0).oTable;
					$('td',oTable).each(function(){
						var strImgBack = $(this).css('background-image');
						jqTransformPreloadHoverFocusImg(strImgBack);
					});
				}
			}*/
			
			
		}); /* End Form each */
				
	};/* End the Plugin */

})(jQuery);				   