const express = require('express');
const router = express.Router();
const fs = require('fs');

const mongoose = require('mongoose');


// Main Page
//req=클라이언트에서 전달된 데이터와 정보
//res 클라이언트에게 응답을 위한 정보
router.get('/', (req, res) => {
    res.render('../views/index.ejs');
});
router.get('/main', (req, res) => {
    res.render('../views/index.ejs');
});

router.get('/lists', (req,res)=>{
    var theme= req.body.theme;
    var dbdata=mongoose.model('PostData');
    dbdata.find({}, function(err, data){
        if(err) res.send(err);
        else {
            res.render('../views/listings.ejs',{'data': data})
        }
    }).select('-_id')
    // res.render('../views/listings.ejs')

})
router.get('/showimg', (req, res)=>{
    res.render('../views/showImg.ejs')
})

router.get('/guide', (req, res)=>{
    res.render('../views/guidepage_traveler')
})

router.get('/upload', (req, res)=>{
    res.render('../views/image_upload.ejs');
})


router.get('/popup', (req,res)=>{
    res.render('../views/popup')
})

router.get('/testguide', (req, res)=>{
    res.render('../views/guidepage_test.ejs')
})

module.exports = router;
