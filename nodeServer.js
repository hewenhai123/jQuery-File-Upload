/**
 * Created by hai on 2018/2/4.
 */


var express = require("express");
var fs = require("fs");
var multer = require('multer');
var upload = multer({dest: 'uploads/'});


var successJSON = {
    "files": [
        {
            "name": "picture1.jpg",
            "size": 902604,
            "url": "http:\/\/example.org\/files\/picture1.jpg",
            "thumbnailUrl": "http:\/\/example.org\/files\/thumbnail\/picture1.jpg",
            "deleteUrl": "http:\/\/example.org\/files\/picture1.jpg",
            "deleteType": "DELETE"
        },
        {
            "name": "picture2.jpg",
            "size": 841946,
            "url": "http:\/\/example.org\/files\/picture2.jpg",
            "thumbnailUrl": "http:\/\/example.org\/files\/thumbnail\/picture2.jpg",
            "deleteUrl": "http:\/\/example.org\/files\/picture2.jpg",
            "deleteType": "DELETE"
        }
    ]
}

var errorJSON = {
    "files": [
        {
            "name": "picture1.jpg",
            "size": 902604,
            "error": "Filetype not allowed"
        },
        {
            "name": "picture2.jpg",
            "size": 841946,
            "error": "Filetype not allowed"
        }
    ]
}

var removeJSON = {
    "files": [
        {
            "picture1.jpg": true
        },
        {
            "picture2.jpg": true
        }
    ]
}


var app = express();
app.use(express.static(__dirname));
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});
app.post('/server/node', upload.single("files[]"), function (req, res, next) {
    var file = req.file,
        name = file.originalname,
        nameArray = name.split("."),
        Minme = nameArray[nameArray.length - 1];

    console.log(name, nameArray, Minme,file.filename);
    var resObj = {
        "用户计算机上的文件名称": req.originalname,
        "上传成功的文件信息": req.file,
        "文件大小": req.size,
        "保存的路径": req.destination,
        "保存在 destination 中的文件名": req.filename,
        "已上传文件的完整路径": req.path,
    };
    // console.log(req)
    fs.renameSync('./uploads/' + file.filename, './uploads/' + file.filename + '.' + Minme);
var filePathis="/uploads/"+file.filename+"."+Minme;
    var successResDate={"files": [
        {
            "name": file.filename,
            "size": file.size,
            "url": filePathis,
            "thumbnailUrl":filePathis,
            "deleteUrl": filePathis,
            "deleteType": "DELETE"
        }
        ]}
    var errorJSON = {
        "files": [
            {
                "name":  file.originalname,
                "size": file.size,
                "error": "文件错误"
            },]}



    // res.send(JSON.stringify(successResDate));
    res.send(JSON.stringify(errorJSON));
    // res.send("done");
});
var port = 8800;
app.listen(port);
// console.log(app)
// console.log(fs)
console.log("服务器启动成功，监听端口：8800")
