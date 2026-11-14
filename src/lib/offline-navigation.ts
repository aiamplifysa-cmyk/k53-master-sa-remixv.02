type NavigationMatch = {
  request: { mode: string };
  url: { pathname: string };
};

export function isCacheableNavigation({ request, url }: NavigationMatch) {
  return (
    request.mode === "navigate" && !/^\/(?:~oauth|auth|reset-password)(?:\/|$)/.test(url.pathname)
  );
}

export async function offlineNavigationFallback() {
  return new Response(
    '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>K53 Master SA — Offline</title><main><h1>You’re offline</h1><p>This page was not saved on this device. Reconnect, or open a page you visited while online.</p><p>Your study progress is stored in this browser and will sync when you’re online and signed in.</p><p><a href="/">Try the home page</a></p></main></html>',
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
