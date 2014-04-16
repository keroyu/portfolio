(function($){
    $.fn.kerosEasySlider = function(options){

        var defaults = $.extend({
                    direction : 'h',
                    speed: 800,
                    loop: true
        }, options );

        return this.each(function(){
            var o = options;

            var obj = $('.kerosEasySlider'),
                itemNum = $('.kerosEasySlider ul.item-list li').length,
                wid = obj.find('.item-list li > *').width(),
                hgt = obj.find('.item-list li > *').height(),
                $ul = obj.find('ul.item-list'),
                $activeLi = obj.find('ul.item-list li[class=active]');

            obj.css( 'height', hgt + 'px' );

            obj.find('.viewport').css({
                'overflow' : 'hidden', 'width' : wid +'px', 'height': hgt + 'px'
            });

            obj.find('.track').css({
                'position' : 'relative'
            });

            $ul.css({
                'position': 'relative', 'text-align' : 'left'
            });

            obj.find('ul.item-list li').css({
                'width' : wid + 'px', 'height': hgt + 'px'
            });

            /* DIRECTION BRANCH  */
            if( o.direction == 'h' ){
                var itemUnit = wid,
                    trackLength = (itemNum*2-1) * itemUnit,
                    offSetting  = (itemNum-1) * itemUnit;
                obj.find('.track').css({
                    height : hgt + 'px', width : trackLength + 'px', left  : '-' + offSetting + 'px'
                });

                // MAKE THE ITEM LIST ALIGN TO THE VIEWPORT
                $ul.css({
                    'height' : hgt + 'px', 'left' : offSetting + 'px'
                })

                obj.find('ul.item-list li').css({
                    'display' : 'inline-block'
                })

                // BASIC SLIDER ANIMATION
                var basicMove = function(thisIndex, targetIndex, itemUnit){
                    var offset = (targetIndex - thisIndex) * itemUnit;

                    if( offset > 0 ){
                        $ul.stop(true,true).animate( { left : "-=" + offset }, o.speed, "easeOutExpo" );
                    }else{
                        $ul.stop(true,true).animate({ left :"+="+ Math.abs(offset) }, o.speed, "easeOutExpo" );
                    }
                    obj.find('ul.marker li').eq(targetIndex).addClass('active').siblings().removeClass('active');
                    obj.find('ul.item-list li').eq(targetIndex).addClass('active').siblings().removeClass('active');
                };
            }

            if( o.direction == 'v' ){
                var itemUnit = hgt,
                    trackLength = (itemNum*2-1) * itemUnit,
                    offSetting  = (itemNum-1) * itemUnit;

                obj.find('ul.item-list li').css ( 'display', 'block');
                obj.find('.track').css({
                    // 'height': itemUnit + 'px',
                    width : trackLength + 'px',
                    top  : '-' + offSetting + 'px'
                });

                // MAKE THE ITEM LIST ALIGN TO THE VIEWPORT
                $ul.css( 'top', offSetting + 'px' )

                // BASIC SLIDER ANIMATION
                var basicMove = function(thisIndex, targetIndex, itemUnit){
                    var offset = (targetIndex - thisIndex) * itemUnit;

                    if( offset > 0 ){
                        $ul.stop(true,true).animate( { top : "-=" + offset }, o.speed, "easeOutExpo" );
                    }else{
                        $ul.stop(true,true).animate({ top :"+="+ Math.abs(offset) }, o.speed, "easeOutExpo" );
                    }

                    obj.find('ul.marker li').eq(targetIndex).addClass('active').siblings().removeClass('active');
                    obj.find('ul.item-list li').eq(targetIndex).addClass('active').siblings().removeClass('active');
                };
            }

            /* DIRECTION BRANCH ENDS  */

            // MARKER TRIGGER
            obj.find('ul.marker li').click(function(){

                if( $(this).hasClass('active') == false ){

                    var thisIndex = obj.find('ul.marker li[class=active]').index(),
                        targetIndex = $(this).index(),
                        itemUnit = 750;
                    basicMove(thisIndex, targetIndex, itemUnit);
                }
            });

            /* GO TO NEXT OR PREVIOUS */
            var moveOne = function(whichWay, thisIndex, itemNum){
                if( whichWay == 'next') {
                    if( thisIndex == itemNum-1  ){
                        var targetIndex = o.loop ? 0 : thisIndex;
                    }else{
                        var targetIndex = thisIndex + 1;
                    }
                }
                if( whichWay == 'prev') {
                    if( thisIndex == 0  ){
                        var targetIndex = o.loop ? itemNum-1 : thisIndex;
                    }else{
                        var targetIndex = thisIndex - 1;
                    }
                }
                basicMove(thisIndex, targetIndex,itemUnit);
            };

            // CONTROLLER
            obj.find('span.btn a').click(function()
            {
                var thisIndex = obj.find('ul.item-list li[class=active]').index();
                whichWay = $(this).hasClass('next') ? 'next' : 'prev';
                moveOne( whichWay, thisIndex, itemNum )

            });


        }); // FUNCTION DEFINITION ENDS

    }


}(jQuery));