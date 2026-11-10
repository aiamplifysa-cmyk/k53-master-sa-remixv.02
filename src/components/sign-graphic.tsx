import artwork from "@/data/sign-artwork.json";
import type { Sign } from "@/data/signs";
export const artworkFor = (code: string) =>
  artwork.find(
    (a) => a.code === code || a.code === `(${code})` || a.code === code.replace(/\s/g, ""),
  );
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
  return (
    <svg
      className="sign-graphic"
      viewBox={`${x} ${y} ${right - x} ${bottom - y}`}
      role="img"
      aria-label={`${sign.code}: ${sign.name}`}
    >
      <image href={art.url} width={art.width} height={art.height} />
    </svg>
  );
}
