const listElements = document.getElementById("people");
document.getElementById("people").addEventListener("click", aboutPerson);

function compareValues(key, order = "asc") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }
    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}

function aboutPerson(){}

function displaySearch(search) {
  const itemList = JSON.parse(localStorage.getItem("items"));
  const cleanList = [];
  for (x in itemList) {
    cleanList.push(itemList[x]);
  }
  console.log(cleanList);
  for (x in cleanList) {
    if (cleanList[x].sell_average == 0) {
      cleanList[x].diffrence = 0;
    } else if (cleanList[x].buy_average == 0) {
      cleanList[x].diffrence = 0;
    } else {
      cleanList[x].diffrence =
        cleanList[x].sell_average - cleanList[x].buy_average;
    }
  }
  cleanList.sort(compareValues("diffrence", "desc"));
  for (i = 0; i < 300; i++) {
    if (cleanList[i].name.toLowerCase().includes(search)) {
      listElements.appendChild(displayResults(cleanList[i]));
    }
  }
}


function displayResults(item) {
  //console.log(item);
  const display = document.createElement("li");
  display.innerHTML = `
  <div class="card mb-3" style="max-width: 700px; margin: auto">
  <div class="row g-0">
    <div class="col-md-2">
    <img src="https://secure.runescape.com/m=itemdb_oldschool/1607338866869_obj_big.gif?id=${item.id}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">Profit margin: ${new Intl.NumberFormat().format(item.diffrence)} gp ------  Buy Price: ${new Intl.NumberFormat().format(item.buy_average)} gp </p>
        <p class="card-text">Med Price: ${new Intl.NumberFormat().format(item.overall_average)} gp -----   Sell Price: ${new Intl.NumberFormat().format(item.sell_average)} gp </p>
      </div>
    </div>
  </div>
</div>
  `;
  return display;
}



function getData() {
  $.getJSON(
    "https://jsonp.afeld.me/?url=" +
      encodeURIComponent("https://rsbuddy.com/exchange/summary.json"),
    function (data) {
      //if (data != )
      console.log(data);
      const parsed = JSON.parse(data.contents);
      const newJson = JSON.stringify(parsed);
      localStorage.setItem("items", newJson);
    }
  );
}

// function getData() {
//   fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://rsbuddy.com/exchange/summary.json')}`)
//   .then(response => {
//     if (response.ok) return response.json()
//     throw new Error('Network response was not ok.')
//   })
//   .then(data => {
//       const parsed = JSON.parse(data.contents);
//       const newJson = JSON.stringify(parsed);
//       localStorage.setItem("items", newJson);})
// }
// function getData() {
//   fetch(`https://jsonp.afeld.me/?url=https://rsbuddy.com/exchange/summary.json`)
//   .then(response => {
//     if (response.ok) return response.json()
//     throw new Error('Network response was not ok.')
//   })
//   .then(data => {
//       const parsed = JSON.parse(data.contents);
//       const newJson = JSON.stringify(parsed);
//       localStorage.setItem("items", newJson);})
// }




function search() {
  getData();
  listElements.innerHTML = "";
  displaySearch(document.getElementById("search").value);
}
function refreshPage() {
  getData();
  listElements.innerHTML = "";
  displaySearch("");
}
function potions() {
 getData();
  listElements.innerHTML = "";
  displaySearch("potion");
}

function sets() {
  getData();
  listElements.innerHTML = "";
  displaySearch("set");
}

refreshPage();
