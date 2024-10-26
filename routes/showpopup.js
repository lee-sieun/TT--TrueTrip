const express = require('express')
const showpopupRouter = express.Router()
const multer = require('multer')
const DBData = require('../models/DBData');
var mongoose = require('mongoose')
const ejs = require('ejs');
const fs = require('fs');

//전역변수 통해 데이터 공유
let passing_content;

//popup 페이지 초기화


showpopupRouter.get('/popup', function (req, res, next) {
    console.log('/popup 호출됨')
    res.render('popup',
        {
            'PostID': passing_content.author,
            'PostName' : passing_content.name,
            'PostTitle': passing_content.title,
            'PostCategory': passing_content.theme,
            'PostLocation': passing_content.location,
            'PostContents': passing_content.text,
            'PostPath': passing_content.path
        }
    );
    ;
})




//client 가 보낸 정보를 통해 DB에서 게시글 정보 가져옴
showpopupRouter.post('/showpopup', function (req, res, next) {

    //client가 보낸 게시글의 title과 작성한 사람의 ID가져옴
    var title = req.body.Title
    var userID = req.body.User_ID;
    var dbdata = mongoose.model('PostData');

    dbdata.find({'title': title, 'author': userID}, function (err, data) {
        if (err) res.send(err);
        else {
            passing_content = data[0]

            // 받은 db를 가져다가, 돌려줘야함. 근데, modal로? 여기가 문제임.
            res.send(
                {
                    'PostID': passing_content.author,
                    'PostTitle': passing_content.title,
                    'PostCategory': passing_content.theme,
                    'PostLocation': passing_content.location,
                    'PostContents': passing_content.text,
                    'PostPath': passing_content.path,
                    'PostName' : passing_content.name
                }
            );
            console.log('showpopup에서 res.send 완료. ');
        }
    })
})


module.exports = showpopupRouter;