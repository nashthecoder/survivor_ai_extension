console.log("Content script loaded.");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message);

  if (message.action === "flagContent") {
    console.log("Received flagContent message:", message.url);

    // Enhanced content detection
    let contentType = "page";
    const imgElement = document.querySelector("img[alt]:not([aria-hidden='true'])");
    if (imgElement) {
      contentType = "image";
    } else {
      const videoElement = document.querySelector("video");
      if (videoElement) contentType = "video";
    }

    const data = {
      url: message.url,
      timestamp: new Date().toISOString(),
      contentType: contentType,
      elementId: imgElement ? imgElement.id || imgElement.src : null // Track specific element
    };

    // Check for ARIA-hidden focus issues
    const focusedElement = document.activeElement;
    if (focusedElement && focusedElement.closest("[aria-hidden='true']")) {
      console.warn("Focus is on a hidden element:", focusedElement);
      sendResponse({ status: "error", message: "Focused element is hidden" });
      return true; // Prevent further execution and keep channel open
    } else {
      chrome.storage.local.set({ takedownData: data }, () => {
        if (chrome.runtime.lastError) {
          console.error("Storage error:", chrome.runtime.lastError);
          sendResponse({ status: "error", message: "Failed to save data" });
        } else {
          console.log("Data saved:", data);
          sendResponse({ status: "received", data: data });
        }
      });
    }

    return true; // Keep channel open for async response
  }
});