/**
 * 图片轮播 模块
 * author : Tom
 * time : 2015-7-14
 */
define(['jquery'],function($){
    $(function() {
        $viwepager={
            conf:{
                leftmod:$('#J_left'),//左翻滚按钮MOD
                rightmod:$('#J_right'),//右翻滚按钮MOD
                stage:$('#J_stage'),//主舞台MOD
                actor:$('.actor'),//需要轮播的图片MOD
                speed:1000,//滚动速度
                pause:2000,//逗留时间
                signUlMod:$('#J_sign'),//标记ul里<ul id=""> MOD
                signClass:'selected',//按钮被选中时加载的样式
                width:'1920',//舞台宽度
                height:'360',//舞台高度
                callback:function(){}//每次切换返回值
            },
            signChange:function(_n){
                var _conf = this.conf;
                 _conf.signUlMod.find('li').removeClass(_conf.signClass);
                 _conf.signUlMod.find('li').each(function(_e){
                 if(_e==(_n-1)){$(this).addClass(_conf.signClass);}
                 });
            },
            init:function(_opt){
                var _mine=this;
                var _conf = _mine.conf;
                if(_opt) {//初始化传值
                    $.extend(_conf, _opt);
                }
                _conf.actor.width(_conf.width);
                _conf.actor.find('img').width(_conf.width);
                _conf.actor.height(_conf.height);
                _conf.actor.find('img').height(_conf.height);
                _conf.actor.first().find('img').attr("src",_conf.actor.first().find('img').data('url'));//加载第一个图
                var _actorWidth=_conf.actor.width();
                var _actorNum;
                var _time;
                _conf.actor.each(function(e){
                    _actorNum=e;
                });
                _actorNum++;//获取有几个轮播图片
                _conf.stage.width((_actorNum+2)*_actorWidth+100);//创建舞台宽度
                //舞台内图像初始化
                _conf.actor.last().clone(true).prependTo(_conf.stage);//最后一个元素放到第一个前面
                _conf.actor.first().clone(true).appendTo(_conf.stage);//第一个元素放到最后一个
                _conf.stage.css('margin-left','-'+_actorWidth+'px')
                var _n=1;
                var _lock=false;//按钮锁
                var _lockup=false;//时间锁
                $_timelyFun=function(){
                    _lock=true;
                    if(!_lockup){_n++};//判断是否有时间锁，不自加
                    _mine.signChange(_n);//变换按钮
                    _conf.actor.eq(_n-1).find('img').attr("src",_conf.actor.eq(_n-1).find('img').data('url'));//加载当前图
                    _conf.stage.animate({marginLeft:'-'+_n*_actorWidth+'px'},_conf.speed,function(){
                        _lock=false;
                        _lockup=false;//关闭时间锁
                        if(_n>_actorNum){//判断是否到了+1元素
                            _conf.stage.css('margin-left','-'+_actorWidth+'px');
                            _conf.signUlMod.find('li').first().addClass(_conf.signClass);
                            _n=1;
                        }
                        if(_n==0){//判断是否到了-1元素
                            _conf.stage.css('margin-left','-'+_actorWidth*+_actorNum+'px');
                            _conf.signUlMod.find('li').last().addClass(_conf.signClass);
                            _n=_actorNum;
                        }
                    });
                    _conf.callback();
                }

                //上一页
                _conf.leftmod.click(function(){
                    if(_lock){return};//判断按钮锁
                    _n--;
                    _mine.signChange(_n);//变换按钮
                    _lockup=true;//打开时间锁
                    $_timelyFun(false);//动画不自加
                    clearInterval(_time);//关闭历史动画进程
                    _time=setInterval('$_timelyFun()',_conf.pause);//创建新动画进程
                });

                //下一页
                _conf.rightmod.click(function(){
                    if(_lock){return};//判断按钮锁
                    _n++;
                    _mine.signChange(_n);//变换按钮
                    _lockup=true;//打开时间锁
                    $_timelyFun();//动画不自加
                    clearInterval(_time);//关闭历史动画进程
                    _time=setInterval('$_timelyFun()',_conf.pause);//创建新动画进程
                });
                _time=setInterval("$_timelyFun()",_conf.pause);//创建新动画进程

                //标记
                _conf.signUlMod.find('li').mouseenter(function(){
                    if(!_lock){
                        _n=$(this).data('num');
                        _mine.signChange(_n);//变换按钮
                        _conf.actor.eq(_n-1).find('img').attr("src",_conf.actor.eq(_n-1).find('img').data('url'));//加载当前图
                        _conf.stage.animate({marginLeft:'-'+_n*_actorWidth+'px'});
                        clearInterval(_time);//关闭历史动画进程
                        _time=setInterval('$_timelyFun()',_conf.pause);//创建新动画进程
                    }
                });

            }
        }
    });
});