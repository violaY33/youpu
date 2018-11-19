module.exports = function (str) {
    const reg1 = /^https:\/\/v.qq.com\/iframe\/player.html/
    const reg2 = /^https:\/\/v.qq.com\/txp\/iframe\/player.html/
    return reg1.test(str) || reg2.test(str)
}