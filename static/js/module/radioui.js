/**
 * checkbox ui组件
 * author : bfj
 * time : 2015-8-3
 */
define(['jquery'],function ($) {
    $(function(){
       $radioui = {
           conf:{
               radioName:'',
               callback:function(){

               }
           },
           init:function(_opt){
               var _conf = this.conf;
               if(_opt){
                   $.extend(_conf, _opt);
               }

               //初始化组件
               $(':radio[name="'+ _conf.radioName +'"][data-ui-radio]').each(function(){
                   var _this = $(this);
                   var _label = _this.parent('label');//父元素label

                   /*获取radio的属性*/
                   var _checkState = this.checked;
                   var _disableState = this.disabled;
                   var _name = this.name;

                   var _iconState= 'radioUnchecked';//icon状态

                   _this.addClass('uiRadioOgn');
                   _label.addClass('uiRadio').attr('data-name',_name);

                   /*根据disabled checked 属性设置icon的class*/
                   if(_disableState){
                       _iconState = _checkState?'radioDisabledChecked':'radioDisabled';
                       _label.addClass('uiDisable');

                       //有其他表单时，同时设置disabled
                       _label.find('input,textarea,select,button').not(".uiRadioOgn").prop({'disabled':true});

                   }else{
                       _iconState = _checkState?'radioChecked':'radioUnchecked';
                   }
                   var _icon = $('<i class="icon uiRadioIcons '+ _iconState +'"></i>');

                   _this.after(_icon);//icon写入文档中
               });

               //点击事件
               $('.uiRadio[data-name="'+ _conf.radioName +'"]').on('click',function(_e){
                   var _this = $(this);
                   var _radioOrigin = _this.find('.uiRadioOgn');
                   var _radioIconOrigin = _this.find('.uiRadioIcons');

                   //阻止子元素执行
                   _radioOrigin.on('click',function(_e){
                       _e.stopPropagation();
                   });
                   //_radioIconOrigin.on('click',function(_e){
                   //    _e.stopPropagation();
                   //});


                   /*获取radio的属性*/
                   var _name = _radioOrigin.prop('name');
                   var _disableState = _radioOrigin.prop('disabled');

                   if(!_disableState){//忽略disabled元素和自身
                       var _uiRadioSibling = $('.uiRadio[data-name="'+_name+'"]').not(this);//获取相同name的uiradio
                       var _radioArr = _uiRadioSibling.find('.uiRadioOgn[name="'+ _name +'"]:checked');//相同checked的原始radio
                       var _radioIconSibling = _radioArr.next('.uiRadioIcons');//相同name，checked的icon

                       _radioArr.prop('checked',false);//设置相邻元素的checked
                       _radioIconSibling.removeClass('radioChecked').addClass('radioUnchecked');////设置相邻元素的checked样式

                       _radioOrigin.prop('checked',true);//设置当前元素的checked
                       _radioIconOrigin.removeClass('radioUnchecked').addClass('radioChecked');////设置当前元素的checked样式

                   }

                   _conf.callback();
               });


           }
       }
    });
});