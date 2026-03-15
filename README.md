# Speed Up Any Vid

A Chrome extension that lets you speed up any video on any website by holding down the spacebar.

## How It Works

- **Hold spacebar** → video plays at 2x speed
- **Release spacebar** → video returns to normal speed
- Works on YouTube, Reddit, Twitter/X, Vimeo, and any site with HTML5 video
- Automatically targets the most visible or currently playing video on the page
- Smart enough to not activate when you're typing in a text field

## Install from Source

1. Clone this repo
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select this folder

## How It Handles Multiple Videos

If a page has multiple videos (e.g., a Reddit or Twitter feed), the extension picks the best one:

1. If only one video exists, it uses that one
2. If one video is currently playing, it picks that one
3. Otherwise, it picks the most visible video on screen
