function getJSON(url, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", url, true);
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(JSON.parse(xobj.responseText));
        }
  };
  xobj.send();
}

function addCut(filename,url,cut) {
  var t = document.querySelector('#line-to-repeat');
  t.content.querySelector('a').href = url;
  t.content.querySelectorAll('td').forEach(function(td) {
    if (td.dataset.property) {
      td.textContent=cut[td.dataset.property]
    }
  });
  var clone = document.importNode(t.content, true);
  document.querySelector('tbody').appendChild(clone);
}

document.onreadystatechange = function () {
  if (document.readyState === 'interactive') {
    getJSON('cuts.json', function(cuts) {
      cuts.forEach(function(filename) {
        var url='cuts/' + filename;
        getJSON(url, function(cut) {
          addCut(filename,url,cut);
        });
      });
    });
  }
}

