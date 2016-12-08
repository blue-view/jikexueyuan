// 设置图片合并的最小间隔
fis.config.set('settings.spriter.csssprites.margin', 20);

// 取消下面的注释开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
fis.config.set('modules.postpackager', 'simple');

// 取消下面的注释设置打包规则
fis.config.set('pack', {
    '/pkg/lib.js': [
        'js/jquery.js',
        'js/html5.js',
        'js/baidu.js',
    ],
    // 取消下面的注释设置CSS打包规则，CSS打包的同时会进行图片合并
    '/pkg/aio.css': [
        'css/reset.css',
        'css/baidu.css',
        'css/myskin.css'
    ]
});
/*进行html文件压缩 */
fis.match('*.html',{
    optimizer:fis.plugin('html-minifier')
});
// 清除其他配置，只保留如下配置
fis.match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});
// 取消下面的注释可以开启simple对零散资源的自动合并
fis.config.set('settings.postpackager.simple.autoCombine', true);