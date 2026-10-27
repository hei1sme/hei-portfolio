export const introSessionKey = "hei:welcome:v1";

// Runs before paint. Without JavaScript, the welcome stays hidden and the site
// is ordinary server-rendered content. The timeout also covers failed hydration.
export const introBootstrap = `(() => {
  try {
    if (location.pathname !== '/' || (location.hash && location.hash !== '#garden-home') ||
        matchMedia('(prefers-reduced-motion: reduce)').matches ||
        sessionStorage.getItem('${introSessionKey}') === 'seen') return;
    const root = document.documentElement;
    root.dataset.portfolioIntro = 'enter';
    root.dataset.introBoot = 'true';
    setTimeout(() => {
      if (root.dataset.introBoot === 'true') {
        delete root.dataset.portfolioIntro;
        delete root.dataset.introBoot;
      }
    }, 4000);
  } catch {}
})();`;
