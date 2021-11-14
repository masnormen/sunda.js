/* eslint-disable quote-props */
type CharacterMapping = {
  [char: string]: string;
};

function invertMapping(obj: CharacterMapping): CharacterMapping {
  const result = {};
  const _keys = Object.keys(obj);
  for (let i = 0, length = _keys.length; i < length; i++) {
    result[obj[_keys[i]]] = _keys[i];
  }
  return result;
}
namespace SundaConst {
  /* Regex for various type of valid Latin glyph for Sundanese */
  const LATIN = {
    CONSONANTS: `ng|ny|kh|sy|[kgcjtdnpbmyrlwshfqvxz]`,
    CONSONANTS_RERENGKEN_SONORANT: `[ylr]`,
    CONSONANTS_RERENGKEN_FINAL: `ng|[rh]`,
    CONSONANTS_WITHOUT_RERENGKEN_FINAL: `n(?![gy])|k(?!h)|s(?!y)|ny|kh|sy|[gcjtdpbmylwfvqxz]`,
    DIGITS: `[\\d]+`,
    NOT_LETTERS: `[^a-zA-Z\\d\\u00C0-\\u00FF]`,
    VOWELS: `e\`|eu|[aiueoéè]`,
  };
  /* Regex for various type of valid Sundanese characters glyph */
  const SUNDA = {
    ANGKA: `[\\u1BB0-\\u1BB9]`,
    NGALAGENA: `[\\u1B8A-\\u1BA0\\u1BAE\\u1BAF]`,
    NOT_SUNDA: `[^\\u1B80-\\u1BA8\\u1BAE-\\u1BB9]`,
    PIPA: `[|]`,
    RARANGKEN_SONORANT: `[\\u1BA1-\\u1BA3]`,
    RARANGKEN_VOWEL: `[\\u1BA4-\\u1BAA]`,
    RARANGKEN_FINAL: `[\\u1B80-\\u1B82]`,
    SWARA: `[\\u1B83-\\u1B89]`,
  };
  export const REGEX = {
    /* Capturing Latin characters that corresponds to a valid Sundanese glyph */
    CAPTURE_LATIN: [
      `(${LATIN.DIGITS})`,
      `|`,
      `(${LATIN.NOT_LETTERS})`,
      `|`,
      `(${LATIN.CONSONANTS})?`,
      `(${LATIN.CONSONANTS_RERENGKEN_SONORANT})?`,
      `(${LATIN.VOWELS})`,
      `((?:${LATIN.CONSONANTS_RERENGKEN_FINAL})(?!${LATIN.VOWELS}))?`,
      `((?:${LATIN.CONSONANTS_WITHOUT_RERENGKEN_FINAL})(?!${LATIN.VOWELS}))?`,
      `|`,
      `(${LATIN.CONSONANTS})`,
    ].join(""),
    /* Capturing Sundanese characters that corresponds to a valid Latin glyph */
    CAPTURE_SUNDA: [
      `(?:${SUNDA.PIPA})?(${SUNDA.ANGKA})(?:${SUNDA.PIPA})?`,
      `|`,
      `(${SUNDA.NOT_SUNDA})`,
      `|`,
      `(?:(${SUNDA.NGALAGENA})(${SUNDA.RARANGKEN_SONORANT})?(${SUNDA.RARANGKEN_VOWEL})?`,
      `|(${SUNDA.SWARA}))`,
      `(${SUNDA.RARANGKEN_FINAL})?`,
    ].join(""),
  };
}

/* Various type of Sundanese characters, accessed with a key of Latin character */
namespace SundaneseChars {
  export const SWARA: CharacterMapping = {
    a: "ᮃ",
    i: "ᮄ",
    u: "ᮅ",
    e: "ᮈ",
    é: "ᮆ",
    eu: "ᮉ",
    o: "ᮇ",
  };
  export const NGALAGENA: CharacterMapping = {
    k: "ᮊ",
    g: "ᮌ",
    ng: "ᮍ",
    c: "ᮎ",
    j: "ᮏ",
    ny: "ᮑ",
    t: "ᮒ",
    d: "ᮓ",
    n: "ᮔ",
    p: "ᮕ",
    b: "ᮘ",
    m: "ᮙ",
    y: "ᮚ",
    r: "ᮛ",
    l: "ᮜ",
    w: "ᮝ",
    s: "ᮞ",
    h: "ᮠ",
    f: "ᮖ",
    q: "ᮋ",
    v: "ᮗ",
    x: "ᮟ",
    z: "ᮐ",
    kh: "ᮮ",
    sy: "ᮯ",
  };
  export const RARANGKEN: CharacterMapping = {
    i: "ᮤ",
    u: "ᮥ",
    e: "ᮨ",
    é: "ᮦ",
    eu: "ᮩ",
    o: "ᮧ",
    r: "ᮁ",
    ng: "ᮀ",
    h: "ᮂ",
    pamaeh: "᮪",
  };
  export const RARANGKEN_SONORANT: CharacterMapping = {
    l: "ᮣ",
    r: "ᮢ",
    y: "ᮡ",
  };
  export const ANGKA: CharacterMapping = {
    "1": "᮱",
    "2": "᮲",
    "3": "᮳",
    "4": "᮴",
    "5": "᮵",
    "6": "᮶",
    "7": "᮷",
    "8": "᮸",
    "9": "᮹",
    "0": "᮰",
  };
}

/* Various type of Latin characters, accessed with a key of Sundanese character */
namespace LatinChars {
  export const SWARA: CharacterMapping = invertMapping(SundaneseChars.SWARA);
  export const NGALAGENA: CharacterMapping = invertMapping(SundaneseChars.NGALAGENA);
  export const RARANGKEN: CharacterMapping = invertMapping(SundaneseChars.RARANGKEN);
  export const RARANGKEN_SONORANT: CharacterMapping = invertMapping(
    SundaneseChars.RARANGKEN_SONORANT
  );
  export const ANGKA: CharacterMapping = invertMapping(SundaneseChars.ANGKA);
}

export { LatinChars, SundaneseChars, SundaConst };
