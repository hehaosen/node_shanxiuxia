/**
 * checkbox ui组件
 * author : bfj
 * time : 2015-7-30
 */
define(['jquery'],function ($) {
    $(function(){
        $selectui = {
            conf:{

            },
            init:function(_opt){
                var _conf = this.conf;
                if(_opt) {//初始化传值
                    $.extend(_conf, _opt);
                }

                _$create(false);//select组件初始化

                /*创建select*/
                function _$create(_e){
                    $('select[data-ui-select]').each(function(_i){
                        var _this = $(this);
                        var _id = _i;//select的id
                        _this.attr('data-id',_id);
                        var _classStyle = this.className?this.className:'';
                        _this.hide();
                        if(_e) {
                            $('button[data-id=' + _id + ']').parent().remove();
                        }
                        var _optionsOrigin = this.options;//select的option
                        var _optionSelected = _this.val();//已选择的option值
                        var _optionSelectedText = _this.find("option:selected").text();
                        var _options='';

                        var _selectWrap = $('<div class="uiSelect"></div>');
                        var _selectButton = '';
                        if(_optionSelected){//select不为空的情况
                            _selectButton = createButton(_id,_optionSelected,_optionSelectedText,_classStyle,true);//创建select button
                            _selectWrap.append(_selectButton);

                            var _optionsWrap = $('<div class="uiSelectContent" data-id="'+_id +'"></div>');//option的wrap元素

                            //生成options
                            $.each(_optionsOrigin,function(){
                                _options += createOption(this.index,this.value,this.text,_optionSelected == this.value);//_optionSelected == this.value判断是否是已选项
                            });

                            var _optionsList = $('<ul class="uiSelectList"></ul>').append($(_options));//options放入ul中
                            _optionsWrap.append(_optionsList);

                            _selectWrap.append(_optionsWrap);//放入最外部的wrap中
                        }else{
                            _selectButton = createButton(_id,_optionSelected,_optionSelectedText,_classStyle,false);
                            _selectWrap.append(_selectButton);

                        }

                        _this.after(_selectWrap);//写入html中

                    });

                }

                /*创建select button*/
                function createButton(_id,_value,_text,_class,_hasValue){
                    var _val = _hasValue?_value:'';
                   var _txt = _text?_text:'';
                    return $('<button type="button" class="uiSelectButton '+_class+'" data-id="'+ _id + '" data-value"'+ _val +'"><span class="uiSelectStatus">'+ _txt +'</span><i class="icon uiSelectIcon"></i></button>');
                }

                /*创建options*/
                function createOption(_index,_value,_text,_isSelected){
                    return '<li data-index="'+ _index +'" data-value="'+ _value +'" '+ (_isSelected?'class="selected"':'') +'><span class="uiSelectText">'+ _text +'</span></li>';
                }

                /*显示隐藏*/
                $(document).on('click','.uiSelectButton',function(){
                    var _this = $(this);
                    var _uiSelectContent = _this.next('.uiSelectContent');
                    if(_uiSelectContent.is(':hidden')){
                        _uiSelectContent.show();
                        /*上下显示，高度根据window高度scroll显示*/
                        var _optionsHeight = _uiSelectContent.height();//options的高度
                        var _scrollTop = $(window).scrollTop();
                        var _bottomHeight = $(window).height()-_uiSelectContent.offset().top+_scrollTop;//计算底部显示高度
                        var _topHeight = _this.offset().top-_scrollTop;//计算顶部显示高度

                        var _height = 0;


                        if(_optionsHeight>_bottomHeight && _optionsHeight>_topHeight){//判断options的高度是否比可显示高度高
                            if(_bottomHeight>_topHeight){//判断顶部空间多还是底部空间多
                                _height = _bottomHeight;
                                _uiSelectContent.css('top','100%');
                            }else{
                                _height = _topHeight-100;
                                _uiSelectContent.css('top',-_height);
                            }
                            _uiSelectContent.find('.uiSelectList').height(_height);
                        }


                    }else{
                        _uiSelectContent.hide();
                    }
                });


                /*选择*/
                $(document).on('click','.uiSelectList li',function(){
                    var _this = $(this);
                    var _value = _this.data('value');//当前options的value
                    var _text = _this.find('.uiSelectText').text();//当前options的text

                    var _selectContent = _this.parents('.uiSelectContent');
                    var _selectId = _this.parents('.uiSelectContent').data('id');//对应select的id
                    var _selectButton = _selectContent.prev('.uiSelectButton');//对应button
                    var _originSelect = $('select[data-id="'+ _selectId +'"]');
                    //添加选择的样式
                    _this.addClass('selected')
                        .siblings('li').removeClass('selected');

                    //隐藏options
                    _selectContent.hide();

                    //选择后改变button值、原始select值
                    _selectButton.data('value',_value)
                                 .children('.uiSelectStatus').text(_text);
                    _originSelect.val(_value)
                                 .trigger('change');//触发原始select的change事件
                    _$create(true);
                });

                //点击其他区域隐藏
                $('body').on('click',function(_e){
                    var evtClass = _e.target.className;
                    if($('.uiSelectContent').is(':visible') && evtClass != 'uiSelectStatus' && evtClass !='uiSelectStatus' && evtClass !='uiSelectText' && evtClass!='uiSelect' && evtClass!='uiSelectButton' &&evtClass!=''){
                        $('.uiSelectContent:visible').hide();
                    }
                })
            }
        }
    })
});