chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.removeAll(function () {
      chrome.contextMenus.create({
        id: "freediumRedirect",
        title: "Open with Freedium",
        contexts: ["page", "link"],
        documentUrlPatterns: ["*://*.medium.com/*"],
        targetUrlPatterns: ["*://*.medium.com/*"]
      });
    });
  });
  
  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "freediumRedirect") {
      let targetUrl = tab.url;
  
      if (info.linkUrl) {
        targetUrl = info.linkUrl;
      }
  
      const newUrl = "https://freedium.cfd/" + targetUrl.replace("https://", "");
      chrome.tabs.update(tab.id, { url: newUrl });
    }
  });
  
  chrome.action.onClicked.addListener(function (tab) {
    if (tab.url.includes("medium.com")) {
      const newUrl = "https://freedium.cfd/" + tab.url.replace("https://", "");
      chrome.tabs.update(tab.id, { url: newUrl });
    }
  });
  