/* Regex for various type of valid Sundanese glyph */
const IDENTIFIERS = {
  CONSONANTS: `ng|ny|kh|sy|[kgcjtdnpbmyrlwshfqvxz]`,
  CONSONANTS_RERENGKEN_SONORANT: `[ylr]`,
  CONSONANTS_RERENGKEN_FINAL: `ng|[rh]`,
  CONSONANTS_WITHOUT_RERENGKEN_FINAL: `n(?![gy])|k(?!h)|s(?!y)|ny|kh|sy|[gcjtdpbmylwfvqxz]`,
  DIGITS: `[\\d]+`,
  NOT_LETTERS: `[^a-zA-Z\\d:\\u00C0-\\u00FF]`,
  VOWELS: `e\`|eu|[aiueoéè]`,
};

const SundaConst = {
  REGEX: {
    CAPTURE_SYLLABLE: [
      `(${IDENTIFIERS.DIGITS})`,
      `|`,
      `(${IDENTIFIERS.NOT_LETTERS})`,
      `|`,
      `(${IDENTIFIERS.CONSONANTS})?`,
      `(${IDENTIFIERS.CONSONANTS_RERENGKEN_SONORANT})?`,
      `(${IDENTIFIERS.VOWELS})`,
      `((?:${IDENTIFIERS.CONSONANTS_RERENGKEN_FINAL})(?!${IDENTIFIERS.VOWELS}))?`,
      `((?:${IDENTIFIERS.CONSONANTS_WITHOUT_RERENGKEN_FINAL})(?!${IDENTIFIERS.VOWELS}))?`,
      `|`,
      `(${IDENTIFIERS.CONSONANTS})`,
    ].join(""),
    ...IDENTIFIERS,
  },
};

const SundaChars = {
  SWARA: {
    "a": "ᮃ",
    "i": "ᮄ",
    "u": "ᮅ",
    "e": "ᮈ",
    "é": "ᮆ",
    "e`": "ᮆ",
    "eu": "ᮉ",
    "o": "ᮇ",
  },

  NGALAGENA: {
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
  },

  RARANGKEN: {
    "i": "ᮤ", // Panghulu
    "u": "ᮥ", // Panyuku
    "e": "ᮨ", // Pamepet
    "é": "ᮦ", // Panéléng
    "e`": "ᮦ", // Panéléng
    "eu": "ᮩ", // Paneuleung
    "o": "ᮧ", // Panolong
    "r": "ᮁ", // Panglayar
    "ng": "ᮀ", // Panyecek
    "h": "ᮂ", // Pangwisad
    "pamaeh": "᮪", // Pamaeh/Paten
  },

  RARANGKEN_SONORANT: {
    l: "ᮣ", // Panyiku
    r: "ᮢ", // Panyakra
    y: "ᮡ", // Pamingkal
  },

  ANGKA: {
    1: "᮱",
    2: "᮲",
    3: "᮳",
    4: "᮴",
    5: "᮵",
    6: "᮶",
    7: "᮷",
    8: "᮸",
    9: "᮹",
    0: "᮰",
  },
};

export { SundaChars, SundaConst };
