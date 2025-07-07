// Content script for Survivor AI.
// Listens for messages from the background script to extract data from
// the Instagram post that was right-clicked.

let lastContextEl = null;

// Track the element that triggered the context menu so we know which
// post to extract when the user selects the extension action.
document.addEventListener(
  'contextmenu',
  (e) => {
    lastContextEl = e.target;
  },
  true
);

function findPost(el) {
  while (el && el.tagName !== 'ARTICLE') {
    el = el.parentElement;
  }
  return el;
}

function collectData(post) {
  if (!post) return null;
  const img = post.querySelector('img');
  const video = post.querySelector('video');
  const username = post.querySelector('header a')?.textContent || null;
  const timestamp = post.querySelector('time')?.getAttribute('datetime') || null;
  const link = post.querySelector('a[href*="/p/"]')?.href || window.location.href;
  return {
    mediaUrl: video ? video.src : img ? img.src : null,
    username,
    timestamp,
    link,
  };
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'extract-post') {
    const post = findPost(lastContextEl);
    const data = collectData(post);
    sendResponse(data);
  }
});

