chrome.storage.onChanged.addListener((changes, areaName = "sync") => {
    console.log("on update");
    chrome.storage.sync.get(["nickname", "stringInNickname", "username", "keyWords"], (data) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            // console.log("data sent to content", data);
            chrome.tabs.sendMessage(tabs[0].id, data);
        });
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // if (changeInfo.url !== undefined && changeInfo.url.includes("time.mk/twitter")) {
    if (changeInfo.status === "complete") {
        chrome.storage.sync.get(["nickname", "stringInNickname", "username", "keyWords"], (data) => {
            // setTimeout(() => chrome.tabs.sendMessage(tabId, data), 1000);
            chrome.tabs.sendMessage(tabId, data);
        });
    }
});
