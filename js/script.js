var clicked = false;
function changecolor() {
  var body1 = document.body;
  var btnout = document.getElementById("btn-out")
  var btnin = document.getElementById("btn-in")
  var bodyrgb = body1.style.backgroundColor.match(/\d+/g);
  if (bodyrgb == null){
    body1.style.backgroundColor = "#dedede";
    body1.style.color = "#212121";
    btnin.style.backgroundColor = "#dedede";
    btnout.style.backgroundColor = "#212121";
  }
  else {
    body1.style.color = body1.style.backgroundColor;
    body1.style.backgroundColor = "rgb("+ String(255-parseInt(bodyrgb[0])) +","+ String(255-parseInt(bodyrgb[1])) + "," + String(255-parseInt(bodyrgb[2])) + ")";
    btnin.style.backgroundColor = body1.style.backgroundColor;
    btnout.style.backgroundColor = body1.style.color;
  }
}
function fly() {
  if(clicked){
    return;
  }
  clicked = true;
  var avatar = document.getElementById('avatar');
  var l = parseInt(window.getComputedStyle(avatar, null).getPropertyValue('left'));
  var t = parseInt(window.getComputedStyle(avatar, null).getPropertyValue('top'));
  var s = parseInt(window.getComputedStyle(avatar, null).getPropertyValue('font-size'));
  var te = "", tim = 150;
  avatar.style.fontSize = String(s/2) + "px";
  for(var i=0; i<50; i++){
    t-=2;
    l-=2;
    if(i&1)     te = "𓅯";
    else        te = "𓅮";
    setTimeout(fl2, tim, avatar, l, t, te);
    tim += 150;
  }
  setTimeout(function () {avatar.innerHTML = "";},7500);
  setTimeout(function () {
    avatar.innerHTML = "𓅓";
    avatar.style.fontSize = "min(16rem,40vmin)";
    avatar.style.left = String(l + 100) + "px";
    avatar.style.top = String(t + 100) + "px";
    clicked = false;
  }, 9000);
}
function fl2(avatar, l ,t, te){
  avatar.style.left = String(l) + "px";
  avatar.style.top = String(t) + "px";
  avatar.innerHTML = te;
}
