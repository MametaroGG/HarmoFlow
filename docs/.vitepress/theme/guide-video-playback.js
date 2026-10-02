// Viewport-driven playback. Native controls remain the manual fallback.
export function attachGuideVideo(video, { document: doc = document, Observer = IntersectionObserver, motion = matchMedia('(prefers-reduced-motion: reduce)') } = {}) {
  let visible = false, held = false, blocked = false, pending = false, disposed = false;
  let expectedPauses = 0, generation = 0;
  video.muted = true;
  video.defaultMuted = true;
  const stop = () => {
    generation++;
    pending = false;
    if (!video.paused) { expectedPauses++; video.pause(); }
  };
  const sync = () => {
    if (disposed) return;
    if (!visible || doc.hidden) { stop(); return; }
    if (motion.matches || held || blocked || video.ended || !video.paused || pending) return;
    const token = ++generation;
    pending = true;
    try {
      Promise.resolve(video.play()).then(() => {
        if (disposed) { video.pause(); return; }
        if (token === generation) pending = false;
        if (!visible || doc.hidden) stop();
      }).catch(() => {
        if (disposed || token !== generation) return;
        pending = false;
        if (video.paused) blocked = true;
      });
    } catch {
      pending = false;
      blocked = true;
    }
  };
  const onPause = () => {
    if (expectedPauses) { expectedPauses--; return; }
    if (!video.ended) held = true;
  };
  const onPlay = () => { held = false; blocked = false; };
  const onMotion = () => { if (motion.matches) stop(); else sync(); };
  const observer = new Observer(entries => {
    const entry = entries.filter(e => e.target === video).at(-1);
    if (!entry) return;
    visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
    sync();
  }, { threshold: [0, 0.35], rootMargin: '-64px 0px 0px 0px' });
  video.addEventListener('pause', onPause);
  video.addEventListener('play', onPlay);
  doc.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', onMotion);
  observer.observe(video);
  return () => {
    disposed = true;
    generation++;
    observer.disconnect();
    video.removeEventListener('pause', onPause);
    video.removeEventListener('play', onPlay);
    doc.removeEventListener('visibilitychange', sync);
    motion.removeEventListener('change', onMotion);
    video.pause();
  };
}
