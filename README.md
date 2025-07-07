# Survivor AI Extension

This repository contains a minimal Chrome extension scaffold using Manifest V3. It sets up a service worker, content script, popup, and a context menu entry.

## Setup

1. Clone the repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select this directory.

## Usage

After loading the extension, navigate to Instagram. Right-click on a post and
choose **"Flag via Survivor AI"** from the context menu. The extension will
extract basic details from the selected post (media URL, username, timestamp and
link) and log them in the console. The popup can still be opened by clicking the
extension icon.
