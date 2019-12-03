const path = require('path')

process.chdir(path.join(__dirname, 'smoke/template')) //变更Node.js进程的当前工作目录

describe('测试用例', () => {
    require('./unit/webpack-base-test')
})