import { describe, expect, it } from "vitest";
import { artworkFor } from "@/components/sign-graphic";
import { SIGNS, signByCode } from "@/data/signs";

const normalizeCode = (code: string) => code.toUpperCase().replace(/[()\s]/g, "");

describe("sign catalog accuracy", () => {
  it("uses chart artwork labeled with the catalog code", () => {
    for (const sign of SIGNS) {
      const art = artworkFor(sign.code);
      expect(art, sign.code).toBeDefined();
      if (art) expect(normalizeCode(art.code), sign.code).toBe(normalizeCode(sign.code));
    }
  });

  it("keeps corrected source-chart names attached to their official codes", () => {
    const expectedNames: Record<string, string> = {
      R105: "Proceed left only",
      R110: "Pedestrians only",
      R207: "Hitch-hiking prohibited",
      R208: "Unauthorized vehicles prohibited",
      "R305-P": "Parking reservation",
      "R306-P": "Limited parking reservation",
      R327: "Bus and minibus reservation",
      R403: "Woonerf",
      W320: "Height restriction",
      W321: "Length restricted",
      IN10: "Park and ride",
      "GE18.3": "Tourism route marker",
      "GFS B1-3": "Hospital",
      S1: "Standard traffic signal",
      S1B: "Bus traffic signal",
      S1T: "Tram traffic signal",
      S1A: "Directional arrow traffic signal",
      S2: "Right-arrow traffic signal",
      S8B: "Bus signal with directional arrow",
      S9T: "Tram signal with directional arrows",
      S11: "Pedestrian signal",
      S12: "Two-aspect traffic signal",
      S14: "Bus multiple-arrow traffic signal",
      S16: "Steady green lane arrow",
      S17: "Steady red lane cross",
      S20: "Pedal-cycle signal",
    };

    for (const [code, name] of Object.entries(expectedNames))
      expect(signByCode(code)?.name, code).toBe(name);

    expect(signByCode("R305")).toBeUndefined();
    expect(signByCode("TR1.5")).toBeUndefined();
  });
});
