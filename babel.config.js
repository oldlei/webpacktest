module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                //设置polyfill 默认false，
                //usage:  按需
                //entry: 根据浏览器决定填充什么，源码js中需要引入corejs和runtime
                useBuiltIns: 'usage',
                //corejs 版本
                corejs: 3
            }
        ]
    ]
}