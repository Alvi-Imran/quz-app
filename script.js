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


let storeData = []; // store data for APIs
let count = 0; // like index 
let score = 0; // result score
let getAns = ""; // store Anwer

function control() {
    cover.style.display = "none";
    playBox.style.display = "flex";
    playCover.style.display = "block";

    count = 0;
    score = 0;
    getAns = "";

}

function gk(){
    control()

    fetch("gk.json")
    .then(response => response.json())
    .then(data => {
        storeData = data;
        showques()
    })
    .catch(error => alert("error " + error));
}

function html(){
    control()

    fetch("html.json")
    .then(response => response.json())
    .then(data => {
        storeData = data;
        showques();
    })
    .catch(error => alert("error " + error))
}

function css(){
    control()

    fetch("css.json")
    .then(response => response.json())
    .then(data => {
        storeData = data;
        showques();
    })
    .catch(error => alert("error " + error))
}


function js() {
    control();

    fetch("javascript.json")
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
            if (el.demo == "") {
                demo.textContent = "";
            } else {
                demo.style.opacity = 0.7;
                demo.style.paddingTop = "10px";
                demo.textContent = `Demo: ${el.demo}`
            }
            a.textContent = ` (A) ${el.a};`;
            b.textContent = ` (B) ${el.b};`;
            c.textContent = ` (C) ${el.c};`;
            d.textContent = ` (D) ${el.d};`;
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
    }
}

function result() {
    playCover.style.display = "none";
    playBox.style.width = "30%";
    playBox.style.height = "30vh";
    displayResult.style.display = "block";
    displayResult.innerHTML = `<h2>your score is <span id="score">${score}</span></h2>`
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
    displayResult.style.display = "none";

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



