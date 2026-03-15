(() => {
  let activeVideo = null;
  let originalRate = 1;
  let isHolding = false;

  function findAllVideos(root) {
    const videos = [];
    try {
      root.querySelectorAll("video").forEach((v) => videos.push(v));
      root.querySelectorAll("*").forEach((el) => {
        if (el.shadowRoot) {
          findAllVideos(el.shadowRoot).forEach((v) => videos.push(v));
        }
      });
    } catch (e) {}
    return videos;
  }

  function getTargetVideo() {
    const videos = [...new Set(findAllVideos(document))];

    if (videos.length === 0) return null;
    if (videos.length === 1) return videos[0];

    const playing = videos.filter((v) => !v.paused && !v.ended);
    if (playing.length === 1) return playing[0];

    const candidates = playing.length > 0 ? playing : videos;
    let best = null;
    let bestScore = -1;

    for (const v of candidates) {
      const rect = v.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;

      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(window.innerHeight, rect.bottom);
      const visibleLeft = Math.max(0, rect.left);
      const visibleRight = Math.min(window.innerWidth, rect.right);

      if (visibleBottom <= visibleTop || visibleRight <= visibleLeft) continue;

      const visibleArea =
        (visibleBottom - visibleTop) * (visibleRight - visibleLeft);
      const score = visibleArea / (rect.width * rect.height);

      if (score > bestScore) {
        bestScore = score;
        best = v;
      }
    }

    return best || candidates[0];
  }

  function isTyping() {
    let el = document.activeElement;
    if (!el) return false;

    // Traverse into shadow root active elements
    while (el.shadowRoot && el.shadowRoot.activeElement) {
      el = el.shadowRoot.activeElement;
    }

    const tag = el.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
  }

  function isSpace(e) {
    return e.code === "Space" || e.key === " ";
  }

  function blockSpace(e) {
    if (!isHolding || !isSpace(e)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  // Primary handler: intercept spacebar at window level (capture phase)
  window.addEventListener(
    "keydown",
    (e) => {
      if (!isSpace(e) || e.repeat || isTyping()) return;

      const video = getTargetVideo();
      if (!video) return;

      isHolding = true;
      activeVideo = video;
      originalRate = video.playbackRate;
      video.playbackRate = 2;

      e.preventDefault();
      e.stopImmediatePropagation();
    },
    true
  );

  window.addEventListener(
    "keyup",
    (e) => {
      if (!isSpace(e) || !isHolding) return;

      isHolding = false;
      if (activeVideo) {
        activeVideo.playbackRate = originalRate;
        activeVideo = null;
      }

      e.preventDefault();
      e.stopImmediatePropagation();
    },
    true
  );

  // Block spacebar events at document/element level to prevent scroll and site handlers
  function addBlockers(target) {
    for (const event of ["keydown", "keyup", "keypress"]) {
      target.addEventListener(event, blockSpace, true);
    }
  }

  addBlockers(document);
  if (document.documentElement) addBlockers(document.documentElement);

  // Block on body once it exists
  const obs = new MutationObserver(() => {
    if (document.body) {
      addBlockers(document.body);
      obs.disconnect();
    }
  });
  obs.observe(document.documentElement || document, {
    childList: true,
    subtree: true,
  });

  // Prevent spacebar scroll while holding
  window.addEventListener(
    "scroll",
    (e) => {
      if (isHolding) e.preventDefault();
    },
    { capture: true, passive: false }
  );
})();
