requirejs(["https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js"], loadChangelog);

function httpGet(theUrl, callback) {
  try {
  if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  else {// code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.info("Got web info from " + theUrl);
      callback(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET", theUrl, false);
  xmlhttp.send();
} catch (error) {
  console.error(error);
}
}

function loadChangelog() {
  changelog = "";
  httpGet("https://raw.githubusercontent.com/MurkyYT/CSAuto/master/Docs/FullChangelog.MD", function (resp) { changelog = resp; });
  if (changelog == "") {  // If not loaded
    const readElsewhereButton = document.body.getElementsByTagName("noscript").item(0);
    document.body.insertAdjacentHTML('beforeend', readElsewhereButton.innerHTML);
    return;
  }
  converter = new showdown.Converter();
  html = converter.makeHtml(changelog);
  document.body.insertAdjacentHTML('beforeend', html)
}