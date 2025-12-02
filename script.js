let cover = document.querySelector(".cover");
let playBox = document.querySelector("#play-box");
let q = document.querySelector("#q");
let demo = document.querySelector("#demo");
let a = document.querySelector("#a1");
let b = document.querySelector("#b1");
let c = document.querySelector("#c1");
let d = document.querySelector("#d1");

let storeData = [];
let count = 1;

function js() {
    cover.style.display = "none";
    playBox.style.display = "flex"

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            storeData = data
            showques()
        })
        .catch(error => console.log("Error " + error))
}

// show question function 
function showques() {

    let el = storeData[count - 1]
    q.innerHTML = `Q${el.id} ${el.q}`;
    a.innerHTML = ` (A) ${el.a};`
    b.innerHTML = ` (B) ${el.b};`
    c.innerHTML = ` (C) ${el.c};`
    d.innerHTML = ` (D) ${el.d};`
}

// check input value 
function check() {
    let select = document.querySelector('input[name="option_ans"]:checked');
    if (!select) {
        return null;
    }
    
    return select.id.toUpperCase();
}

function remochecked() {
    document.querySelectorAll('input[name="option_ans"]').forEach(el => {
        el.checked = false;
    })
}

// submit function
function sub() {
    let ch = check();
    console.log(ch);

    if (ch == null) {
        alert("plese select anwser");
    } else if (ch == "A" || ch == "B" || ch == "C" || ch == "D") {
        count++
    }


    remochecked()
    showques()
}




