var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");
var Request=mongoose.model('requests');
var Schedule=mongoose.model('schedules');

let req_id;
let schedule_data;

//reservation_planner.ejs 에서 요청 수락하면 makePlan.ejs로 화면 이동
router.post('/sendReqID', function(req,res){

    req_id=req.body.req_id;
    console.log("선택reqid"+req_id);
    res.render('../views/makePlan.ejs');
});

//reservation_planner.ejs 에서 요청 수락하면 실행됨
router.get('/sendReqID', function(req,res){
    Request.find({'_id':req_id},function(err,data){
        if(err) throw err;
        console.log(data);
        res.render('../views/makePlan.ejs',{data:data});
    })

});

//makePlan.ejs에서 계획 제출 누르면 실행됨
router.post('/addPlan', function(req,res){

    console.log("/addPlan 호출됨");
    var values=req.body.plan_array;
    var origin_request=req.body.origin_request;

    console.log(values[0]);
    console.log(typeof(values[0]));
    console.log(values.length);
    console.log(origin_request);

    Request.find({'_id':origin_request},function(err,data) {
        console.log(data);
        var traveler=data[0].author;
        var planner=data[0].planner;
        // console.log("찾은데이터"+data);
        // res.send({'post_title':title});
        var state=data[0].confirm;

        //해당 request confirm true로 바꿈
        console.log("상태"+state);
        Request.findOneAndUpdate({_id:origin_request},{$set:{"confirm":true}},function (err,data) {
                if (err) throw err;
        });

        //새로운 schedule db 생성됨
        var schedule= new Schedule({
            "planner":planner,"traveler":traveler,"originRequest":origin_request,"plan":values
        });
        schedule.save(function(err){
            if(err) throw err;
        })
    });

});

//reservation_traveler.ejs 에서 계획확인 누르면 request _id 넘김 해당 schedule 찾아서  receivedPlan.ejs 로 넘겨줌
router.post('/viewPlan', function(req,res){
    console.log("/viewPlan 호출됨");
    var reqid=req.body.reqid;
    console.log(reqid);
    Schedule.find({'originRequest':reqid},function(err,data){
        if(err) throw err;
        console.log(data);
        schedule_data=data;
        res.render('../views/receivedPlan.ejs',{data:data});

    })
});

// reservation_traveler.ejs 에서 계획확인 눌렀을때 페이지 변경
router.get('/viewPlan', function(req,res){
    console.log("/receivedPlan 호출됨");
    console.log(schedule_data);
    res.render('../views/receivedPlan.ejs',{data:schedule_data});

});


module.exports = router;