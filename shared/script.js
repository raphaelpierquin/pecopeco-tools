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

function addCut(cut) {
  var t = document.querySelector('#line-to-repeat');
  var line = document.importNode(t.content, true);
  line.querySelectorAll('a')[0].href = cut.href;
  var url = new URL(cut.href, document.location.href).toString();
  var cmd = oneliner(url, cut.id);
  line.querySelectorAll('a')[1].setAttribute("title", cmd);
  line.querySelectorAll('a')[1].onclick = function(e) {
    copyTextToClipboard(cmd);
    e.preventDefault();
  }
  line.querySelectorAll('td').forEach(function(td) {
    if (td.dataset.property) {
      td.textContent=cut[td.dataset.property]
    }
  });
  document.querySelector('tbody').appendChild(line);
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch(err) {
    console.error('Error in copying text: ', err);
  }
}

function oneliner(url, id) {
  return "curl " + url + " | adb shell 'cat > /sdcard/Android/data/am.benth.pecopeco/files/PecoPeco/cuts/" + id + ".json'"
}

document.onreadystatechange = function () {
  if (document.readyState === 'interactive') {
    getJSON('cuts.json', function(cuts) {
      cuts.forEach(addCut);
    });
  }
}

