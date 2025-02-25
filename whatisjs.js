var url_ip = "http://127.0.0.1:8000";
var msgcount = 0;
function dob_msg(mssg) {
    var alert = document.getElementById('alert');
    alert.querySelector('*').innerText = mssg;
    alert.style.display = 'block';
    msgcount += 1;
    setTimeout(() => {
        if (msgcount == 1) {
            alert.style.display = 'none', 2000;
        }
        msgcount -= 1;
    }, 2000)
}
//var url_ip = "https://magical-gecko-trivially.ngrok-free.app";
function copyy() {
    var text = document.getElementById("left");
    text.select();
    document.execCommand("copy");
    document.getSelection().removeAllRanges();
    dob_msg("Скопировано");

}
function copyy2() {
    var text = document.getElementById("right");
    text.select();
    document.execCommand("copy");
    document.getSelection().removeAllRanges();
    dob_msg("Скопировано");
}
function del() {
    var val = document.getElementById("left");
    val.value = '';
    dob_msg("Очищено");
}

function cend(t_str) {
    var pole = document.getElementById("number").value;
    var val = document.getElementById("left").value;
    update_storage(val);
    var text = document.getElementById("right");

    dob_msg("Отправлено");

    /*fetch(`http://localhost:8000/${pole}/${val}`, {mode: "no-cors"});*/
    /*query({"inputs": `Сократи следующий текст на ${pole} процентов:\n${val}. \n Сокращённый текст на русском языке: `}).then((response) => {
        str = JSON.stringify(response)
        text.innerHTML = "" + str.slice(40 + val.length, -3);
    });*/
    var len = t_str.length;
    var res = fetch(
        neromodel,
        {
            headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ "inputs": t_str }),
        }
    ).then((res) => {
        if (!res.ok) {
            throw new Error('Error occurred!');
        }
        return res.json();
    })
        .then(data => data[0])
        .then(dat => text.innerHTML = dat.generated_text.slice(len + 1)).catch((err) => {
            dob_msg('Повторите запрос ещё раз или используйте другую модель\n' + err);
        });
}
function apisokr() {
    cend(`Суммаризируй следующий текст на ${document.getElementById("number").value} процентов:\n${document.getElementById("left").value}. \n Сокращённый текст на русском языке: `);
}
function apiper() {
    cend(`Перефразируй следующий текст :\n${document.getElementById("left").value}. \n Перефразированный текст на русском языке: `);
}

function sync1() {
    var pole = document.getElementById("number");
    var polz = document.getElementById("range");
    polz.value = pole.value;
}
function sync2() {
    var pole = document.getElementById("number");
    var polz = document.getElementById("range");
    pole.value = polz.value;
}


let speechSynthesis = window.speechSynthesis;
let utterance;
var isSpeak1 = false;
var isSpeak2 = false;
utterance = new SpeechSynthesisUtterance();
utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === "ru-RU" && voice.name.includes("Female"));
utterance.lang = "ru-RU";
utterance.pitch = 1; // Высота голоса
utterance.rate = 2; // Скорость речи
utterance.addEventListener("end", () => { isSpeak1 = false; isSpeak2 = false; console.log(1) })
function speakText1() {
    window.speechSynthesis.cancel();
    console.log(isSpeak1)
    if (isSpeak1) {
        isSpeak1 = false;
    }
    else {
        isSpeak1 = true;
        let text = document.getElementById("left").value;
        utterance.text = text;
        speechSynthesis.speak(utterance);
    }
}
function speakText2() {
    window.speechSynthesis.cancel();
    console.log(isSpeak2)
    if (isSpeak2) {
        isSpeak2 = false;
    }
    else {
        isSpeak2 = true;
        let text = document.getElementById("right").value;
        utterance.text = text;
        speechSynthesis.speak(utterance);
    }
}

//var url_ip = "https://magical-gecko-trivially.ngrok-free.app";
async function get_ip() {
    var ipi;
    await fetch("https://api.ipify.org?format=json")
        .then(a => a.json())
        .then(a => ipi = a.ip);
    fetch(url_ip + "/ip/" + ipi, {
        headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" }
    });
}
get_ip();


let sostoanie = true;
let area1 = document.getElementById('left');
let area2 = document.getElementById('file');
function files() {
    if (sostoanie) {
        area1.style.display = 'none';
        area2.style.display = 'flex';
        sostoanie = false;
    }
    else {
        area1.style.display = 'block';
        area2.style.display = 'none';
        sostoanie = true;
    }
}

var fileinput = document.getElementById("fileinput");
var confirm_button = document.getElementById("confirm_button");
function fileokno() {
    fileinput.click();
}
fileinput.addEventListener("change", offer_confirm);
function offer_confirm() {
    if (fileinput.files.length) {
        confirm_button.style.display = 'block';
        confirm_button.innerText = "Отправить файл\n" + fileinput.files[0].name;
    }
    else {
        confirm_button.style.display = 'none';
    }
}

function uploadwav() {
    /*var form = new FormData();
    form.append('file', fileinput.files[0]);
    fetch(url_ip + "/wav/", {
        headers: {"ngrok-skip-browser-warning": "true" },
        method: 'POST',
        body: form
    });*/
    var reader = new FileReader();
    reader.onload = () => {
        var raw = reader.result;
        fetch(url_ip + "/wav/" + raw, {
            headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" }
        })
    }
    dob_msg("Отправка файла...");
    reader.readAsText(fileinput.files[0]);
}

function history() {
    var div = document.getElementById("history");
    div.innerHTML = "";
    for (var i = Number(window.localStorage.getItem('count')) - 1; i >= 0; i--) {
        div.innerHTML += '<div class="borderus article active shadowus middle-button" onclick="history_paste(event)"><img src="sdvg/Edit16Filled.svg"><span>' + window.localStorage.getItem(i) + "</span></div";
    }
    var articles = div.querySelectorAll('.article');
    for (var i = 0; i < Number(window.localStorage.getItem('count')); i++) {
        if (articles[i].querySelector('span').offsetHeight > 380) {
            articles[i].innerHTML = articles[i].innerHTML + `<div class="shadow-down"></div>
                <button class="history_down_btn" onclick="history_down(this)"></button>`;
        }
    }
}
function update_storage(text) {
    var count = Number(window.localStorage.getItem('count'));
    window.localStorage.setItem('count', count + 1);
    window.localStorage.setItem(count, text);
    history();
}
function history_clear() {
    var theme = window.localStorage.getItem("theme");
    localStorage.clear();
    window.localStorage.setItem("theme", theme);
    window.localStorage.setItem("guide", "yes");
    history();
}
function history_down(el) {
    var parent = el.parentNode;
    parent.classList.add('show_p');
    parent.querySelectorAll('.shadow-down, .history_down_btn').forEach(function (elem) { elem.remove() })
}
function history_paste(el) {
    if (el.target.matches('span')) {
        var val = document.getElementById("left");
        val.value = el.target.innerText;
    }
    dob_msg("Вставено в поле");
}
function random_text() {
    document.getElementById("left").value = texts[Math.floor((Math.random() * texts.length))];
}
function question_onload() {
    if (!("guide" in window.localStorage)) {
        document.getElementById("title_image").click();
        window.localStorage.setItem("guide", "yes");
    }
}