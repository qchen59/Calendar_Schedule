
// List to store events
let events = [];
var currentm = 3;
var year = 2022;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = [31,28,31,30,31,30,31,31,30,31,30,31];
const daysl = [31,29,31,30,31,30,31,31,30,31,30,31];


window.onload = (loadCalender) => {
    getCalender();
};

// Get the current calender information
function getCalender(){
    const calender = new Object();
    let month = months[currentm];
    document.getElementById('month').innerHTML = month;
    document.getElementById('year').innerHTML = year;
    if (year % 4 == 0){
        numdays = daysl[currentm];
    } else {
        numdays = days[currentm];
    }

    // Generate calendar list
    let list = document.getElementById("dayList");
    // Clean the list first
    list.innerHTML = "";
    for (let i = 1; i <= numdays; i++) {
        var li = document.createElement("li");
        var bu = document.createElement("button");
        bu.innerText = i;
        bu.addEventListener("click", function(event) {
            buttonsControl(event.target);
          }, false);
        li.appendChild(bu);
        list.appendChild(li);
        
      } 
}

// Button onclick
function buttonsControl(button) {
    // set other buttons to inactive
    const ul = document.getElementById('dayList');
    const listItems = ul.getElementsByTagName('span');
    for (let i = 0; i <= listItems.length - 1; i++) {
        listItems[i].className = "";
    }
    // set current button to active
    var parent = button.parentNode;
    var wrapper = document.createElement("span");
    wrapper.className = "active";
    parent.replaceChild(wrapper, button);
    wrapper.appendChild(button);
    let mon = currentm + 1
    if(mon < 10){
        mon = "0"+mon
    }
    let da = button.innerText
    if(da < 10){
        da = "0"+da
    }
    getEventsByDate(year+"-"+mon+"-"+da);
}



// Previous month
function prev(){
    if(currentm == 0){
        currentm = 11;
        year--;
    } else{
        currentm--;
    }
    getCalender();
}



// Next month
function next(){
    if(currentm == 11){
        currentm = 0;
        year++;
    } else{
        currentm++;
    }
    getCalender();
}

// Add new event to the list
function addEvent() {
    let event = {
        id : events.length,
        name : document.getElementById("name").value,
        sdate : document.getElementById("sdate").value,
        edate : document.getElementById("edate").value,
        stime : document.getElementById("stime").value,
        etime : document.getElementById("etime").value,
        description : document.getElementById("description").value

    };
    let mes = document.getElementById("message")
    if(checkValid(event)){
        console.log(event);
        events.push(event);
        mes.innerText = "New event added successfully!";
        // Reset the form
        document.getElementById("frm1").reset();
    } else{
        console.log(event);
        console.log("Invalid start time and end time");
        mes.innerText = "Invalid start time and end time, please try again.";
    }

}

function getEventsByDate(date){

    var result = events.filter(event => event.sdate == date || event.edate == date || (event.sdate < date && event.edate > date) );
    let list = document.getElementById("eventsList")
    // clear current list:
    list.innerHTML = "";
    if(result.length == 0){
        var pa = document.createElement("p");
        pa.innerText = "You don't have any events on this day. \n Add a new one or enjoy your day!"
        list.appendChild(pa);
    }
    result.forEach(element => {
        var div = document.createElement("div");
        div.className = "vl";
        var cdiv = document.createElement("div");
        cdiv.className = "block";
        list.appendChild(div);
        div.appendChild(cdiv);

        let title = element.name;
        let des = element.description;
        let ti = element.sdate + " " + element.stime + " - " + element.edate + " " + element.etime;
        var titleE = document.createElement("h3");
        titleE.innerText = title;
        var desE = document.createElement("li");
        desE.innerText = des;
        var tiE = document.createElement("li");
        tiE.innerText = ti;

        cdiv.appendChild(titleE);
        cdiv.appendChild(desE);
        cdiv.appendChild(tiE);

    });
    
}

// Check if the start time and end time is valid
function checkValid(event){
    let valid = true;
    if (event.sdate > event.edate){
        valid = false;
    }
    if (event.sdate == event.edate){
        if(event.stime > event.etime){
            valid = false;
        }
    }
    return valid;
}


// Delete an event by id
function deleteEvent(id){
    events = events.filter(event => event.id == id);
}

