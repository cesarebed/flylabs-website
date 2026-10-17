import { describe, expect, it } from "vitest";
import { contrastRatio, mixHex, parseHex, readThemeTokens, resolveColor } from "./contrast";

describe("contrastRatio", () => {
  it("measures known pairs like the WCAG reference", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrastRatio("#fff", "#ffffff")).toBe(1);
    expect(contrastRatio("#767676", "#ffffff")).toBeCloseTo(4.54, 2);
    expect(contrastRatio("#343bec", "#131217")).toBeCloseTo(2.65, 1);
  });

  it("is the same in both directions and NaN for what is not a hex", () => {
    expect(contrastRatio("#343bec", "#fafaf8")).toBe(contrastRatio("#fafaf8", "#343bec"));
    expect(contrastRatio("red", "#ffffff")).toBeNaN();
    expect(parseHex("#12345")).toBeNull();
  });
});

describe("mixHex and resolveColor", () => {
  it("mixes like color-mix(in srgb)", () => {
    expect(mixHex("#000000", "#ffffff", 0.5)).toBe("#808080");
    expect(mixHex("#c4291c", "#ffffff", 0.1)).toBe("#f9eae8");
  });

  it("resolves hex, var() and color-mix, and leaves out what is not a colour", () => {
    const tokens = { danger: "#c4291c", card: "#ffffff" };
    expect(resolveColor("#ABC", tokens)).toBe("#aabbcc");
    expect(resolveColor("var(--danger)", tokens)).toBe("#c4291c");
    expect(resolveColor("color-mix(in srgb, var(--danger) 10%, var(--card))", tokens)).toBe("#f9eae8");
    expect(resolveColor("0.5rem", tokens)).toBeNull();
  });
});

describe("readThemeTokens", () => {
  it("reads :root and Stellar's @variant dark block, the dark one falling back to the light", () => {
    const css = `
      @custom-variant dark { &:where([data-theme="dark"], [data-theme="dark"] *) { @slot; } }
      /* --background: #ff0000; a comment is not a token */
      :root {
        --background: #fafaf8;
        --foreground: #15151a;
        --danger: #c4291c;
        --danger-bg: color-mix(in srgb, var(--danger) 10%, #ffffff);
        --radius: 0.5rem;
      }
      :root {
        @variant dark {
          --background: #131217;
          --danger: #ff6b6b;
        }
      }`;
    const { light, dark } = readThemeTokens(css);
    expect(light).toEqual({ background: "#fafaf8", foreground: "#15151a", danger: "#c4291c", "danger-bg": "#f9eae8" });
    expect(dark.background).toBe("#131217");
    expect(dark.foreground).toBe("#15151a");
    expect(dark["danger-bg"]).toBe(mixHex("#ff6b6b", "#ffffff", 0.1));
  });

  it("reads a :root[data-theme=\"dark\"] block too", () => {
    const css = `:root { --background: #ffffff; } :root[data-theme="dark"] { --background: #000000; }`;
    expect(readThemeTokens(css).dark.background).toBe("#000000");
  });

  it("says what is missing", () => {
    expect(() => readThemeTokens(":root { --background: #ffffff; }")).toThrow(/no dark block/);
    expect(() => readThemeTokens("body { color: red; }")).toThrow(/no :root/);
  });
});
