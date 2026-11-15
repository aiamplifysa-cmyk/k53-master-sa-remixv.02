const LOVABLE_ASSET_URL = /^\/__l5e\/assets-v1\/[^/]+\/([^/]+)$/;

/** Resolve a legacy Lovable asset URL to the matching file in public/resources. */
export function localResourceUrl(url: string): string {
  const match = url.match(LOVABLE_ASSET_URL);
  return match?.[1] ? `/resources/${match[1]}` : url;
}
