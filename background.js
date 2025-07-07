// Placeholder background script
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'survivor-ai',
    title: 'Survivor AI Action',
    contexts: ['all']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  // TODO: implement functionality
});
