# Privacy Policy for Speed Up Any Vid

**Last updated:** October 6, 2026

## Overview

Speed Up Any Vid is a Chrome extension that speeds up the video you are
watching while you hold the spacebar, on any website.

## Data Collection

This extension **does not collect, store, or transmit any user data**.
Specifically:

- No personal information is collected
- No browsing history is tracked
- No cookies are created or read
- No data is sent to any external servers
- No analytics or telemetry is used

## How It Works

The extension runs entirely in your browser. It listens for spacebar
keypresses, finds the video element you are most likely watching, and changes
that element's `playbackRate` while the key is held. Nothing leaves your
machine, and nothing is written to disk.

## Permissions

The extension requests no Chrome permissions. It declares a content script
matching all URLs, which is what lets it reach the video element on whichever
site you are on — it reads nothing from the page other than its video
elements and the focused element (to avoid activating while you type).

## Changes

Any change to this policy will be committed to this repository, so the file
history is the full record.

## Contact

Open an issue on [this repository](https://github.com/LoganDBHS/SpeedUpAnyVid).
