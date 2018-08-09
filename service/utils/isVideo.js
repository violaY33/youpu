module.exports = function (str) {
    const reg = /^https:\/\/v.qq.com\/iframe\/player.html/
    return reg.test(str)
}