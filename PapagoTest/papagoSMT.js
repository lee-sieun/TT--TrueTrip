var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

var client_id = '3hz9dJ1yFVeXaQbtXqbB';//개발자센터에서 발급받은 Client ID
var client_secret = 'fWiCb8lpZH'; //개발자센터에서 발급받은 Client Secret
var api_url = 'https://openapi.naver.com/v1/language/translate';
var query = "동대문. 숭례문. 광화문.";           // 번역할 문장

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function (req, res) {
    var options = {
        url: api_url,
        form: {'source':'ko', 'target':'en', 'text':query}, // 한국어에서 영어로 query 번역 요청
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };

    request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {         //에러없을 때 출력
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});    //writehead: response의 타입결정.
            var objBody = JSON.parse(response.body);    // 번역 성공시에 문자열을 json 파싱.
            console.log(objBody.message.result.translatedText); // response.body에서 message 카테고리의 result의 transT
            res.write(objBody.message.result.translatedText);
            res.end();
        } else {    //에러시 출력
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});
app.listen(3000, function () {
    console.log('http://127.0.0.1:3000/translate app listening on port 3000!');
});