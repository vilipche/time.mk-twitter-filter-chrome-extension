const elements = {
    nickname: null,
    stringInNickname: null,
    username: null,
    keyWords: null,
};

window.onload = () => {
    elements.nickname = document.getElementById("nickname");
    elements.stringInNickname = document.getElementById("stringInNickname");
    elements.username = document.getElementById("username");
    elements.keyWords = document.getElementById("keyWords");

    setEventListeners();
    setData();
};

function setEventListeners() {
    document.getElementById("submitData").addEventListener("click", storeData);
    document.getElementById("resetData").addEventListener("click", resetData);
    document.getElementById("keyWords").addEventListener("input", (event) => {
        event.target.value = event.target.value.toLowerCase();
    });
}
function storeData() {
    const data = {
        nickname: elements.nickname.value.replace(/\s*,\s*/g, ",").replace(/\t|\n|\r/g, ""), //remove spaces and new row
        stringInNickname: elements.stringInNickname.value.replace(/\s*,\s*/g, ",").replace(/\t|\n|\r/g, ""),
        username: elements.username.value.replace(/\s+/g, ""), //remove spaces and new row
        keyWords: elements.keyWords.value.replace(/\s*,\s*/g, ",").toLowerCase(), //avoid new row
    };

    // /  |\r\n|\n|\r/gm, ""
    chrome.storage.sync.set(data, () => {
        console.log("storeData", data);
    });
}

function resetData() {
    const data = {
        nickname: "",
        stringInNickname: "",
        username: "",
        keyWords: "",
    };

    for (let [key, value] of Object.entries(elements)) {
        value.value = "";
    }

    chrome.storage.sync.set(data, () => {
        console.log("resetData", data);
    });
}

function setData() {
    chrome.storage.sync.get(["nickname", "stringInNickname", "username", "keyWords"], (data) => {
        console.log("setData", data);
        elements.nickname.value = data.nickname;
        elements.stringInNickname.value = data.stringInNickname;
        elements.username.value = data.username;
        elements.keyWords.value = data.keyWords;
    });
}
