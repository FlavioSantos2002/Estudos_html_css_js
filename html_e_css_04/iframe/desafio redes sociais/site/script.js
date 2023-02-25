var bot_yt = document.querySelector("#yt");
var bot_gh = document.querySelector("#gh");
var bot_tt = document.querySelector("#tt");
var bot_face = document.querySelector("#face");
var bot_insta = document.querySelector("#insta");
var bot_home = document.querySelector("#home")

var iframe = document.querySelector("#tela");

bot_yt.addEventListener("click", function(){

    iframe.src = "../pag/yt.html"

})

bot_gh.addEventListener("click", function(){

    iframe.src = "../pag/gh.html"

})

bot_tt.addEventListener("click", function(){

    iframe.src = "../pag/tt.html"

})

bot_face.addEventListener("click", function(){

    iframe.src = "../pag/face.html"

})

bot_insta.addEventListener("click", function(){

    iframe.src = "../pag/inta.html"

})

bot_home.addEventListener("click", function(){

    iframe.src = "../pag/home.html"

})

