

function loadHead() {
    let curUser = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById('user-head').setAttribute("src", curUser.photourl);
}

function showUserName(){
    let curUser = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById('Welcome').innerHTML = "Welcome " + curUser.username;
}

//fucntion to load all tags of one specific user
function loadTagsDB() {
    let curUser = JSON.parse(sessionStorage.getItem('user'));
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handle_res;
    xhr.open("post", "/loadTagsDB");
    xhr.send(curUser.id);

    function handle_res() {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return;
        let sentBackObj = JSON.parse(this.responseText);
        let center = document.getElementById("center")

        for (let j = 0; j < sentBackObj.length; j++) {
            let container = document.createElement("div");
            let editbtn = document.createElement("button");
            let deletebtn = document.createElement("button");
            let savebtn = document.createElement("button");
            let mesg = document.createElement("p");

            let tagContainer = document.createElement("div");
            let tagid = document.createElement("p");
            let tagcontent = document.createElement("p");

            let icon = document.createElement("i");
            let icon2 = document.createElement("i");

            tagid.className = "tag_id";
            container.className = "container";
            tagContainer.className = "tag-container";
            editbtn.className = "edit-btn btn";
            deletebtn.className = "delete-btn btn";
            tagcontent.className = "tag-content";
            savebtn.className = "update-btn";
            mesg.className = "mesg";


            savebtn.innerHTML = "Save";
            icon.className = "far fa-edit";
            icon2.className = "far fa-trash-alt";

            container.appendChild(savebtn);
            container.appendChild(editbtn);
            container.appendChild(deletebtn);
            container.appendChild(tagContainer);

            tagContainer.appendChild(tagid);
            tagContainer.appendChild(tagcontent);
            tagContainer.appendChild(mesg);
            editbtn.appendChild(icon);
            deletebtn.appendChild(icon2);

            tagid = sentBackObj[j]._id;
            tagcontent.innerText = sentBackObj[j].content;
            document.getElementById("section").appendChild(container);

            deletebtn.onclick = function () {
                let xhr = new XMLHttpRequest();
                xhr.open("post", "/deleteTag");
                xhr.send(tagid);
                location.reload();

            };
            editbtn.onclick = function () {
                mesg.className = "mesg";
                savebtn.style.opacity = "1";
                tagcontent.contentEditable = "true";
                savebtn.className = "save-btn";
            };

            savebtn.onclick = function () {
                let maxNum = 120;

                if (tagcontent.innerText.length >= maxNum) {
                    let text = tagcontent.innerText.length - maxNum;
                    swal({
                        title: "Your Input Message Is Too Long", 
                        text: "Please Delete At Least " + text + " Letter(s)",
                        icon: "warning",
                        button: "Got It",
                        closeOnClickOutside: false
                    });
                } else {
                    mesg.className = "mesg2";
                    let xhr = new XMLHttpRequest();
                    xhr.open("post", "/editTag");
                    let sentBackObj = [];
                    sentBackObj.push(tagid);
                    sentBackObj.push(tagcontent.innerText);
                    xhr.send(JSON.stringify(sentBackObj));
                    tagcontent.innerText = sentBackObj[1];
                    savebtn.style.opacity = "0";
                    tagcontent.contentEditable = "false";
                    swal({
                        title: "Your Change Has Been Saved", 
                        icon: "success",
                        button: "Yeah",
                        closeOnClickOutside: false
                    });
                }
            }
        }
    }
}

