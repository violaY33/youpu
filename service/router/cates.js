const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')
const getCates = require('./../utils/getCate')


router.get('/cates', (req, res) => {
  let url = 'http://www.tanukulele.com/10532-2'

  axios.get(url).then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const result = []
    const getPath = []

    $('#post_content div.wpb_wrapper ').each((index, item) => {
      const itemInfo = {
        title: $(item).find('strong').text(),
        pic: $(item).find('img').attr('src'),
        link: $(item).find('a').attr('href'),
      }
      if (itemInfo.title && itemInfo.pic && itemInfo.link) {
        result.push(itemInfo)
      }
    })


    result.map((item, index) => {
        getPath[index] = new Promise((resolve, reject) => {
            axios.get(item.link).then(res => {
                item.cate = getCates(res.request.path)
                resolve()
            }).catch(err => {
                reject()
            })
        })
    })

    Promise.all(getPath).then(values => {
            res.send(result)
    });





  }).catch(err => {
    console.log(err)
    res.send([])
  })


})

module.exports = router
