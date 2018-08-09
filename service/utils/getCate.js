module.exports = function (str) {
  const reg1 = /\/category\/qupu\/(.*)/
  const reg2 = /\/category\/(.*)/

  reg1 ? reg1[1] : reg2 

  return reg1.exec(str) ? reg1.exec(str)[1] : reg2.exec(str)[1]
}