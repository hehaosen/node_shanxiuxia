/**
 * 公共调用类模块
 * author : Tom
 * time : 2015-7-23
 */
define(['jquery','pop','checkout'],function($){
    $(function() {


        var heaertime;
        $(window).scroll(function(){
            $('#J_headerFixed').stop();
            ($(window).scrollTop()>20) ? $('#J_headerFixed').show() : $('#J_headerFixed').hide();//导航顶部吸附

            ($(window).scrollTop()>50) ? $('.rightFix>.backTop').show() : $('.rightFix>.backTop').hide();//出现回到顶部图标
            $('#J_headerFixed').animate({
                opacity:'0.5'
            },100);
            clearInterval(heaertime);
            heaertime=setInterval('$heaerFix()',200);
        });
        $heaerFix=function(){
            $('#J_headerFixed').stop();
            $('#J_headerFixed').animate({
                opacity:'1'
            },100);
        }

       //游标浮动操作
        $('.rightFix>.grid').mouseenter(function(){
            $(this).removeClass('icon');
            $(this).text($(this).data('word'));
        });
        $('.rightFix>.grid').mouseleave(function(){
            $(this).addClass('icon');
            $(this).text('');
        });
        $('.rightFix>.backTop').click(function(){
            $('body,html').animate({scrollTop:0},1000);
        });
        $('.rightFix>.wechat').mouseenter(function(){
            $popUpBox.clear();
            var _html='';
            _html+='<img width="100%" src="'+weadoc.staticUrl+'/images/public/QRcode.png"/>';
            $popUpBox.init({
                id:'J_wechat',
                cartoon:'top',
                html:_html,
                pellucidity:'50',
                bgcolor:'#000',
                speed:'600',
                close:false
            });
        });
        $('.rightFix>.wechat').mouseleave(function(){

            $popUpBox.clear();
        });
        $('.rightFix>.service').click(function(){
            window.open('http://wpa.qq.com/msgrd?v=3&uin=810076099&site=qq&menu=yes');
        });
        var orderSearchTimer;
        $('.rightFix>.select,.Topselect').click(function(){
            $popUpBox.clear();
            clearInterval(orderSearchTimer);
            var _html='';
            _html+='<div class="orderSearch"><div class="phone"><input id="orderPhoneNumber" type="text" maxlength="11" placeholder="请输入下单手机号" /><span class="countdownWrap"><span class="hand" id="orderSendCode">发送验证码</span><span class="again">60秒</span></span></div><div class="code"><input type="text" maxlength="11" placeholder="请输入验证码" /><div class="hand orderSearchBtn" id="orderSearchBtn">查询/支付</div></div></div>';
            $popUpBox.init({
                id:'J_orderSearch',
                cartoon:'top',
                html:_html,
                close:true,
                speed:'600',
                callback:function(){
                    //发送验证码
                    $('#orderSendCode').on('click',function(){
                        clearInterval(orderSearchTimer);
                        if(!$checkout.phone.init({
                                dom:$('#orderPhoneNumber')
                            })){
                            return;
                        }
                        var minute=60;
                        $('#J_orderSearch .again').show().html('60秒');
                        $('#orderSendCode').hide();
                        orderSearchTimer=setInterval('timelyFun()',1000); //每隔时间执行
                        timelyFun=function(){
                            if(minute==0){
                                $('#J_orderSearch .again').hide().html('60秒');
                                $('#orderSendCode').show().html('重新发送');
                                clearInterval(orderSearchTimer);
                            }
                            $('#J_orderSearch .again').html(minute+'秒');
                            minute--;
                        };
                        $.ajax({
                            url: weadoc.path + "/Note/sendCode",
                            type: "post",
                            dataType: "json",
                            data: {phoneNumber:$('#orderPhoneNumber').val()},

                            success: function(data){
                                if(data.status!=1){
                                    $hint.init({
                                        dom:$('#orderPhoneNumber'),
                                        direction:'top',
                                        text:data.msg,
                                        width:'150',
                                        bgcolor:'#f2f2f2',
                                        borcolor:'#ff5555',
                                        color:'#ff5555'
                                    });
                                }
                            }
                        });
                    });
                    //验证跳转
                    $('#orderSearchBtn').on('click',function(){
                        var _this = $(this);
                        if(_this.hasClass('disabledBtn')){
                            return;
                        }

                        _this.addClass('disabledBtn');
                        $.ajax({
                            url: weadoc.path + "/Note/verifyCode",
                            type: "post",
                            dataType: "json",
                            data:{phoneNumber:$('#orderPhoneNumber').val(),code:$('.orderSearch>.code>input').val()},
                            success: function(data){
                                _this.removeClass('disabledBtn');
                                if(data.status==0)
                                {
                                    $hint.init({
                                        dom:$('.orderSearch>.code>input'),
                                        zindex:1500,
                                        direction:'top',
                                        text:'验证码错误',
                                        width:'150',
                                        bgcolor:'#fbfbfb',
                                        borcolor:'#ff5555',
                                        color:'#ff5555'
                                    });
                                }else{
                                    location.href="/home/Order";
                                }
                            }
                        });
                    });

                    //回车提交
                    $('.orderSearch>.code>input').on('keydown',function(e){
                        if(e.keyCode == 13){
                            $('#orderSearchBtn').trigger('click');
                        }
                    });
                }
            })
        });
    });
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?c46331571d3f3b0c1780cd2eec7c7a41";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
});