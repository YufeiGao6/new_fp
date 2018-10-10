function redirect(){
    document.getElementById("canvas").className = "animate";
    document.getElementById("main").className = "animate";
    setTimeout(function(){location.href='index.html'}, 1500);
}