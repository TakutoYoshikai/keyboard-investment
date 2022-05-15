
function onChange() {
  const price = document.getElementById("price").value;
  const hourlyWage = document.getElementById("hourly-wage").value;
  const minutes = document.getElementById("minutes").value;
  const years = document.getElementById("years").value;
  const days = years * 251.0;
  const diff = parseInt(days * minutes * (hourlyWage / 60.0));
  const gain = diff - price;
  if (gain < 0) {
    document.getElementById("result").innerText = `${-1 * gain}円損をします`;
  } else {
    document.getElementById("result").innerText = `${gain}円得をします`;
  }
}

function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) throw new Error("URL QUERY ERROR");
  if (!results[2]) throw new Error("URL QUERY ERROR");;
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function initialize() {
  let price, hourlyWage, minutes, years;
  try {
    price = parseInt(getParam("price"));
    hourlyWage = parseInt(getParam("hourly"));
    minutes = parseInt(getParam("minutes"));
    years = parseInt(getParam("years"));
  } catch(err) {
    onChange();
    return;
  }
  document.getElementById("price").value = price;
  document.getElementById("hourly-wage").value = hourlyWage;
  document.getElementById("minutes").value = minutes;
  document.getElementById("years").value = years;

  onChange();
}

function copyUrl() {
  const price = document.getElementById("price").value;
  const hourlyWage = document.getElementById("hourly-wage").value;
  const minutes = document.getElementById("minutes").value;
  const years = document.getElementById("years").value;
  const url = `https://takutoyoshikai.github.io/keyboard-investment/?price=${price}&hourly=${hourlyWage}&minutes=${minutes}&years=${years}`
  const pre = document.createElement('pre');
  pre.style.webkitUserSelect = 'auto';
  pre.style.userSelect = 'auto';
  pre.textContent = url;

  document.body.appendChild(pre);
  document.getSelection().selectAllChildren(pre);
  const result = document.execCommand('copy');

  document.body.removeChild(pre);
  alert("共有URLコピーしました。このURLを開くとこの画面の数値がそのまま表示されます。");
}
