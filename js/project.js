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
}
