/**
 * 首页JS
 * author : Tom
 * time : 2015-7-10
 */
define(['jquery','viwepager','scrollLoading'],function($){
    $(function(){
        $(".scrollLoading").scrollLoading();
        $(window).scroll(function(){
            if($(window).scrollTop()>300)//    //历史维系榜单动画
            {
                $('.sheet').each(function(){
                    $(this).find('li').each(function(e){
                        $(this).css({
                            'animation-delay':e*0.5+'s'
                        });
                        $(this).addClass('start');
                    })
                });
            }
            if($(window).scrollTop()>900)//二手机动画
            {
                $('.phoneMain>.right').find('li:eq(0)').animate({
                    opacity:'1',
                    right: '410px'
                }, 750);
                $('.phoneMain>.right').find('li:eq(1)').animate({
                    opacity:'1',
                    right: '208px'
                }, 1200);
                $('.phoneMain>.right').find('li:eq(2)').animate({
                    opacity:'1',
                    right: '0px'
                }, 1450,function () {
                    $('.phoneMain').find('.name').fadeIn(500);
                });
                $('.phoneMain>.left').find('li:eq(0)').animate({
                    opacity:'1',
                    left: '410px'
                }, 750);
                $('.phoneMain>.left').find('li:eq(1)').animate({
                    opacity:'1',
                    left: '208px'
                }, 1200);
                $('.phoneMain>.left').find('li:eq(2)').animate({
                    opacity:'1',
                    left: '0px'
                }, 1450);


            }
        });
        $viwepager.init({
            pause:5000
        });
        $('.menuMain>a').mouseenter(function(){
            $(this).find('.menu').stop();
            $(this).find('.menu').animate({marginTop:'-20px'})
        });
        $('.menuMain>a').mouseleave(function(){
            $(this).find('.menu').stop();
            $(this).find('.menu').animate({marginTop:'0px'})
        });


        //以旧换新动画
        var _oldSpeed=300//速度
        $('.shadebtn').bind('mouseenter mouseleave',function(e) {
            var w = $(this).width();
            var h = $(this).height();
            var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
            var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
            var _shade=$(this).find('.shade');
            var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4; //direction的值为“0,1,2,3”分别对应着“上，右，下，左”
            switch (direction)
            {
                case 0:
                    if(e.type == 'mouseenter'){
                        //进入
                        _shade.css({
                            'top':'-'+h+'px',
                            'left':'0'
                        });
                        _shade.show();
                        _shade.animate({
                            top:0
                        },_oldSpeed)
                    }else{
                        //离开
                        _shade.animate({
                            top:'-'+h+'px'
                        },_oldSpeed)
                    }
                    break;
                case 1:
                    if(e.type == 'mouseenter'){
                        //进入
                        _shade.css({
                            'left':w+'px',
                            'top':'0'
                        });
                        _shade.show();
                        _shade.animate({
                            left:0
                        },_oldSpeed)
                    }else{
                        //离开
                        _shade.animate({
                            left:w+'px'
                        },_oldSpeed)
                    }
                    break;
                case 2:
                    if(e.type == 'mouseenter'){
                        //进入
                        _shade.css({
                            'top':h+'px',
                            'left':'0'
                        });
                        _shade.show();
                        _shade.animate({
                            top:0
                        },_oldSpeed)
                    }else{
                        //离开
                        _shade.animate({
                            top:h+'px'
                        },_oldSpeed)
                    }
                    break;
                case 3:
                    if(e.type == 'mouseenter'){
                        //进入
                        _shade.css({
                            'left':'-'+w+'px',
                            'top':'0'
                        });
                        _shade.show();
                        _shade.animate({
                            left:0
                        },_oldSpeed)
                    }else{
                        //离开
                        _shade.animate({
                            left:'-'+w+'px'
                        },_oldSpeed)
                    }
                    break;
            }
        });



    });
});