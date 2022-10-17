let myLeads = []

let inputBtn = document.getElementById("input-btn");
let inputEl = document.getElementById("input-el");
let deleteBtn = document.getElementById("delete-btn");
let tabBtn = document.getElementById("tab-btn");

const ulEl = document.getElementById("ul-el");
const localStorageLeads = JSON.parse(localStorage.getItem("myLeads"));

inputBtn.addEventListener("click", clicked);
deleteBtn.addEventListener("dblclick", deleteAll);
tabBtn.addEventListener("click", tabButton);

if(localStorageLeads){
    myLeads = localStorageLeads;
    render(myLeads);
}

function render(leads){
    let list = "";
    
    for(i = 0; i<leads.length; i++){
        // list += "<li>" + "<a href =" + myLeads[i] + "target = '_blank'>" + myLeads[i] +"</a>" + "</li>";
        list += 
        `<li>
            <a href = '${leads[i]}' target = '_blank'> ${leads[i]} </a>
        </li>`;
    }
    ulEl.innerHTML = list;
    
}

function deleteAll(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
}

function clicked(){
    let val = inputEl.value;
    myLeads.push(val);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    
}

function tabButton(){
    chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads) );
        render(myLeads);
    })
}


