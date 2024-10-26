var mongoose=require("mongoose")
var Schema=mongoose.Schema

var ReviewSchema= new Schema({

    author: String,
    score: String,
    comment: String,
    originRequest: String,
    state: Boolean,
    date:{type: Date, default:Date.now()}
});

var PlannerSchema= new Schema({
    id: {type:String, required:true, unique: true},
    pw: {type:String, required:true},
    name: String,
    email: String,
    category1: String,
    category2: String,
    category3: String,
    //나중에 추가한 부분
    location: String,
    path:String,//프로필 사진 경로
    introduce: String,
    userType: String,       // 가입 시 planner로 들어감.
    orgFileName: String,    //프로필 사진 orgname
    saveFileName:String,    //프로필 사진 savename
    reviews:[ReviewSchema],
    point: {type:Number,default:1000}
});
//
// {"id":id, "pw":pw, "name":paramName,"email":paramEmail,
//     "category1":paramCategory1,"category2": paramCategory2,"category3":paramCategory3, "location": location, "path": profileImg}
module.exports= mongoose.model('planners', PlannerSchema, 'planners');
