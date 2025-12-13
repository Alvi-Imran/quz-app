let cover = document.querySelector(".cover");
let playBox = document.querySelector("#play-box");
let playCover = document.getElementById("play-cover");
let q = document.querySelector("#q");
let demo = document.querySelector("#demo");
let a = document.querySelector("#a1");
let b = document.querySelector("#b1");
let c = document.querySelector("#c1");
let d = document.querySelector("#d1");
let displayResult = document.getElementById("result");


let storeData = [];
let count = 0;
let score = 0;
let getAns = "";

function js() {
    cover.style.display = "none";
    playBox.style.display = "flex";
    playCover.style.display = "block";

    playBox.style.width = "70%";
    playBox.style.height = "50vh";

    count = 0;
    score = 0;
    getAns = "";

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            storeData = data;
            showques()
        })
        .catch(error => console.log("Error " + error))
}

// show question function 
function showques() {
      storeData.forEach((el, ind) => {
        if (ind == count) {
            q.innerHTML = `Q${el.id} ${el.q}<br>`;
            if(el.demo == ""){
                demo.innerHTML = "";
            }else{
                demo.style.opacity = 0.7;
                demo.style.paddingTop = "10px";
                demo.innerHTML = `Demo: ${el.demo}`
            }
            a.innerHTML = ` (A) ${el.a};`;
            b.innerHTML = ` (B) ${el.b};`;
            c.innerHTML = ` (C) ${el.c};`;
            d.innerHTML = ` (D) ${el.d};`;
            getAns += `${el.ans}`
        }
    })
}

// check input value 
function checkinput() {
    let select = document.querySelector('input[name="option_ans"]:checked');
    if (!select) {
        return null;
    }
    return select.id.toUpperCase();
}

function remocheckedinput() {
    document.querySelectorAll('input[name="option_ans"]').forEach(el => {
        el.checked = false;
    })
}

// show result function
function showResult() {
    let ch = checkinput();
    if (ch === getAns) {
        score++
        console.log(score);
    }
}

function result() {
    playBox.style.width = "30%";
    playBox.style.height = "30vh";
    playCover.style.display = "none";
    displayResult.style.display = "block";
    displayResult.innerHTML = `<h2>your score is <span id="score">${score}</span>😢</h2>`
}



// submit function
function sub() {
    showResult()

    getAns = "";
    count++

    if (count >= storeData.length) {
        result()
    }

    remocheckedinput();
    showques();
}

function exit() {
    cover.style.display = "flex";
    playBox.style.display = "none";
    displayResult.style.display = "none"

    score = 0;
    count = 0;
    getAns = "";
    storeData = [];

    q.innerHTML = "";
    demo.innerHTML = "";
    a.innerHTML = "";
    b.innerHTML = "";
    c.innerHTML = "";
    d.innerHTML = "";
    remocheckedinput();
}



