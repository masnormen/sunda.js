import { toSundanese } from "../src";

describe("Basic functionality tests", () => {
  it("should convert this", () => {
    const result = toSundanese("ieu te`h");
    expect(result).toBe("ᮄᮉ ᮒᮦᮂ");
  });
});