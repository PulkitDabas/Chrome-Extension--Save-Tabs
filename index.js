let myLeads = [];
let getData = JSON.parse(localStorage.getItem("myleads"));

const textbox = document.getElementById("textbox");
const inputBtn = document.getElementById("inputSave");
const unordered = document.getElementById("unordered");
const deletebtn = document.getElementById("deleteAll");
const tabbtn = document.getElementById("tab");

function render(array) {
  let listItems = "";

  for (let i = 0; i < array.length; i++) {
    // unordered.innerHTML += "<li>" + myLeads[i] + "</li>"-----this can also be done with the creation of li element--------change the text content-------then add to ul------const li = document.createElement("li")-------li.textContent = myLeads[i]-------unordered.append(li)-------------------------------------------------------------------------------the method used in this code is to increse the efficiency of the code as DOM manipulation comes at a cost

    listItems +=
      `<li><a href = "${array[i]}" target = '_blank'>` + array[i] + "</a></li>";
  }
  unordered.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  myLeads.push(textbox.value);
  textbox.value = "";
  let stringForLocal = JSON.stringify(myLeads);
  localStorage.setItem("myleads", stringForLocal);
  render(myLeads);
});

deletebtn.addEventListener("click", function () {
  let confirmation = confirm("Do you want to clear");
  if (confirmation) {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
  }
});

tabbtn.addEventListener("click", function () {
  // console.log(tabs[0].url)
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    console.log(tabs[0].url);
    myLeads.push(tabs[0].url);
    let stringTab = JSON.stringify(myLeads);
    localStorage.setItem("mytab", stringTab);
    render(myLeads);
  });
});

if (getData) {
  myLeads = getData;
  render(myLeads);
}
