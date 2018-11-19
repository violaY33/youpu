const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')
const isVideo = require('./../utils/isVideo')
const getCate = require('./../utils/getCate')

router.post('/details', (req, res) => {
    const postId = req.body.postId 
    const url = `http://www.tanukulele.com/${postId}.html`

    axios.get(url).then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        let title = ''
        let cate = ''
        let source = ''
        const videos = []
        const pics = []


        $('#post_content iframe').each((index, item) => {
            const iframeLink = $(item).attr('src')
            isVideo(iframeLink) ? videos.push(iframeLink) : ''
        })

        $('#post_content [data-lightbox] img').each((index, item) => {
            const pic = $(item).attr('src')
            pics.push(pic)
        })


        $('h1').each((index, item) => {
            title = $(item).text()
            
        })

        $('.article_info .info_category a').each((index, item) => {
            cate = getCate($(item).attr('href'))
            source = $(item).text()
            
        })


        res.send({
            title,
            videos,
            pics,
            id: postId,
            cate,
            source
        })


    }).catch(err => {
        console.log(err)
        res.send(err)
    })


})

module.exports = router