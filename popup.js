document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["takedownData"], (result) => {
    console.log("Popup loaded. takedownData:", result.takedownData);
    const data = result.takedownData;
    if (data) {
      const letter = `Subject: Takedown Request for ${data.url}\n\nDear [Platform Team],\nI am requesting the removal of content located at ${data.url}, posted on ${data.timestamp}. This content violates your policies...\n\nSincerely,\n[User Name]`;
      document.getElementById("letter").value = letter;
    } else {
      document.getElementById("letter").value = "No content flagged yet.";
    }
  });

  document.getElementById("copyLetter").addEventListener("click", () => {
    navigator.clipboard.writeText(document.getElementById("letter").value).then(() => {
      alert("Letter copied to clipboard!");
    }).catch(err => {
      console.error("Copy failed:", err);
    });
  });
});