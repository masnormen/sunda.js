import { toSundanese, toLatin } from "../src";

describe("Sundanese to Latin tests", () => {
  it("should convert the basic letters", () => {
    const result = toSundanese("ka ga nga ca ja nya ta da na pa ba ma ya ra la wa sa ha fa qa va xa za kha");
    expect(result).toBe("ᮊ ᮌ ᮍ ᮎ ᮏ ᮑ ᮒ ᮓ ᮔ ᮕ ᮘ ᮙ ᮚ ᮛ ᮜ ᮝ ᮞ ᮠ ᮖ ᮋ ᮗ ᮟ ᮐ ᮮ");
  });
  it("should convert the vowel rerangkén", () => {
    const result = toSundanese("pa pi pu pe pé peu po p");
    expect(result).toBe("ᮕ ᮕᮤ ᮕᮥ ᮕᮨ ᮕᮦ ᮕᮩ ᮕᮧ ᮕ᮪");
  });
  it("should convert the consonant rerangkén", () => {
    const result = toSundanese("di klatén, ada santri kyai tebang pohon buah pir");
    expect(result).toBe("ᮓᮤ ᮊᮣᮒᮦᮔ᮪, ᮃᮓ ᮞᮔ᮪ᮒᮢᮤ ᮊᮡᮄ ᮒᮨᮘᮀ ᮕᮧᮠᮧᮔ᮪ ᮘᮥᮃᮂ ᮕᮤᮁ");
  });
  it("should convert numbers and add '|' automatically", () => {
    const result = toSundanese("tanggal 17 bulan 8 taun 1945");
    expect(result).toBe("ᮒᮀᮌᮜ᮪ |᮱᮷| ᮘᮥᮜᮔ᮪ |᮸| ᮒᮅᮔ᮪ |᮱᮹᮴᮵|");
  });
});

describe("Latin to Sundanese tests", () => {
  it("should convert the basic letters", () => {
    const result = toLatin("ᮊ ᮌ ᮍ ᮎ ᮏ ᮑ ᮒ ᮓ ᮔ ᮕ ᮘ ᮙ ᮚ ᮛ ᮜ ᮝ ᮞ ᮠ ᮖ ᮋ ᮗ ᮟ ᮐ ᮮ");
    expect(result).toBe("ka ga nga ca ja nya ta da na pa ba ma ya ra la wa sa ha fa qa va xa za kha");
  });
  it("should convert from vowel rerangkén", () => {
    const result = toLatin("ᮕ ᮕᮤ ᮕᮥ ᮕᮨ ᮕᮦ ᮕᮩ ᮕᮧ ᮕ᮪");
    expect(result).toBe("pa pi pu pe pé peu po p");
  });
  it("should convert from consonant rerangkén", () => {
    const result = toLatin("ᮓᮤ ᮊᮣᮒᮦᮔ᮪, ᮃᮓ ᮞᮔ᮪ᮒᮢᮤ ᮊᮡᮄ ᮒᮨᮘᮀ ᮕᮧᮠᮧᮔ᮪ ᮘᮥᮃᮂ ᮕᮤᮁ");
    expect(result).toBe("di klatén, ada santri kyai tebang pohon buah pir");
  });
  it("should convert numbers and remove '|' automatically", () => {
    const result = toLatin("ᮒᮀᮌᮜ᮪ |᮱᮷| ᮘᮥᮜᮔ᮪ |᮸| ᮒᮅᮔ᮪ |᮱᮹᮴᮵|");
    expect(result).toBe("tanggal 17 bulan 8 taun 1945");
  });
});
