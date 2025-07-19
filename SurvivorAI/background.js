chrome.contextMenus.create({
  id: "flagSurvivorAI",
  title: "Flag via Survivor AI",
  contexts: ["page", "image"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "flagSurvivorAI" && tab.url.includes("instagram.com")) {
    chrome.tabs.sendMessage(tab.id, { action: "flagContent", url: tab.url }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Send message failed:", chrome.runtime.lastError.message);
      } else if (response) {
        console.log("Content flagged, response:", response.status);
      }
    });
  }
});