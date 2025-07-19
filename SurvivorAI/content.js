chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "flagContent") {
    // Debug the incoming message
    console.log("Received message:", message);

    // Extract username (e.g., from post author or profile link)
    let username = "Unknown";
    const authorElement = document.querySelector('header a[href*="/"] span:not(:empty)') || // Target post author
                         document.querySelector('article a[href*="/"] span');
    if (authorElement && authorElement.textContent.trim()) {
      username = authorElement.textContent.trim();
    }
    console.log("Detected username:", username);

    // Extract content location with delay for dynamic loading
    let contentLocation = "Unable to determine";
    setTimeout(() => {
      // Try to get the post URL from the article or main link
      const postLink = document.querySelector('article a[href*="/p/"]') || document.querySelector('main a[href*="/p/"]');
      if (postLink && postLink.href) {
        contentLocation = postLink.href;
      } else {
        // Fallback to image src if post link isn't found
        const imageElement = document.querySelector('article img[src]');
        if (imageElement && imageElement.src) {
          contentLocation = imageElement.src;
        } else {
          contentLocation = message.url || "No valid location found";
        }
      }
      console.log("Content Location:", contentLocation);

      const data = {
        url: message.url || "Unknown URL",
        timestamp: new Date().toISOString(),
        contentType: imageElement ? "image" : "page",
        username: username,
        contentLocation: contentLocation
      };

      // Avoid processing if focused element is within aria-hidden
      if (!document.querySelector("[aria-hidden='true'] *:focus")) {
        chrome.storage.local.set({ takedownData: data }, () => {
          sendResponse({ status: "received" });
        });
      } else {
        sendResponse({ status: "error", message: "Focused element is hidden" });
      }
    }, 1000); // 1-second delay to allow DOM to load
    return true; // Keeps the message channel open for async response
  }
});