#说明
>webpack版本:^4.34.0
##基础配置：(webpack.base.js)
        # 资源解析：解析ES6,React,css,less,图片,字体
        # 样式增强：前缀补齐，px转rem
        # 目录清理
        # 多页面打包
        # 命令行信息显示优化
        # 错误捕获和处理
        # css提取成一个单独文件

##开发配置：(webpack.dev.js)
        # 代码热更新(css,js热更新)
        # sourcemap
        
##生产配置：(webpack.prod.js)
        # 代码压缩
        # 文件指纹
        # Tree Shaking(删除无用的方法变量)     mode:production自动开启
        # Scope Hoisting(匿名闭包函数)        mode:production自动开启
        # 速度优化
        # 体积优化
        
##SSR配置：(webpack.ssr.js)
        # output的libraryTarget设置
        # css解析ignore



























