const focusBtn = document.getElementById('focusTimeShow');
const breakBtn = document.getElementById('breakTimeShow');
const minutesEl = document.getElementById('minutes');
const secondEl = document.getElementById('seconds');
let minute = 25;
let second = 0;
let isStart = false;
let isFocusTime = true;
let intervalId;
const focusTimeInput = document.getElementById('focusTimeInput');
const breakTimeInput = document.getElementById('breakTimeInput');

const focusBtnClick = () => {
    if (!isFocusTime) {
        isStart = false;
        isFocusTime = true;
        clearInterval(intervalId);
        breakBtn.className = '';
        focusBtn.className = 'activeBtn';
        // startAndStopBtn.className = 'fa-solid fa-play';
        // document.body.style.backgroundColor = '#4A412A';
        // document.querySelector('.custom-container').style.backgroundColor = 'rgba(255, 255, 255, 0.11)';
        minutesEl.innerText = Number(focusTimeInput.value) < 10 ? `0${focusTimeInput.value}` : focusTimeInput.value;
        second = 0;
        secondEl.innerText = '00';
        minute = Number(focusTimeInput.value)
    }
}
focusBtn.addEventListener('click', focusBtnClick)

const breakBtnClick = () => {
    if (isFocusTime) {
        isStart = false;
        isFocusTime = false;
        clearInterval(intervalId);
        focusBtn.className = '';
        breakBtn.className = 'activeBtn';
        // startAndStopBtn.className = 'fa-solid fa-play';
        // document.getElementById('breakTimeShow').classList.add('textColrChng')
        // document.body.style.backgroundColor = '#016a6a';
        // document.querySelector('.custom-container').style.backgroundColor = 'rgba(255, 255, 255, 0.20)';
        minutesEl.innerText = Number(breakTimeInput.value) < 10 ? `0${breakTimeInput.value}` : breakTimeInput.value;
        second = 0;
        secondEl.innerText = '00';
        minute = Number(breakTimeInput.value);
    }
}

breakBtn.addEventListener('click', breakBtnClick)

const timer = () => {
    if (second === 0) {
        minute--;
        second = 60;
    }
    if (second !== 0) {
        second--;
    }
    if (isFocusTime && !minute && !second) {
        Swal.fire({ text: "Your working time is complete now its break time", timer: 5000 }).then(() => {
            breakBtnClick();
            startAndStop();
        })
    }

    if (!isFocusTime && !minute && !second) {
        Swal.fire({ text: "Your break time is complete now its working time", timer: 5000 }).then(() => {
            focusBtnClick();
            startAndStop();
        })

    }

    minutesEl.innerText = minute < 10 ? `0${minute}` : minute;
    secondEl.innerText = second < 10 ? `0${second}` : second;
}

const startAndStopBtn = document.getElementById('startAndStopBtn');
const startAndStop = () => {
    if (!isStart) {
        isStart = true;
        intervalId = setInterval(() => {
            timer()
        }, 1000);
        startAndStopBtn.className = 'fa-solid fa-pause';
    } else {
        isStart = false;
        clearInterval(intervalId);
        startAndStopBtn.className = 'fa-solid fa-play';
    }
}
startAndStopBtn.addEventListener('click', startAndStop);

document.getElementById('resetTime').addEventListener('click', () => {
    if (isFocusTime) {
        minute = focusTimeInput.value;
    } else {
        minute = breakTimeInput.value;
    }
    isStart = false;
    second = 0;
    clearInterval(intervalId);
    startAndStopBtn.className = 'fa-solid fa-play';
    minutesEl.innerText = minute < 10 ? `0${minute}` : minute;
    secondEl.innerHTML = `0${second}`;
});

focusTimeInput.value = 25;
breakTimeInput.value = 5;

const increment_focusInputVal = () => {
    let focusInputVal = Number(focusTimeInput.value);
    focusInputVal += 1;
    focusTimeInput.value = focusInputVal;
}
document.getElementById('focusTimeInc').addEventListener('click', increment_focusInputVal);

const increment_breakInputVal = () => {
    let breakInputVal = Number(breakTimeInput.value);
    breakInputVal += 1;
    breakTimeInput.value = breakInputVal;
}
document.getElementById('breakTimeInc').addEventListener('click', increment_breakInputVal);


const decrement_focusInputVal = () => {

    let focusInputVal = Number(focusTimeInput.value);
    if (focusInputVal > 1) {
        focusInputVal -= 1;
    }
    focusTimeInput.value = focusInputVal;
}
document.getElementById('focusTimeDec').addEventListener('click', decrement_focusInputVal);


const decrement_breakInputVal = () => {
    let breakInputVal = Number(breakTimeInput.value);
    if (breakInputVal > 1) {
        breakInputVal -= 1;
    }
    breakTimeInput.value = breakInputVal;
}
document.getElementById('breakTimeDec').addEventListener('click', decrement_breakInputVal);

const timeChng = () => {
    if (isFocusTime) {
        minute = Number(focusTimeInput.value);
        minutesEl.innerText = minute < 10 ? `0${minute}` : minute;
    } else {
        minute = Number(breakTimeInput.value);
        minutesEl.innerText = minute < 10 ? `0${minute}` : minute;
    }
    second = 0;
    secondEl.innerText = '00';
    isStart = true;
    startAndStop();
}
document.getElementById('saveTimeChnge').addEventListener('click', timeChng);


document.getElementById('resetTimeChnge').addEventListener('click', () => {
    isStart = true;
    startAndStop();
    focusTimeInput.value = 25;
    breakTimeInput.value = 5;
    if (isFocusTime) {
        minute = 25;
        minutesEl.innerText = focusTimeInput.value;
    } else {
        minute = 5;
        minutesEl.innerText = `0${breakTimeInput.value}`;
    }
    second = 0;
    secondEl.innerText = '00'
})