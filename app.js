var button = document.getElementById('save');

// LocalStorage Data Fetcher
var appendToTable = (dataToAppend) => {
  var newData = document.querySelector(".data-group");
  var newDiv = document.createElement("div");
  newDiv.setAttribute('class', 'data-item-1');
  for(let objData in dataToAppend) {
      var newSpan = document.createElement("span");
      newSpan.innerHTML = dataToAppend[objData];
      newDiv.appendChild(newSpan);
  }
  newData.appendChild(newDiv);
}

// LocalStorage Coverage
if(localStorage.app) {
    var nodeMain = JSON.parse(localStorage.app);
    nodeMain.forEach(function(nodeMain) {
      appendToTable(nodeMain);
    })

} else {
  nodeMain = [];
}

// On submission of the form
button.addEventListener('click', function() {
  var dataList = document.getElementById('form');
  var nodeObj = {};
  var val = [];
  var err = "<p id='errPara'> Please fill the details </p>";

  // validator check
  var errPara = document.querySelectorAll('#errPara');
  if(errPara) {
    for(let para of errPara) {
      para.remove();
    }
  }

  // fetching data and validation
  for(let data of dataList) {
    if (data.type == "text" && data.value !== "") {
      nodeObj[data.name] = data.value;
    } else if(data.type == "text") {
      val.push(data.name);
    }
  }

  if(dataList.gender.value) {
    nodeObj["gender"] = dataList.gender.value;
  } else {
    val.push("gender");
  }

  // after or for validation Promise
  validationCheck = new Promise(function(resolve, reject) {
        if (val.length >= 1) {
          reject(val);
        } else {
          resolve(nodeObj);
        }
      });

  validationCheck.then(accepted, rejected);
  function accepted(data) {
    nodeMain.push(data);
    localStorage.app = JSON.stringify(nodeMain);
    appendToTable(data);
  }

  function rejected(erData) {
      for(let erElement of erData) {
        erElement = document.querySelector("input[name='" + erElement + "']");
        if(erElement.parentNode.lastElementChild.id != "errPara") {
          erElement.parentNode.insertAdjacentHTML('beforeEnd', err) ;
        }
      }
  }
});
