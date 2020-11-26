const data = {
    unwantedNicknames: [],
    unwantedStringInNickname: [],
    unwantedUsernames: [],
    unwantedKeyWords: [],
};
const elements = {
    tweets: null,
};

window.onload = () => {
    elements.tweets = document.documentElement.querySelectorAll(".tweet");
    setEventListeners();
};

function updateTweets() {
    // console.log("Tweets Updated");
    // console.log(data.unwantedStringInNickname);
    for (let tweet of elements.tweets) {
        let nickname = tweet.querySelectorAll(".name")[0].innerHTML;
        let username = tweet.querySelectorAll(".nick")[0].innerHTML;
        let message = tweet.querySelectorAll(".content_middle")[0].textContent;
        message = message.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "").toLowerCase(); // remove https twitter

        let a = data.unwantedNicknames.some((arg) => nickname === arg);
        let b = data.unwantedStringInNickname.some((str) => nickname.includes(str));
        let c = data.unwantedUsernames.some((arg) => username === arg);
        let d = data.unwantedKeyWords.some((word) => message.includes(word));

        // console.log(data.unwantedStringInNickname);

        if (a || b || c || d) {
            tweet.style.display = "none";
        } else {
            tweet.style.display = "";
        }
    }
}
function setEventListeners() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        // console.log("recieved", request);
        data.unwantedNicknames = request.nickname.split(",").filter((val) => val != "");
        data.unwantedStringInNickname = request.stringInNickname.split(",").filter((val) => val != "");
        data.unwantedUsernames = request.username.split(",").filter((val) => val != "");
        data.unwantedKeyWords = request.keyWords.split(",").filter((val) => val != "");
        updateTweets();
    });
}
