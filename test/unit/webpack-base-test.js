const assert = require('assert')

describe('webpack.base.js 测试用例', () => {
    const baseConfig = require('../../lib/webpack.base')
    it('entry', () => {
        console.log(baseConfig)
    })
})


// assert.equal(baseConfig.entry.index,'/Users/szc/project/Interview/builder-webpack/test/smoke/template/src/index/index.js')
// assert.equal(baseConfig.entry.search,'/Users/szc/project/Interview/builder-webpack/test/smoke/template/src/search/index.js')