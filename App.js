let SelectMenu = document.querySelectorAll("select");
let SelectionBox = document.querySelector(".SelectionBox");
let MsgDisplay = document.getElementById("MsgDisplay");
let Closebtn = document.getElementById("Closebtn");
let MsgTitle = document.getElementById("MsgTitle")
let Msg = document.getElementById("Msg")
let SetAlarmBtn = document.querySelector("button");
let CurrentTime = document.querySelector(".CurrentTime");
let StopAlarmButton = document.getElementById("StopAlarmButton");

let AlarmTime;
let isAlarmSet = false;
let AlarmTone = new Audio("./LoudAlarmTone.mp3");

Closebtn.addEventListener("click", () => {
    MsgDisplay.style.display = "none"
})



// Loop for Hours
for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    SelectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Loop for Minute
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    SelectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}


for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM"
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${ampm}">${ampm}</option>`;
    SelectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}



setInterval(() => {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    CurrentTime.innerHTML = `${h} : ${m} : ${s} ${ampm}`;

    if (AlarmTime == `${h} : ${m} ${ampm}`) {
        AlarmTone.play();
        AlarmTone.loop = true;
    }
}, 1000)



SetAlarmBtn.addEventListener("click", setAlarm);
function setAlarm() {
    let time = `${SelectMenu[0].value} : ${SelectMenu[1].value} ${SelectMenu[2].value}`;

    if (time.includes("Hours") || time.includes("Minute") || time.includes("AM/PM")) {
        MsgDisplay.style.display = "flex";
        MsgTitle.innerHTML = ` Warning <i class="fa-solid fa-triangle-exclamation"></i>`;
        Msg.innerHTML = `Kindly Select The Valid Time For Set The Alarm.We Can't Set The Alarm For This Time.
    <span>${time}</span> `;
    }
    else {
        // isAlarmSet = true;
        AlarmTime = time;
        MsgDisplay.style.display = "flex";
        MsgTitle.innerHTML = `success <i class="fa-solid fa-check-double"></i>`;
        Msg.innerHTML = `Your Alarm Set Successfully.<span>${time}</span>`;
        SelectionBox.classList.add("Disable");
        SetAlarmBtn.style.display = "none";
        StopAlarmButton.style.display = "block";
    }
}

StopAlarmButton.addEventListener("click", () => {
    AlarmTime = 0;
    AlarmTone.pause();
    StopAlarmButton.style.display = "none";
    SelectionBox.classList.remove("Disable");
    SetAlarmBtn.style.display = "block";

})