requirejs.config({

    enforceDefine: true,

    baseUrl: 'js',
    deps: ['app'],
    urlArgs: ('v=' + Date.now())

})
