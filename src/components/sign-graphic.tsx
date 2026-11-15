import artwork from "@/data/sign-artwork.json";
import type { Sign } from "@/data/signs";
import { SIGN_ALIASES } from "@/data/sign-aliases";

export const artworkFor = (code: string) =>
  artwork.find(
    (a) => a.code === code || a.code === `(${code})` || a.code === code.replace(/\s/g, "") || a.code === SIGN_ALIASES[code],
  );

export function artworkIsValid(art: (typeof artwork)[number]) {
  if (!art || !Number.isFinite(art.width) || !Number.isFinite(art.height) || art.width <= 0 || art.height <= 0) {
    return false;
  }

  const [x = 0, y = 0, right = 1, bottom = 1] = art.rect ?? [];
  const width = right - x;
  const height = bottom - y;

  return (
    Number.isFinite(x) &&
    Number.isFinite(y) &&
    Number.isFinite(right) &&
    Number.isFinite(bottom) &&
    x >= 0 &&
    y >= 0 &&
    right > x &&
    bottom > y &&
    width > 0 &&
    height > 0 &&
    right <= art.width &&
    bottom <= art.height &&
    x <= art.width &&
    y <= art.height
  );
}

export function validateArtworkMap() {
  const invalid = artwork
    .filter((art) => !artworkIsValid(art))
    .map((art) => ({
      code: art.code,
      page: art.page,
      rect: art.rect,
      width: art.width,
      height: art.height,
      url: art.url,
    }));

  return {
    ok: invalid.length === 0,
    invalid,
  };
}

export function SignGraphic({ sign }: { sign: Sign }) {
  const art = artworkFor(sign.code);
  if (!art)
    return (
      <div className="source-sign">
        <span>{sign.code}</span>
        <small>See source chart</small>
      </div>
    );

  const [x = 0, y = 0, right = 1, bottom = 1] = art.rect;
  const viewBox = `${x} ${y} ${right - x} ${bottom - y}`;

  return (
    <svg
      className="sign-graphic"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`${sign.code}: ${sign.name}`}
    >
      <image
        href={art.url}
        width={art.width}
        height={art.height}
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}
