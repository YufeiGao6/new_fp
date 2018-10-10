
function generateFulltext() {
    let divs = document.getElementsByClassName("tag");
    let container = document.getElementsByClassName("container");

    for (let i = 0; i < divs.length; i++) {
        let fulltext = document.createElement("div");
        let fulltextbtn = document.createElement("button");
        let icon = document.createElement("i");

        fulltext.className = "fulltext";
        fulltext.id = "full-text" + i;
        fulltextbtn.id = "fulltext-btn" + i;
        fulltextbtn.className = "fulltext-btn";
        icon.className = "fas fa-plus";


        divs[i].appendChild(fulltext);
        fulltext.appendChild(fulltextbtn);
        fulltextbtn.appendChild(icon);
        fulltext.style.width = divs[i].clientWidth + "px";
        fulltext.style.height = divs[i].clientHeight + "px";
        let curHeight = divs[i].clientHeight + "px";

        fulltextbtn.style.left = (divs[i].clientWidth - 20) + "px";
        fulltext.style.bottom = (13 - divs[i].clientHeight) + "px";

        let temp = document.getElementById("full-text" + i);
        let btn = document.getElementById("fulltext-btn" + i);

        btn.onclick = function () {
            if (temp.className === "fulltext") {
                temp.className = "fulltext2";
                divs[i].style.height = "200px";
                temp.style.height = "200px";
                fulltext.style.bottom = 0 + "px";
                icon.className = "fas fa-minus";
            }
            else {
                temp.className = "fulltext";
                divs[i].style.height = curHeight;
                temp.style.height = curHeight;
                fulltext.style.bottom = (13 - divs[i].clientHeight) + "px";
                icon.className = "fas fa-plus";

            }
        };

        container[i].onmouseover = function(){
            fulltext.style.opacity = "1";
        };

        container[i].onmouseleave = function(){
            fulltext.style.opacity = "0";
        };
    }
}


function User(id, username, email, tagsId, photourl) {
    let o = {};
    o.id = id;
    o.username = username;
    o.email = email;
    o.tagsId = tagsId;
    o.photourl = photourl;
    return o;
}

function checkAni() {
    let cta = document.getElementById("cta");
    let createPage = document.getElementById("login-text");
    let createContent = document.getElementById("create-content");
    var temp = createPage.className;

    if(temp === "login-text") {
        createPage.className = "login-text2";
        createContent.className = "show-hide";
        cta.className = "fas fa-arrow-up";
    }else{
        createPage.className = "login-text";
        cta.className = "fas fa-arrow-down";
        createContent.className = "text";
    }

}

/**
 * check whether there exists a curUser, if yes, return true; else false;
 * @returns {boolean}
 */
function checkCurUser() {
    return !JSON.parse(sessionStorage.getItem('user') === null);
}
if(window.location.href.includes("?")) {
    alert("sdfdsf");
    let paraArray = QuerySearch(window.location.search);
    let curUserTokenId = paraArray[0];
    let curUserId = paraArray[1];
    let curUsername = paraArray[2];
    let curUseremail = paraArray[3];
    let curUserphotourl = paraArray[4];
    let curUser = User(curUserId, curUsername, curUseremail, [], curUserphotourl);

    sessionStorage.setItem("user", JSON.stringify(curUser));

    let xhr = new XMLHttpRequest();
    xhr.open("post", "/auth");
    xhr.send(curUserTokenId);

}

window.onload = function () {
    (function() {
        let model = document.getElementById('log-page');
        let btn = document.getElementById('log-btn');
        let span = document.querySelector(".close");

        let model2 = document.getElementById('wrapper');
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
        // showUserName();
        // checkIfLogin();
    setTimeout(function(){ generateFulltext()}, 3000);
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
            showLogInStatus();
        }
    }
}
function logOut(){
    document.getElementById("loginUsername").innerText = "";
    document.getElementById("loginPassword").innerText = "";
    sessionStorage.removeItem('user');
    swal({
        text: "Successfully log out",
        button: false,
        closeOnClickOutside: false
    });

    setTimeout(function(){ showLogOutStatus(); }, 1300);
    // to do:
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
    window.location.href = "index.html";
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
                anonymous: sentBackObj[i].anonymous
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
        let gray = "#ececea";
        let gray2 = "#e5e6e8";
        let gray3 = "#f2f2f2";

        let colors = ["white","lightgray",gray, milk, gray2, gray3];
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
            let authorId = tag.authorId;
            let word = tag.content;
            let anonymous = tag.anonymous;
            let score = tag.score;
            let date = new Date(tag.date);
            let freq = 0;

            if(hotness==="time"){
                freq = date.valueOf()/100000000000;
            }
            else{
                freq = 0.8*score+14;
            }

            let month = date.getMonth()+1;
            let day = date.getDate();
            let time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

            date = month+"/"+day+"-"+time;

            let likeUserIds = tag.likeUserIds;
            let container = document.createElement("div");
            let tagContainer = document.createElement("div");
            let contentContainer = document.createElement("div");
            let likeButton = document.createElement("button");
            let post = document.createElement("p");

            let bigDiv = document.createElement("div");
            let photoSpan = document.createElement("span");
            let photo = document.createElement("img");
            let midSpan = document.createElement("span");
            let nameDiv = document.createElement("div");
            let dateDiv = document.createElement("div");
            let likeSpan = document.createElement("span");

            container.className = "container";
            container.id = id;

            tagContainer.className = "tag";
            tagContainer.style.backgroundColor = randomColor();
            tagContainer.onmouseover = function(){
                tagContainer.style.transform = "scale("+ (5/freq + 1) +")";
                container.style.zIndex = "1000";
            };
            tagContainer.onmouseout = function(){
                tagContainer.style.transform = "scale(1)";
                container.style.zIndex = "0";
            };

            dateDiv.innerText = date;
            dateDiv.style.fontSize = freq*0.7 +"px";
            dateDiv.style.color = "grey";

            let xhr = new XMLHttpRequest();
            xhr.open("post", "/getUsernameById");
            xhr.send(authorId);
            let authorName = "";
            let photoUrl = "";
            xhr.onreadystatechange = handle_res;
            function handle_res() {
                if (this.readyState !== 4) {
                    return;
                }
                if (this.status !== 200) {
                    return;
                }
                let sentBackObj = JSON.parse(this.responseText);

                if(sentBackObj){
                    if(anonymous){
                        nameDiv.innerText = "Anonymous";
                    }
                    else{
                        authorName = sentBackObj.username;
                        nameDiv.innerText = authorName;
                        photoUrl = sentBackObj.photo_url;
                        photo.src = photoUrl;
                        photo.className = "photo";
                        photo.style.width = freq+5 + "px";
                        photoSpan.appendChild(photo);
                        photoSpan.className = "photoSpan";
                    }
                }
                else{
                    nameDiv.innerText = "Anonymous";
                }
                nameDiv.style.fontSize = freq*0.8 +"px";
                nameDiv.style.fontFamily = "Helvetica";

                midSpan.appendChild(nameDiv);
                midSpan.appendChild(dateDiv);
                midSpan.className = "photoSpan";

            }
            bigDiv.appendChild(photoSpan);
            bigDiv.appendChild(midSpan);


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
                        likeSpan.innerText = score;
                        likeSpan.style.fontSize = freq*0.8 + "px";
                        likeSpan.appendChild(likeButton);
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
                        likeSpan.innerText = score;
                        likeSpan.appendChild(likeButton);
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

            likeSpan.innerText = score;
            likeSpan.appendChild(likeButton);

            likeSpan.style.fontSize = freq + "px";
            likeSpan.className = "likeSpan";

            let width = parseInt(midSpan.style.width) + parseInt(likeSpan.style.width) + 50;

            container.style.maxWidth = width + "px";

            post.innerText = word;

            contentContainer.appendChild(post);
            contentContainer.className = "content";
            contentContainer.style.fontSize = freq + "px";
            contentContainer.style.padding = freq/5 + "px";

            bigDiv.style.height = 2*freq + "px";
            likeSpan.style.lineHeight = 2 * freq + "px";
            bigDiv.appendChild(likeSpan);
            bigDiv.style.paddingTop = "5px";
            tagContainer.appendChild(bigDiv);
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
            x = (1 + angle) * Math.cos(angle) * 2.2 - 45;
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
            if (tags.length>16){
                length = 16;
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
    let anonymous = document.getElementById("checkbox").checked;
    likeUserIds.push(authorId);

    if (content.trim() !== "") {
        let data = {};
        data['authorId'] = authorId;
        data['score'] = score;
        data['content'] = content.toString();
        data['date'] = date;
        data['likeUserIds'] = likeUserIds;
        data['anonymous'] = anonymous;
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
    xhr.open("post", "/getUserById");
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

/**
 * parse the parameter of the url
 * @param url
 * @returns {*}
 * @constructor
 */
function QuerySearch(url){
    let arr = url.split('?')[1].split('&');
    let resultArray = [];
    for(let i = 0; i < arr.length; i++) {
        resultArray.push(arr[i].split('=')[1]);
    }
    return resultArray;
}

