$(document).ready(function(){
    $("#filter").hide();
    $("#stage").hide();
    var $b= $("#imagebox");
    $b.css("margin-top", ($('div.home-content').height()-$b.height())*0.4 +"px");
    var $nav = $(".home-nav .item");
    var $ele = $("a", $nav);
    var $info = $("#info a");
    var imageboxtype = $("#imagebox li.type").clone();
    var imageboxtime = $("#imagebox li.time").clone();

    var $items = $('#stage li').clone(),
        tagList= {
            time: [],
            type: []
        },
        cols= {
            time: {},
            type: {}
        },
        colCount={};
    /* 计算每张图片在特定tag下的对应坐标 */
    var $imgBox= $('<ul>').hide().append($items).appendTo($('#imagebox'));
    var $labelBox= $('<div class="label">').appendTo($('#imagebox'));
    // step 1. 统计每个tag对应的图片
    $items.each(function(index) {
        var $this=$(this),
            tags= $this.data('tags').split(',');
        // 只考虑time, type
        for (var ii=tags.length, i=Math.floor(ii/2); i<ii; i++) {
            var v=$.trim(tags[i]),
                className;
            if(v>1900){
                v= parseInt(v);
                if(v <= 2002)
                    v = 2002;
                else if(v <= 2004)
                    v = 2004;
                else if(v <= 2006)
                    v = 2006;
                else if(v <= 2009)
                    v =2009;
                className="time";
            } else {
                className="type";
            }
            if (cols[className][v]==null) {
                tagList[className].push(v);
                cols[className][v]= [this];
            } else {
                cols[className][v].push(this);
            }
        }
    });
    tagList.time.sort();
    tagList.type.sort(function(l, r) {
       if (l=='other') {
           return 1;
       } else if (r=='other') {
           return -1;
       } else {
           return 0;
       }
    });
    // step 2. 通过tagList 确定坐标
    var opts= {
        numPerCol: 5,
        padding: 20,
        width: 66,
        height: 72
    };
    var TYPE_NAME= {
        "urban": "城市设计",
        "arch": "建筑设计",
        "village": "乡村规划",
        "other": "其他"
        /*
        "urban": "Urban Design",
        "arch": "Architecture Design",
        "village": "Village Planning",
        "other": "Other"*/
    };
    $.each(tagList, function(className, tags) {
        // className为time或type
        var colNum=0;   //暂存当前tag起始列
        for (var i=0, ii=tags.length; i<ii; i++) {
            var col= cols[className][tags[i]];
            for (var j=0, jj=col.length; j<jj; j++) {
                var el= col[j];
                //计算并暂存坐标
                var t= {
                    bottom: opts.padding+ (j%opts.numPerCol)*opts.height,
                    left: i*opts.padding+ Math.floor(j/5+colNum)*opts.width
                };
                $(el).data('pos-'+className, t);
            }
            //顺便创建下方的label
            var cnt= colCount[tags[i]]= Math.floor(col.length/5.1)+1;
            var labelName= tags[i]>1900 ? tags[i] : (TYPE_NAME[tags[i]] || tags[i]),
                $label= $('<span class="'+className+'"></span>')
                .hide()
                .html(labelName)
                .css({
                    left:i*opts.padding+ colNum*opts.width +5,
                    width: cnt*opts.width
                })
                .appendTo($labelBox);

            colNum+=cnt;
        }
    });
    $items.each(function() {
        $(this).css('position',"absolute");
    });
    /****
     * 按相应tag排列
     * @param className 为 time | type
     */
    function show(className) {
        $items.each(function() {
            var t= $(this).data('pos-'+className);
            $(this).animate(t);
        });
        $labelBox.children().hide();
        $('.'+className, $labelBox).show();
        return false;
    }
    show('time');
    $imgBox.show();
    /****
     * 创建下方选择按钮
     */
    function makeFilter() {
        var tpl=$('#tpl-nav-li').html();
        var $pageNav= $('#items li').not('.info, .more, .filter-item'),
            $more= $('#items .more a'),
            $filter= $(Mustache.to_html(tpl, {
                    name: "CHRONOLOGY"
                  , nameZh: "时间"
                  , href: "#"
                  , 'class': "filter-item"
                }))
          .add(Mustache.to_html(tpl, {
                name: "TYPE"
              , nameZh: "类型"
              , href: "#"
              , 'class': "filter-item"
            }));
        $filter.eq(0).click(function() {
            show('time');
            return false;
        });
        $filter.eq(1).click(function() {
            show('type');
            return false;
        });
        $('#items').append($filter);
        var isFilter= true;
        $pageNav.hide();
        $more.click(function() {
            if (isFilter) {
                $filter.hide();
                $pageNav.show();
            } else {
                $pageNav.hide();
                $filter.show();
            }
            isFilter= !isFilter;
            return false;
        });
    }
    makeFilter();
});