function User(id, username, email, tagsId, photourl) {
    let o = {};
    o.id = id;
    o.username = username;
    o.email = email;
    o.tagsId = tagsId;
    o.photourl = photourl;
    return o;
}

//function to create user
function createUser() {
    let username = document.form.username.value;
    let email = document.form.email.value;
    let password = document.form.ini_password.value;

    if(username === "") {
        document.getElementById("msg").innerHTML = "Please input username!";
        return;
    }
    if(email === "") {
        document.getElementById("msg").innerHTML = "Please input email!";
        return;
    }
    if(password === "") {
        document.getElementById("msg").innerHTML = "Please input password!";
        return;
    }
    password = checkPassword();

    if(password !== null) {
        let data = {};
        data['username'] = username.toString();
        data['email'] = email.toString();
        data['password'] = password;

        let sendData = JSON.stringify(data);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = handle_res;
        xhr.open("post", "/createUser");
        xhr.send(sendData);

        function handle_res() {
            if (this.readyState !== 4) return;
            if (this.status !== 200) return;
            let sentBackObj = this.responseText;
            document.getElementById("msg").innerHTML = sentBackObj.split(",")[0];

            if(sentBackObj.includes("Successfully create your account!")){
                let curUser = new User(sentBackObj.split(",")[1], username, email, [], sentBackObj.split(",")[2]);
                window.sessionStorage.setItem('userTokenId', sentBackObj.split(",")[3]);
                swal({
                    icon: "success",
                    title: "Thanks for register!",
                    text: "An email has sent to you, please verify your account in the email",
                    closeOnClickOutside: false
                });

                // window.location.href= "index.html";
            }
        }
    }
}

function checkPassword(){
    let psw1 = document.form.ini_password.value;
    console.log(psw1);
    let psw2 = document.form.password.value;
    console.log(psw2);
    let button = document.getElementById("create-btn");

    if(psw1 !== psw2){
        button.disabled = true;
        document.getElementById("msg").innerHTML = "Please confirm your password";
        document.getElementById("msg").style.color = "red";
        return null;
    } else {
        button.disabled = false;
        return psw2;
    }
}
