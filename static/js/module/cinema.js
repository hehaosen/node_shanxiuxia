/**
 * 序列图播放播放组件
 * author : Tom
 * time : 2015-8-3
 */
define(['jquery'],function ($) {
    $(function () {
        $cinema= {
            conf: {
                mod:$('#J_cinema'),//需要播放的对象
                speed:1000,//播放的速度
                direction:'->',//播放方向 <- 左 -> 有 ^上 v下
                distance:50,//每个胶片位移的距离
                x:0,//定位画布x
                y:0,//定位画布y
                width:40,//画面挪动width值
                height:40,//画面挪动height值
                step:8,//动画帧数
                time:0//循环次数 0表示无限循环
            },
            init:function(_opt){
                var _conf = this.conf;
                if(_opt) {//初始化传值
                    $.extend(_conf, _opt);
                }
                var _num=0;
                var _fatherNum=0;
                _conf.mod.css('background-position',_conf.x+'px '+_conf.y+'px');
                _$cartoon=function(){
                    _num++;
                    _fatherNum++;
                    if(_fatherNum==_conf.time*_conf.step-1){
                        clearInterval(_timer);
                    }
                    if(_num==_conf.step){
                        _num=1;
                    }
                    switch (_conf.direction) {
                        case '->':
                            _conf.mod.css({
                                'background-position':(_conf.x-_conf.width*_num+'px ')+(_conf.y+'px')
                            });
                            break;
                        case '<-':
                            _conf.mod.css({
                                'background-position': (_conf.x+_conf.width*_num+'px ')+(_conf.y+'px')
                            });
                            break;
                        case '^':
                            _conf.mod.css({
                                'background-position': (_conf.x+'px ')+(_conf.y+_conf.height*_num+'px')
                            });
                            break;
                        case 'v':
                            _conf.mod.css('background-position',(_conf.x+'px ')+(_conf.y-_conf.height*_num+'px'));
                            break;
                    }

                }

                var _timer=setInterval('_$cartoon()',_conf.speed);
            }
        }

        });
});