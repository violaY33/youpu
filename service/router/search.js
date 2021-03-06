const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')
const getId = require('./../utils/getId')
const getCate = require('./../utils/getCate')

router.post('/search', (req, res) => {
  const page = req.body.currentPage
  const kw = req.body.kw
  const url = encodeURI(`http://www.tanukulele.com/page/${page}?s=${kw}`)

  axios.get(url).then(response => {
    const html = response.data
    const $ = cheerio.load(html)

    const result = []

    $('#post_container .post').each((index, item) => {
      const itemInfo = {
        title: $(item).find('.article h2 a').text(),
        link: $(item).find('.article h2 a').attr('href'),
        id: getId($(item).find('.article h2 a').attr('href')),
        thumbnail: $(item).find('.thumbnail img').attr('src'),
        category: $(item).find('.info .info_category a').attr('href'),
        cate: getCate($(item).find('.info .info_category a').attr('href')),
        date: $(item).find('.info .info_date').text(),
        views: $(item).find('.info .info_views').text(),
        source: $(item).find('.info .info_category a').text(),
      }

      result.push(itemInfo)

    })

    res.send(result)


  }).catch(err => {
    console.log(err)
    res.send([])
  })


})

module.exports = router
