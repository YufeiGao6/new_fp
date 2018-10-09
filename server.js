let http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , qs = require('querystring')
  , path = require('path')
  , emoji = require('node-emoji')
  , mongoose = require('mongoose')
    , md5 = require('js-md5')
  , port = 8080;

// data fields:
let dataSet = [];
let mongoUrl = "mongodb://heroku_wxgxxz0f:9s9gbag43mg230gm92eu9c0hvm@ds117773.mlab.com:17773/heroku_hxnljp4s";
mongoose.connect(mongoUrl, {
    useNewUrlParser: true
});
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + mongoUrl);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    tagIds: Array,
    photo_url: String
});
let tagSchema = new mongoose.Schema({
    authorId: String,
    score: Number,
    content: String,
    date: Date,
    likeUserIds: Array
});

let User = mongoose.model("User", userSchema);
let Tag = mongoose.model("Tag", tagSchema);

let user1 = new User({
    username: 'shabi',
    password: "sssss",
    email: "sdfsdf",
    tagIds: [],
    photo_url: "sdfdsf"
});

let tag1 = new Tag({
    authorId: '5bae568b134c661f3c90107f',
    score: 10,
    content: 'gdhajhjdagd',
    date: '2016-05-18T16:00:00Z',
    likeUserIds: ['5bae568b134c661f3c90107f']
});

let server = http.createServer (function (req, res) {
    let uri = url.parse(req.url);
  switch( uri.pathname ) {
    case '/':
        sendFile(res, 'Public/html/start.html');
        break;
    case '/index.html':
        sendFile(res, 'Public/html/index.html');
        break;
    case '/signup.html':
        sendFile(res, 'Public/html/signup.html');
        break;
    case '/user.html':
        sendFile(res, 'Public/html/user.html');
        break;
  case '/start.html':
        sendFile(res, 'Public/html/start.html');
        break;
    case '/css/style.css':
        sendFile(res, 'Public/css/style.css', 'text/css');
        break;
    case '/css/signup.css':
        sendFile(res, 'Public/css/signup.css', 'text/css');
        break;
    case '/css/wordCloud.css':
        sendFile(res, 'Public/css/wordCloud.css', 'text/css');
        break;
    case '/css/user.css':
        sendFile(res, 'Public/css/user.css', 'text/css');
        break;
    case '/css/start.css':
        sendFile(res, 'Public/css/start.css', 'text/css');
        break;
    case '/js/scripts.js':
        sendFile(res, 'Public/js/scripts.js', 'text/javascript');
        break;
    case '/js/signup.js':
        sendFile(res, 'Public/js/signup.js', 'text/javascript');
        break;
    case '/js/user.js':
        sendFile(res, 'Public/js/user.js', 'text/javascript');
        break;
    case '/js/start.js':
          sendFile(res, 'Public/js/start.js', 'text/javascript');
          break;
    case '/icon.ico':
        sendFile(res, 'icon.ico');
        break;
    case '/images/left.jpeg':
          sendFile(res, 'Public/images/left.jpeg');
          break;
      case '/createUser':
          let createUserData = "";
          req.on("data", function(d) {
              createUserData += d;
          });
          req.on("end", function () {
              let obj = JSON.parse(createUserData);
              let createUserName = obj.username;
              let createEmail = obj.email;
              let createPassword = obj.password;

              User.countDocuments({email:createEmail}, function(err, count) {
                  if(err) {
                      console.log("Something wrong happens with database!");
                  } else if(count !== 0) {
                      res.end("Email already in use!");
                  } else {
                      User.countDocuments({username:createUserName}, function(err, count) {
                          if(err) {
                              console.log("Something wrong happens with database!");
                          } else if(count !== 0) {
                              res.end("Username is already in use!");
                          } else {
                              let succsMsg = "Successfully create your account!";
                              let curUser = new User({
                                  username: createUserName,
                                  password: md5(createPassword),
                                  email: createEmail,
                                  tagIds: [],
                                  photo_url: "http://images.nowcoder.com/head/"+ (Math.random().toFixed(2)*400 + 100) + "t.png"
                              });
                              curUser.save(function (err, res) {
                                  if (err) {
                                      console.log("Something wrong happens with database!");
                                  } else {
                                      console.log("Successfully insert the user into database！");
                                  }
                              });
                              //window.location.href="index.html";
                              console.log(curUser.email);
                              console.log(curUser._id);
                              console.log(curUser.photo_url);
                              console.log(curUser.email);
                              res.end(succsMsg + "," + curUser._id + "," + curUser.photo_url);
                          }
                      });
                  }
              });
          });
          break;
      case '/postTag':
          let postdata = '';
          req.on('data', function (d) {
              postdata += d;
          });
          req.on('end', function () {
              let obj = JSON.parse(postdata);

              let authorId = obj.authorId;
              let score= obj.score;
              let content = obj.content;
              let date = obj.date;
              let likeUserIds = obj.likeUserIds;

              let data = new Tag({
                  authorId: authorId,
                  score: score,
                  content: content,
                  date: date,
                  likeUserIds: likeUserIds
              });
              data.save(function(err, a) {
                  if(err) {
                      console.log("error");
                  } else {
                      //console.log(a);
                  }
              });
              dataSet.push(data);
              res.end(JSON.stringify(data));
          });
          break;
      case '/login':
          let data = '';
          req.on('data', function (d) {
              data += d;
          });
          req.on('end', function () {
              let obj = JSON.parse(data);
              let username = obj.username;
              let password= obj.password;
              let sentBackString = "";
              let sentBackObj = {};
              User.findOne({username: username}, function (err, user) {
                  if(err) {
                      console.log("sth wrong with database!");
                  } else if(user){
                      if(user.password === md5(password)) {
                          sentBackString = "Successfully login";
                          sentBackObj['sentBackMsg'] = sentBackString;
                          sentBackObj['user'] = user;
                          res.end(JSON.stringify(sentBackObj));
                      } else {
                          sentBackString = "Password is wrong!";
                          sentBackObj['sentBackMsg'] = sentBackString;
                          sentBackObj['user'] = {};
                          res.end(JSON.stringify(sentBackObj));
                      }
                  } else {
                      sentBackString = "Doesn't have this user!";
                      sentBackObj['sentBackMsg'] = sentBackString;
                      sentBackObj['user'] = {};
                      res.end(JSON.stringify(sentBackObj));
                  }
              });
          });
          break;
      case '/loadTags':
          Tag.find({}, function(err, docs) {
              if(err) {
                  console.log("err");
              }else {
                  dataSet = docs;
                  res.end(JSON.stringify(dataSet));
                  //console.log("Load tags");
              }
          });
          break;
      case '/postTagUpdateAuthor':
          let updatedata = '';
          req.on('data', function (d) {
              updatedata += d;
          });
          req.on('end', function () {
              let obj = JSON.parse(updatedata);
              let _id = obj._id;
              let tagIds = obj.tagIds;

              let query = {_id: _id};
              User.updateOne(query, {
                  tagIds: tagIds
              }, {multi: true}, function (err, docs) {
                  if (err) console.log(err);
                  console.log('updated' + docs);
              });
          });
          break;
      case '/getUserById':
          let authorData = '';
          req.on('data', function (d) {
              authorData += d;
          });
          req.on('end', function () {
              let sentBackTag = [];
              User.findOne({_id: authorData}, function(err, docs) {
                  if(err) {
                      console.log("err");
                  }else {
                      sentBackTag = docs;
                      res.end(JSON.stringify(sentBackTag));
                  }
              });
          });
          break;
      case '/getUsernameById':
          let author = '';
          req.on('data', function (d) {
              author += d;
          });
          req.on('end', function () {
              let sentBackTag = [];
              User.findOne({_id: author}, function(err, docs) {
                  if(err) {
                      console.log("err");
                  }else {
                      sentBackTag = docs;
                      res.end(JSON.stringify(sentBackTag));
                  }
              });
          });
          break;
      case '/likeTag':
          let likeData = '';
          req.on('data', function (d) {
              likeData += d;
          });
          req.on('end', function () {
              let obj = JSON.parse(likeData);
              let userId = obj.userId;
              let _id = obj.tagId;

              let query = {_id: _id};
              Tag.update(query,
                  { $push: { likeUserIds:userId } }
                  , function (err, docs) {
                  if (err) console.log(err);
                  else{
                      let sentBack = docs;
                      res.end(JSON.stringify(sentBack));
                  }
              });
              Tag.update(query,
                  { $inc: { score: 1 } }
                  , function (err, docs) {
                      if (err) console.log(err);
                      else{
                          let sentBack = docs;
                          res.end(JSON.stringify(sentBack));
                      }
                  });
          });
          break;
      case '/unlikeTag':
          let unlikeData = '';
          req.on('data', function (d) {
              unlikeData += d;
          });
          req.on('end', function () {
              let obj = JSON.parse(unlikeData);
              let userId = obj.userId;
              let _id = obj.tagId;

              let query = {_id: _id};
              Tag.update(query,
                  { $pull: { likeUserIds:userId } }
                  , function (err, docs) {
                      if (err) console.log(err);
                      else{
                          let sentBack = docs;
                          res.end(JSON.stringify(sentBack));
                      }
                  });
              Tag.update(query,
                  { $inc: { score: -1 } }
                  , function (err, docs) {
                      if (err) console.log(err);
                      else{
                          let sentBack = docs;
                          res.end(JSON.stringify(sentBack));
                      }
                  });
          });
          break;
      case '/loadTagsDB':
          let data2 = '';
          req.on('data', function (d) {
              data2 += d;
          });
          req.on('end', function () {
              let sentBackTagContents = [];
              Tag.find({authorId: data2}, function (err, docs) {
                  if (err) {
                      console.log("err");
                  } else {
                      sentBackTagContents = docs;
                      res.end(JSON.stringify(sentBackTagContents));
                  }
              });
          });
          break;
      case '/deleteTag':
          let deletedata = '';
          req.on('data', function (d) {
              deletedata += d;
          });
          req.on('end', function () {
              let temp = mongoose.Types.ObjectId(deletedata);
              Tag.remove({_id: temp}, function (err, docs) {
                  if (err) {
                      console.log("err");
                  } else {
                      //console.log(docs);
                  }
              });
          });
          break;
      case '/editTag':
          let editdata = '';
          req.on('data', function (d) {
              editdata += d;
          });
          req.on('end', function () {
              let obj = JSON.parse(editdata);
              let id = obj[0];
              let content = obj[1];

              let query = {_id: id};
              Tag.updateOne(query, {
                  content: content,
              }, {multi: true}, function (err, docs) {
                  if (err) console.log(err);
                  //console.log('edit' + docs);
              });
          });
          break;
      default:
          res.end('404 not found')
  }
});

server.listen(process.env.PORT || port);
console.log('listening on 8080');


function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html';

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType});
    res.end(content, 'utf-8')
  })
}