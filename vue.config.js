module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  // 对app的大小就行压缩，在每个显示器上显示效果不同
  css: {
    loaderOptions: {
      postcss: {
          plugins: [
            require("postcss-px-to-viewport")({
              viewportWidth: 375,   //视窗的宽度，对应的是我们设计稿的宽度
              viewportHeight: 667,  //视窗的高度，对应的是我们设计稿的高度
              unitPrecision: 5,     //指定 ‘px’,转换为视窗单位的小数位数
              viewportUnit: 'vw',   //指定需要转换的视窗单位，建议使用vw
              selectorBlackList: ['ignore','tab-bar','tab-bar-item','cart-botton-bar'], //指定不需要转换的类，
              minPixelValue:1, //小于或等于'1px'不转换为视窗单位
              mediaQuery: false //允许在媒体查询中转换'px'
            })
          ]
      }
    }
}
} 