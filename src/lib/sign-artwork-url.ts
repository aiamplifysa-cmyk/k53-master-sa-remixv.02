const HOSTED_ARTWORK_URL = /^\/__l5e\/assets-v1\/[^/]+\/(road-sign-sheet-\d+\.webp)$/;

export function signArtworkUrl(url: string) {
  const match = url.match(HOSTED_ARTWORK_URL);
  if (!match?.[1]) {
    throw new Error(`Unsupported sign artwork URL: ${url}`);
  }

  return `/assets/charts/${match[1]}`;
}
