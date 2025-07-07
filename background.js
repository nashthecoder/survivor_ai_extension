// Background script for Survivor AI extension

// Create a context menu item that only appears on Instagram pages.
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'survivor-ai',
    title: 'Flag via Survivor AI',
    contexts: ['all'],
    documentUrlPatterns: ['*://*.instagram.com/*']
  });
});

// When the context menu item is clicked, ask the content script to
// extract information about the Instagram post that was right-clicked.
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== 'survivor-ai' || !tab?.id) {
    return;
  }

  chrome.tabs.sendMessage(
    tab.id,
    { action: 'extract-post' },
    (response) => {
      if (chrome.runtime.lastError) {
        console.warn('Extraction failed:', chrome.runtime.lastError.message);
      } else {
        console.log('Post data:', response);
      }
    }
  );
});
