const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')
const getId = require('./../utils/getId')

router.post('/related', (req, res) => {

  const postId = req.body.postId
  const url = `http://www.tanukulele.com/${postId}.html`

  axios.get(url).then(response => {
    const html = response.data
    const $ = cheerio.load(html)

    const result = []

    $('.related .related_box').each((index, item) => {
      const itemInfo = {
        title: $(item).find('.r_title').text(),
        link: $(item).find('a').attr('href'),
        id: getId($(item).find('a').attr('href')),
        thumbnail: $(item).find('.r_pic img').attr('src'),
      }

      result.push(itemInfo)

    })

    res.send(result)


  }).catch(err => {
    console.log(err)
    res.send(err)
  })


})

module.exports = router