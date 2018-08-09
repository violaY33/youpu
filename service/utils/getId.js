module.exports = function (str) {
  const reg = /^http:\/\/www.tanukulele.com\/(\d*)\.html$/
  return reg.exec(str)[1]
}