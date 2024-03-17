const counter = document.getElementsByClassName("counter")[0];
const milliSecCounter = document.getElementsByClassName("milli-sec")[0];
const startBtn = document.getElementsByClassName("start")[0];
const btnContainer = document.getElementsByClassName("cta-btn")[0];
const progress = document.getElementsByClassName("outer-circle")[0];
const lapList = document.getElementsByClassName("lap-list")[0];

let [minut, second, mSec] = [0, 0, 0];
let digit_Min;
let digit_Sec;
let digit_M_Sec;

const startCounter = () => {
    if (mSec != 99) {
        ++mSec;
    }
    else {
        mSec = 0;
        if (second != 59) {
            ++second; 
            let progressPercent = (second / 60) * 360;
            // console.log(progressPercent)
            // progress.style.background = `conic-gradient(rgb(250, 3, 3) ${progressPercent}deg, aliceblue 0deg)`;
            progressBar(progressPercent);
        }
        else {
            second = 0;
            progressBar(360);
            if (minut != 59) {
                ++minut;
            }
            else {
                minut = 0;
            }
        }
    }

    digit_Min = minut < 10 ? `0${minut}` : minut;
    digit_Sec = second < 10 ? `0${second}` : second;
    digit_M_Sec = mSec < 10 ? `0${mSec}` : mSec;

    counter.textContent = digit_Min + ":" + digit_Sec;
    milliSecCounter.innerHTML = "." + digit_M_Sec;
}

function progressBar(percent) {
    progress.style.background = `conic-gradient(rgb(250, 3, 3) ${percent}deg, aliceblue 0deg)`;
    progress.style.transition = "background 0.5s linear";
}

let lapBtn = document.createElement("button");
lapBtn.setAttribute("class", "btn");
let prependBtn;
let intervalID;
let isCountStarted = false;
let islapBtnCreated = false; 
let isResetBtn = false;

let prev_lap_in_milliSec = 0;
let diffValue;
let lapNumberVar = 0;

startBtn.addEventListener("click", () => {
    if (!isCountStarted) {
        isCountStarted = true;
        intervalID = setInterval(startCounter, 10);
        startBtn.textContent = "Pause";
        lapBtn.textContent = "Lap";
        if (!islapBtnCreated) {
            // prependBtn = document.querySelector("#lapBtn");
            // prependBtn.textContent = "Lap";
            btnContainer.prepend(lapBtn);
            islapBtnCreated = true;
        }
        lapBtn.addEventListener("click", () => {
            lap()
        })
    }
    else {
        console.log(lapBtn)
        clearInterval(intervalID);
        isCountStarted = false;
        startBtn.textContent = "Resume";
        lapBtn.textContent = "Reset";
        isResetBtn = true;
        if (isResetBtn) {
            lapBtn.addEventListener("click", () => {
                [minut, second, mSec, lapNumberVar, isResetBtn] = [0, 0, 0, 0, false];
                counter.textContent = "00:00";
                milliSecCounter.innerHTML = ".00";
                progressBar(1);
                lapList.innerHTML = '';
                lapBtn.remove();
                startBtn.textContent = "Start";
                
            })
        }
    }

})


// 1 sec = 1000 milli sec | 1 min = 60 sec = 60000 milli sec

function lap() {
    // console.log(presentLapTemp)
    // for (let i = 0; i < presentLapTemp.length; i++) {
    //     if (presentLapTemp[i] > prevLapTemp[i]) {
    //         diffValue[i] = presentLapTemp[i] - prevLapTemp[i];
    //     }
    //     else {
    //         diffValue[i] = prevLapTemp[i] - presentLapTemp[i];
    //     }

    let lapLi = document.createElement("li");
    lapLi.setAttribute("class", "list")
    let lapNumber = document.createElement("span");
    let lapData = document.createElement("span");
    lapNumber.textContent = lapNumberVar < 9 ? `0${++lapNumberVar}` : ++lapNumberVar;
    lapData.textContent = digit_Min + ":" + digit_Sec + "." + digit_M_Sec;
    lapLi.append(lapNumber, lapData);
    lapList.prepend(lapLi);

    let diffInMilliSec = timeStamp_to_milliSec(minut, second, mSec) - prev_lap_in_milliSec;
    console.log(milliSec_to_timeStamp(diffInMilliSec));
    prev_lap_in_milliSec = diffInMilliSec;

}

function timeStamp_to_milliSec(...timeStapm) {
    // console.log(timeStapm[1])
    let milliSecond = Number(timeStapm[0] * 60 * 1000 + timeStapm[1] * 1000 + timeStapm[2] * 10);
    return milliSecond;
}

function milliSec_to_timeStamp(milliSecond) {
    let totalSecond = milliSecond / 1000;
    let m = Math.floor(totalSecond / 60) ;
    let s = (milliSecond% 1000) / 10;
    return singleDigit_to_doubleDigit(m) + ":" + singleDigit_to_doubleDigit(totalSecond);
}

function singleDigit_to_doubleDigit(number) {
    return number < 10 ? `0${number}` : number;
}

// milliSec_to_timeStamp(3720); //0,3,72

