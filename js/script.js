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
function getvisible() {
    if(window.getComputedStyle(document.getElementById('page1')).display == "block")
        return 1;
    else if(window.getComputedStyle(document.getElementById('page2')).display == "block")
        return 2;
    else if(window.getComputedStyle(document.getElementById('page3')).display == "block")
        return 3;
}
function changepage(difference) {
    var number = parseInt(getvisible());
    difference = parseInt(difference);
    if(number == 1){
        document.getElementById('page1').style.display = "none";
        document.getElementById('page2').style.display = "block";
        document.getElementById('arrow-1').style.display = "block";
    }
    else if (number == 3) {
        document.getElementById('page3').style.display = "none";
        document.getElementById('page2').style.display = "block";
        document.getElementById('arrow1').style.display = "block";
        document.getElementsByClassName('footer')[0].style.position = "absolute";
    }
    else{
        document.getElementById('page' + String(number + difference)).style.display = "block";
        document.getElementById('page2').style.display = "none";
        document.getElementById('arrow' + String(difference)).style.display = "none";
        if(difference == 1 && window.innerWidth <= 800)
            document.getElementsByClassName('footer')[0].style.position = "relative";

    }
}
var xhttp = new XMLHttpRequest();
var content="<tr>";
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
  load_content(this);
  }
};
xhttp.open("GET", "/projects/projects.xml", true);
xhttp.send();

function load_content(xml) {
  var xmlDoc = xml.responseXML;
  projects = xmlDoc.getElementsByTagName("project");
  for(var i=0;i<projects.length;i++){
    var project = projects[i];
    var name = project.children[0].childNodes[0].nodeValue;
    var tech = project.children[1].childNodes[0].nodeValue;
    var desp = project.children[2].childNodes[0].nodeValue;
    var link = project.children[3];
    var link_count = link.childElementCount;
    content += `<td><h3>${name}</h3><hr><h4>${tech}</h4><p>${desp}</p>`;

    if (link_count>0){
      content += "<div class=\"info\">";
      for(var j=0; j<link_count;j++){
        var url = link.children[j].childNodes[0].nodeValue;
        var web = link.children[j].nodeName;
        var last_icon = "";
        if (j == link_count-1)
          last_icon += "remmar";
        content += `<a class=\"icon\ ${last_icon}" href=\"${url}\"><div class=\"fa fa-${web}\"></div></a>`;
      }
      content += "</div>"
    }

    content += "</td>"
    if(i!=0 && (i+1)%4==0){
      content += "</tr><tr>";
    }
  }
  content += "</tr>";
  document.getElementById("table").innerHTML = document.getElementById("table").innerHTML + content;
  if(window.innerWidth <= 800 && window.location.pathname == "/projects/")
    document.getElementsByClassName('footer')[0].style.position = "relative";
}
