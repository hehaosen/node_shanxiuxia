require.config({
    baseUrl:'http://localhost/js',
    paths: {
        //π´”√
        jquery: 'jquery.min',
        pop:'module/pop',
        checkout:'module/checkout',
        area:'module/area',
        hint:'module/hint',
        countdown:'module/countdown',
        viwepager:'module/viwepager',
        public:'module/public',
        selectui:'module/selectui',
        radioui:'module/radioui',
        cinema:'module/cinema',
        cookie:'module/cookie',
        scrollLoading:'module/scrollLoading',
        fly:'module/fly',
        flyIE:'module/flyIE',
        // ”Õº
        weadocindex:'page/index',

    },
    shim:{
        'scrollLoading': ['jquery'],
        'fly': ['jquery','flyIE']
    }

});
require(['public']);
switch (weadoc.banner)
{
    case 'index':
        require(['weadocindex']);
        break;
}
