function User(id, username, email, tagsId, photourl) {
    let o = {};
    o.id = id;
    o.username = username;
    o.email = email;
    o.tagsId = tagsId;
    o.photourl = photourl;
    return o;
}

/**
 * check whether there exists a curUser, if yes, return true; else false;
 * @returns {boolean}
 */
function checkCurUser() {
    return !JSON.parse(sessionStorage.getItem('user') === null);
}

window.onload = function () {
    (function() {
        let model = document.getElementById('log-page');
        let btn = document.getElementById('log-btn');
        let span = document.querySelector(".close");

        let model2 = document.getElementById('add-page');
        let btn2 = document.getElementById('add-btn');
        let span2 = document.querySelector(".close2");

        let model3 = document.getElementById('about-page');
        let btn3 = document.getElementById('about-btn');
        let span3 = document.querySelector(".close3");

        let sortByTime = document.getElementById('time');
        let sortByScore = document.getElementById('score');

        sortByTime.onclick = function(){
            document.getElementById("word-cloud").innerHTML="";
            loadTags("time");
        };

        sortByScore.onclick = function(){
            document.getElementById("word-cloud").innerHTML="";
            loadTags("score");
        };

        btn3.onclick = function () {
            model3.style.display = "block";
        };

        span3.onclick = function () {
            model3.style.display = "none"
        };

        window.onclick = function (event) {
            if (event.target === model3) {
                model3.style.display = "none";
            }
        };

        btn.onclick = function () {
            model.style.display = "block";
            document.getElementById("loginUsername").value = "";
            document.getElementById("loginPassword").value = "";
        };

        span.onclick = function () {
            model.style.display = "none"
        };

        window.onclick = function (event) {
            if (event.target === model) {
                model.style.display = "none";
            }
        };

        btn2.onclick = function () {
            if(checkCurUser()){
                model2.style.display = "block";
            }
            else{
                model.style.display = "block";
            }

        };

        span2.onclick = function () {
            model2.style.display = "none"
        };

        window.onclick = function (event) {
            if (event.target === model2) {
                model2.style.display = "none";
            }
        };
        let curUser = JSON.parse(sessionStorage.getItem('user'));
        if (curUser != null) {
            document.getElementById('Welcome').innerHTML = "Welcome " + curUser.username;
            document.getElementById('user-head').setAttribute("src", curUser.photourl);
            btn.innerHTML = "Log Out";
            btn.onclick = logOut;
        } else {
            document.getElementById('user-btn').style.display = "none";
        }
    }());
    loadTags("score");
};

//function to hide/show te password
function hideShowPsw(){
    let hide = document.getElementById("hide");
    let psw = document.getElementById("loginPassword");
    if (psw.type === "password") {
        psw.type = "text";
        hide.className = "far fa-eye";
    }else {
        psw.type = "password";
        hide.className = "far fa-eye-slash";
    }
}

function showUserName(){
    if(checkCurUser()){
        let curUser = JSON.parse(sessionStorage.getItem('user'));
        document.getElementById('Welcome').innerHTML = "Welcome " + curUser.username;
    }
}

function login() {
    let usernameText = document.getElementById("loginUsername").value;
    let passwordText = document.getElementById("loginPassword").value;
    let data = {};
    data['username'] = usernameText;
    data['password'] = passwordText;

    let sendData = JSON.stringify(data);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handle_res;
    xhr.open("post", "/login");
    xhr.send(sendData);

    function handle_res() {
        let obj = JSON.parse(this.responseText);
        document.getElementById("msgAlert").innerText = obj.sentBackMsg;
        if(obj.sentBackMsg === "Successfully login") {
            let sentBackUser = obj.user;
            let curUser = User(sentBackUser._id, sentBackUser.username, sentBackUser.email, sentBackUser.tagsId, sentBackUser.photo_url);;
            window.sessionStorage.setItem('user', JSON.stringify(curUser));
        }
        showLogInStatus();
    }
}
function logOut(){
    document.getElementById("loginUsername").innerText = "";
    document.getElementById("loginPassword").innerText = "";
    sessionStorage.removeItem('user');
    showLogOutStatus();
}

function showLogOutStatus() {
    document.getElementById('log-page').style.display = "none";
    document.getElementById('Welcome').innerHTML = "";
    document.getElementById('log-btn').innerHTML = "Login / Sign Up";
    document.getElementById('user-btn').style.display = "none";
    document.getElementById('log-btn').onclick = function(){
        let model = document.getElementById('log-page');
        model.style.display = "block";
    };
    location.reload();
}

function showLogInStatus() {
    let curUser = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById('user-btn').style.display = "inline";
    document.getElementById('Welcome').innerHTML = "Welcome " + curUser.username;
    document.getElementById('log-btn').innerHTML = "Log Out";
    document.getElementById('log-btn').onclick = logOut;
    document.getElementById('log-page').style.display = "none";
    location.reload();
}


function checkIfLogin(){
    let btn = document.getElementById('log-btn');
    if (checkCurUser()){
        btn.innerHTML = "Logoff";
        btn.onclick = logOut;
    }
}

function hideShowPsw(){
    let hide = document.getElementById("hide");
    let psw = document.getElementById("loginPassword");
    if (psw.type === "password") {
        psw.type = "text";
        hide.className = "far fa-eye";
    }else {
        psw.type = "password";
        hide.className = "far fa-eye-slash";

    }
}

//--------------------------------------word cloud tag 相关-------------------------------------------------------

/**
 * load posts, create word cloud
 * @returns {Array}
 */
function loadTags(hotness) {
    let load = document.getElementById("loader");
    load.className = "lds-roller";

    var flag = 0;
    let xhr = new XMLHttpRequest();
    xhr.open("get", "/loadTags");
    xhr.onreadystatechange = handle_res;
    xhr.send();
    let tags = [];
    function handle_res() {
        if (this.readyState !== 4) {
            return;
        }
        if (this.status !== 200) {
            return;
        }
        let sentBackObj = JSON.parse(this.responseText);

        for (let i=0; i<sentBackObj.length; i++){
            let currentTag = {
                _id: sentBackObj[i]._id,
                authorId: sentBackObj[i].authorId,
                score: sentBackObj[i].score,
                content: sentBackObj[i].content,
                date: sentBackObj[i].date,
                likeUserIds: sentBackObj[i].likeUserIds,
            };
            tags[i] = currentTag;
        }

        /*  ======================= SETUP ======================= */
        var config = {
            trace: true,
            spiralResolution: 1, //Lower = better resolution
            spiralLimit: 360 * 5,
            xWordPadding: 0,
            yWordPadding: 3,
        };

        let yellow = "#f8ebd8";
        let green = "#b5c4b1";
        let mint = "#e0e5df";
        let milk = "#fffaf4";
        let pink = "#e0cdcf";
        let purple = "#c9c0d3";
        let blue = "#c1cbd7";
        let grey = "#ececea";

        let colors = [yellow, green, mint, blue, grey, milk, pink, purple];
        function randomColor() {
            let index = Math.floor((Math.random()*colors.length));
            return colors[index];
        }
        
        if(hotness === "time"){
            tags.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.date) - new Date(a.date);
            });
        }
        else{
            tags.sort(function(a, b) {
                return -1 * (a.score - b.score);
            });
        }

        var cloud = document.getElementById("word-cloud");
        cloud.style.position = "relative";

        var traceCanvas = document.createElement("canvas");
        traceCanvas.width = cloud.offsetWidth;
        traceCanvas.height = cloud.offsetHeight;
        var traceCanvasCtx = traceCanvas.getContext("2d");
        cloud.appendChild(traceCanvas);

        var startPoint = {
            x: cloud.offsetWidth / 2,
            y: cloud.offsetHeight / 2
        };

        var wordsDown = [];
        /* ======================= END SETUP ======================= */


        /* =======================  PLACEMENT FUNCTIONS =======================  */
        function createWordObject(tag) {
            let curUser;
            let userId;
            if(checkCurUser()){
                curUser = JSON.parse(sessionStorage.getItem('user'));
                userId = curUser.id;
            }
            let id = tag._id;
            let word = tag.content;
            let score = tag.score;
            let date = new Date(tag.date);
            let freq = 0;

            if(hotness==="time"){
                freq = date.valueOf()/100000000000;
            }
            else{
                freq = 1.2*score+12;
            }

            let month = date.getMonth()+1;
            let day = date.getDate();
            let time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

            date = month+"/"+day+"-"+time;

            let likeUserIds = tag.likeUserIds;
            let dateContainer = document.createElement("span");
            let likeSubCon = document.createElement("span");
            let container = document.createElement("div");
            let tagContainer = document.createElement("div");
            let likeContainer = document.createElement("div");
            let contentContainer = document.createElement("div");
            let likeButton = document.createElement("button");
            let post = document.createElement("p");

            container.className = "container";
            container.id = id;

            tagContainer.className = "tag";
            tagContainer.style.backgroundColor = randomColor();
            tagContainer.onmouseover = function(){
                tagContainer.style.transform = "scale("+ (5/freq + 1) +")";
                container.style.zIndex = "1";
            };
            tagContainer.onmouseout = function(){
                tagContainer.style.transform = "scale(1)";
                container.style.zIndex = "0";
            };

            dateContainer.innerText = date;

            if (checkCurUser()){ // user logged in
                if(likeUserIds.includes(userId)){
                    likeButton.className = "likeButton";
                }
                else{
                    likeButton.className = "unlikeButton";
                }
                likeButton.innerHTML = "<i class=\"fas fa-heart\"></i>";
                likeButton.style.fontSize = freq +"px";
                likeButton.id = "like"+id;
                likeButton.onclick = function(){
                    let like = document.getElementById("like"+id);
                    if (like.className === "unlikeButton") {
                        likeButton.className = "likeButton";
                        score = score+1;
                        likeSubCon.innerText = score;
                        likeSubCon.appendChild(likeButton);
                        likeContainer.appendChild(likeSubCon);
                        likeContainer.appendChild(dateContainer);
                        // db把当前user加进当前tag的likeUserIds
                        let likeData = {};
                        likeData['userId'] = userId;
                        likeData['tagId'] = id;

                        let sendData = JSON.stringify(likeData);
                        let xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = handle_res;
                        xhr.open("post", "/likeTag");
                        xhr.send(sendData);
                        function handle_res() {
                            if (this.readyState !== 4) {
                                return;
                            }
                            if (this.status !== 200) {
                                return;
                            }
                        }

                    }else {
                        likeButton.className = "unlikeButton";
                        score = score-1;
                        likeSubCon.innerText = score;
                        likeSubCon.appendChild(likeButton);
                        likeContainer.appendChild(likeSubCon);
                        likeContainer.appendChild(dateContainer);
                        // db把当前user移出当前tag的likeUserIds
                        let unlikeData = {};
                        unlikeData['userId'] = userId;
                        unlikeData['tagId'] = id;

                        let sendData = JSON.stringify(unlikeData);
                        let xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = handle_res;
                        xhr.open("post", "/unlikeTag");
                        xhr.send(sendData);
                        function handle_res() {
                            if (this.readyState !== 4) {
                                return;
                            }
                            if (this.status !== 200) {
                                return;
                            }
                        }
                    }
                };
            }
            else{ // no user logged in
                likeButton.className = "unlikeButton";
                likeButton.innerHTML = "<i class=\"fas fa-heart\"></i>";
                likeButton.style.fontSize = freq +"px";
                likeButton.id = "like"+id;
                likeButton.onclick = function () {
                    let login = document.getElementById('log-page');
                    login.style.display = "block";
                }
            }

            likeSubCon.innerText = score;
            likeSubCon.appendChild(likeButton);
            likeContainer.appendChild(likeSubCon);
            likeContainer.appendChild(dateContainer);
            likeContainer.className = "like";
            dateContainer.style.fontSize = freq*0.7 + "px";
            dateContainer.style.paddingTop = 3 + "px";
            likeContainer.style.fontSize = freq + "px";
            likeContainer.style.padding = freq/5 + "px";

            post.innerText = word;

            contentContainer.appendChild(post);
            contentContainer.className = "content";
            contentContainer.style.fontSize = freq + "px";
            contentContainer.style.padding = freq/5 + "px";

            tagContainer.appendChild(likeContainer);
            tagContainer.appendChild(contentContainer);

            container.appendChild(tagContainer);
            return container;
        }

        function placeWord(word, x, y) {
            cloud.appendChild(word);
            word.style.left = x - word.offsetWidth/2 + "px";
            word.style.top = y - word.offsetHeight/2 + "px";

            wordsDown.push(word.getBoundingClientRect());
        }

        function spiral(i, callback) {
            angle = config.spiralResolution * i;
            x = (1 + angle) * Math.cos(angle) * 2.3 + 6;
            y = (1 + angle) * Math.sin(angle) - 100;
            return callback ? callback() : null;
        }

        function intersect(word, x, y) {
            cloud.appendChild(word);

            word.style.left = x - word.offsetWidth/2 + "px";
            word.style.top = y - word.offsetHeight/2 + "px";

            var currentWord = word.getBoundingClientRect();

            cloud.removeChild(word);

            for(var i = 0; i < wordsDown.length; i+=1){
                var comparisonWord = wordsDown[i];

                if(!(currentWord.right + config.xWordPadding < comparisonWord.left - config.xWordPadding ||
                    currentWord.left - config.xWordPadding > comparisonWord.right + config.xWordPadding ||
                    currentWord.bottom + config.yWordPadding < comparisonWord.top - config.yWordPadding ||
                    currentWord.top - config.yWordPadding > comparisonWord.bottom + config.yWordPadding)){

                    return true;
                }
            }

            return false;
        }
        /* =======================  END PLACEMENT FUNCTIONS =======================  */


        /* =======================  LETS GO! =======================  */
        (function placeWords() {
            let length = tags.length;
            if (tags.length>20){
                length = 20
            }
            for (var i = 0; i < length; i += 1) {

                var word = createWordObject(tags[i]);

                for (var j = 0; j < config.spiralLimit; j++) {
                    //If the spiral function returns true, we've placed the word down and can break from the j loop
                    if (spiral(j, function() {
                        if (!intersect(word, startPoint.x + x, startPoint.y + y)) {
                            placeWord(word, startPoint.x + x, startPoint.y + y);
                            return true;
                        }
                    })) {
                        break;
                    }
                }
            }
            flag = 1;
            if(flag ===1) {
                let load = document.getElementById("loader");
                load.className = "loader2";
            }
        })();

        /* ======================= WHEW. THAT WAS FUN. We should do that again sometime ... ======================= */
    }
    return tags;
}

/**
 * create new post
 */
function postTag() {
    let curUser = JSON.parse(sessionStorage.getItem('user'));
    let authorId = curUser.id;
    let score = 1;
    let content = document.getElementById("tag-content").value;
    let date = new Date();
    let likeUserIds = [];
    likeUserIds.push(authorId);

    if (content.trim() !== "") {
        let data = {};
        data['authorId'] = authorId;
        data['score'] = score;
        data['content'] = content.toString();
        data['date'] = date;
        data['likeUserIds'] = likeUserIds;
        let maxNum = 120;
        
        if (data['content'].length >= maxNum) {
            let text = data['content'].length - maxNum;
            swal({
                title: "Your Input Message Is Too Long", 
                text: "Please Delete At Least " + text + " Letter(s)",
                icon: "warning",
                button: "Got It",
                closeOnClickOutside: false
            });
        } else {
            let sendData = JSON.stringify(data);
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = handle_res;
            xhr.open("post", "/postTag");
            xhr.send(sendData);
    
            function handle_res() {
                if (this.readyState !== 4) {
                    return;
                }
                if (this.status !== 200) {
                    return;
                }
                let sentBackObj = JSON.parse(this.responseText);
                let tagId = sentBackObj._id;
                getTagIdsByAuthorId(authorId, tagId);

                swal({
                    text: "Posts +1", 
                    button: false,
                    closeOnClickOutside: false
                });

                setTimeout(function(){ location.reload(); }, 1300);
                }
            }
        
    }
    else {
        swal({
            title: "Your Input Message Is Empty", 
            text: "Please Enter Something",
            icon: "warning",
            button: "Got It",
            closeOnClickOutside: false
        });
    }
}

/**
 * 根据用户id获取他的tagsId那个array
 * @param authorId
 * @returns {Array}
 */
function getTagIdsByAuthorId(authorId, tagId) {
    let xhr = new XMLHttpRequest();
    xhr.open("post", "/getTagIdsByAuthorId");
    xhr.send(authorId);
    let tagIds = [];
    xhr.onreadystatechange = handle_res;
    function handle_res() {
        if (this.readyState !== 4) {
            return;
        }
        if (this.status !== 200) {
            return;
        }
        let sentBackObj = JSON.parse(this.responseText);
        tagIds = [].concat(sentBackObj.tagIds);

        let data = {};
        data['_id'] = authorId;
        tagIds.push(tagId);
        data['tagIds'] = tagIds;

        let sendData = JSON.stringify(data);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = handle_res;
        xhr.open("post", "/postTagUpdateAuthor");
        xhr.send(sendData);
        function handle_res() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status !== 200) {
                return;
            }
            let sentBackObj = JSON.parse(this.responseText);
        }
    }
}

/**
 * emoji
 */
$(document).ready(function() {
    $("#tag-content").emojioneArea({
        pickerPosition: "bottom",
        tonesStyle: "radio"});
});
