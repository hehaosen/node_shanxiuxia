/**
 * 倒计时 模块
 * author : Tom
 * time : 2015-7-14
 */
define(['jquery'],function($){
    $(function() {
        $countDown={
            conf:{
                expire:'2015-7-14 16:30:30',//到期时间，
                day:$('#J_day'),
                hour:$('#J_hour'),
                minute:$('#J_minute'),
                second:$('#J_second')
            },
            init:function(_opt) {
                var _conf = this.conf;
                if (_opt) {//初始化传值
                    $.extend(_conf, _opt);
                }
                var _hour,_minute,_day,_second,_date,_expire;
                _$timer=function(){
                    _date = new Date().getTime();
                    _expire=(new Date(_conf.expire)).getTime();
                    if((_expire-_date)<0){_expire=0;_date=0;}
                    _day=Math.floor((_expire-_date)/(1000*60*60*24));
                    _hour=Math.floor((_expire-_date)%(1000*60*60*24)/(1000*60*60));
                    _minute=Math.floor((_expire-_date)%(1000*60*60)/(1000*60));
                    _second=Math.floor((_expire-_date)%(1000*60)/(1000));
                    _conf.day.text(_day);
                    _conf.hour.text(_hour);
                    _conf.minute.text(_minute);
                    _conf.second.text(_second);
                }
                setInterval(_$timer,1000)
            }
        }
    });
});