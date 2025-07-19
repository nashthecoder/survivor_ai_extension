document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["takedownData"], (result) => {
    const data = result.takedownData;
    if (data) {
      const letter = `Subject: Urgent Request to Remove Non-consensual Intimate Content - Privacy Violation

Dear Support Team,

I am writing to request the immediate removal of intimate content that was shared without my consent. The content can be found at [${data.contentLocation}].

This content was uploaded without my knowledge or permission. I discovered it on ${data.timestamp} and have attempted to report it using your platform's reporting tools, but I have not received a response.

I can verify that I am the person in the content, and it was obtained without my consent by ${data.username}. This sharing of intimate content without consent violates your platform's community guidelines regarding non-consensual intimate imagery.

The continued presence of this content is causing me significant distress and affecting my mental health and professional life. I request that you:

- Immediately remove the content
- Prevent any re-uploads of the same content
- Provide confirmation once the content has been removed

Thank you for your prompt attention to this matter.

Sincerely,
[Your Name]`;
      document.getElementById("letter").value = letter;
    } else {
      document.getElementById("letter").value = "No content flagged yet. Please flag content on an Instagram page first.";
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