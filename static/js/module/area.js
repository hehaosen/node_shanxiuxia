/**
 * 选择城市模块
 * author : Tom
 * time : 2015-7-10
 */
define(['jquery','areadata'],function($){
    $(function(){
        $area={
            conf:{
                province:$('#J_province'),//省份DOM
                city:$('#J_city'),//城市DOM
                district:$('#J_district'),//区DOM
                defaultAddress:['浙江省','杭州市','西湖区']
            },
            init:function(_opt){
                var _conf = this.conf;
                if(_opt) {//初始化传值
                    $.extend(_conf, _opt);
                }
                optionInsert(_conf.province,_areadata,0);
                optionInsert(_conf.city,_areadata[_conf.province.val()],0);
                optionInsert( _conf.district,_areadata[_conf.province.val()][_conf.city.val()],1);
                //来路判断默认省份
                if(weadoc.area!=''){
                    $.each(_areadata,function(_n){
                        if(weadoc.area.indexOf(_n)>=0)
                        {
                            _conf.defaultAddress[0]=_n;
                        }
                    });

                    $.each(_areadata[_conf.defaultAddress[0]],function(_n){
                        if(weadoc.area.indexOf(_n)>=0)
                        {
                            _conf.defaultAddress[1]=_n;
                        }
                    });
                    _conf.defaultAddress[2]=_areadata[_conf.defaultAddress[0]][_conf.defaultAddress[1]][0];
                }
                if(_conf.defaultAddress.length>0){
                    //省份默认
                    _conf.province.prop('value',_conf.defaultAddress[0]);

                    optionInsert(_conf.city,_areadata[_conf.province.val()],0);
                    //城市默认
                    _conf.city.prop('value',_conf.defaultAddress[1]);

                    optionInsert( _conf.district,_areadata[_conf.province.val()][_conf.city.val()],1);
                    //地区默认
                    _conf.district.prop('value',_conf.defaultAddress[2]);
                }

                //当省份被选择时
                _conf.province.change(function(){
                    optionInsert(_conf.city,_areadata[$(this).val()],0);

                    _conf.city.trigger('change');//触发城市选择，显示地区
                });

                //当城市被选择时
                _conf.city.change(function(){
                    optionInsert( _conf.district,_areadata[_conf.province.val()][$(this).val()],1);
                });

                function optionInsert(_obj,_data,_type){
                    _html = '';
                    if(_type == 0){
                        $.each(_data,function(_value){
                            _html+='<option value="'+_value+'">'+_value+'</option>';
                        });
                    }else if(_type == 1){
                        $.each(_data,function(_n,_value){
                            _html+='<option value="'+_value+'">'+_value+'</option>';
                        });
                    }
                    _obj.html(_html);
                }
            }
        }

    });
});