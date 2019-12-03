const autoprefixer = require('autoprefixer');// css前缀
const glob = require('glob');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');// 目录清理
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');// 错误提示
const HtmlWebpackPlugin = require('html-webpack-plugin');// 创建html 并且引用bundle.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 将CSS提取为独立的文件

const projectRoot = process.cwd();// 当前Node.js进程执行时的工作目录

// 多页面打包
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));// 入口文件为当前目录之上的src下文件夹内的indexjs

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];
            entry[pageName] = entryFile;
            return htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    inlineSource: '.css$',
                    template: path.join(projectRoot, `./src/${pageName}/index.html`),
                    filename: `${pageName}.html`, // 输出的html的文件名称
                    chunks: ['vendors', pageName], // chunks主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
                    inject: true, // 打包出的js,css自动注入到html中
                    minify: { // 压缩html
                        html5: true,
                        collapseWhitespace: true, // 删除空白符与换行符
                        preserveLineBreaks: false, // 当标记之间的空格包含换行符时，始终折叠为1换行符（从不完全删除它）
                        minifyCSS: true, // 压缩css
                        minifyJS: true, // 压缩js
                        removeComments: false // 移除注释
                    }
                }),
            );
        });
    return {
        entry,
        htmlWebpackPlugins
    };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry,
    output: {
        path: path.join(projectRoot, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => {
                                autoprefixer({
                                    overrideBrowserslist: [
                                        'Android 4.1',
                                        'iOS 7.1',
                                        'Chrome > 31',
                                        'ff > 31',
                                        'ie >= 8'
                                    ]
                                });
                            }
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 100,
                            remPrecision: 8,
                        },
                    },
                ],
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
                        },
                    },
                ],
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        function errorPlugin() {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
                    process.exit(1);
                }
            });
        },
    ].concat(htmlWebpackPlugins),
    stats: 'errors-only',
};
