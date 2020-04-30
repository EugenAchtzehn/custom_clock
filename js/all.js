// 要塞入 HTML 的位置
const mainNode = document.getElementById("main-content");

let cities = [
  { name: "台北", en: "TPE", timezone: "Asia/Taipei" },
  { name: "日本", en: "JPN", timezone: "Asia/Tokyo" },
  { name: "紐約", en: "NYC", timezone: "America/New_York" },
  { name: "舊金山", en: "SFC", timezone: "America/Los_Angeles" },
  { name: "倫敦", en: "LDN", timezone: "Europe/London" },
  { name: "瑞士", en: "CHE", timezone: "Europe/Zurich" },
  { name: "休士頓", en: "HOU", timezone: "America/Chicago" },
];

function updateAll(e) {
  // newCities 陣列會包含 cities 陣列還有由 new Date() 取回的各地時間
  let newCities = cities.map(function (cityObj) {
    let option = {
      day: "numeric", // "30"
      month: "short", // "Apr"
      year: "numeric", // "2020"
      hour: "2-digit", // "00"
      minute: "2-digit", // "00"
      hour12: false, // 24 時制
      timeZone: cityObj.timezone,
    };
    cityObj.date = new Date().toLocaleDateString("zh-TW", option);
    return cityObj;
  });

  let htmlStr = "";
  for (let i = 0; i < newCities.length; i++) {
    // 處理各地時間的字串，改成陣列
    let dateArray = newCities[i].date.split(" ");
    let localDate = dateArray.splice(0, 1);
    // 每三個 .col 加一個 .row
    if (i % 3 == 0) {
      htmlStr += `<div class="row mt-md-3">`;
    }
    htmlStr += `
            <div class="col-md">
                <div id="${newCities[i].en}_box" class="timebox text-center text-light py-3">
                    <h2 class="display-4 font-weight-bold">${newCities[i].name}
                    </h2>
                    <p class="h3">${localDate}</p>
                    <p class="display-3">${dateArray}</p>
                </div>
            </div>`;
    // .row 的關閉標籤
    if (i % 3 == 2 || i == newCities.length - 1) {
      htmlStr += `</div>`;
    }
  }
  mainNode.innerHTML = htmlStr;
}

// 一載入先執行一次
updateAll();

// 之後每五秒重整一次
window.setInterval(updateAll, 5000);
