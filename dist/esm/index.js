function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  return _extends.apply(this, arguments);
}

/*! (c) Andrea Giammarchi - ISC */
// requires a global Symbol
var iterator =
  /* istanbul ignore next */
  function () {
    var i = 0;
    var self = this;
    return {
      next: function () {
        var done = self.length <= i;
        var value = done ? void 0 : self[i++];
        return {
          value: value,
          done: done,
        };
      },
    };
  };

function isRegexp(value) {
  return Object.prototype.toString.call(value) === "[object RegExp]";
}

var flagMap = {
  global: "g",
  ignoreCase: "i",
  multiline: "m",
  dotAll: "s",
  sticky: "y",
  unicode: "u",
};
function clonedRegexp(regexp, options) {
  if (options === void 0) {
    options = {};
  }

  if (!isRegexp(regexp)) {
    throw new TypeError("Expected a RegExp instance");
  }

  var flags = Object.keys(flagMap)
    .map(function (flag) {
      return (typeof options[flag] === "boolean" ? options[flag] : regexp[flag]) ? flagMap[flag] : "";
    })
    .join("");
  var clonedRegexp = new RegExp(options.source || regexp.source, flags);
  clonedRegexp.lastIndex = typeof options.lastIndex === "number" ? options.lastIndex : regexp.lastIndex;
  return clonedRegexp;
}

var _$exec;
var supportsGroups = "groups" in ((_$exec = /a/.exec("a")) != null ? _$exec : {});
/**
 * @param {RegExpExecArray?} previousMatch
 * @param {RegExpExecArray?} match
 */

var isInfiniteLoop = function isInfiniteLoop(previousMatch, match) {
  var isLooselyTrue =
    (previousMatch == null ? void 0 : previousMatch[0]) === (match == null ? void 0 : match[0]) &&
    (previousMatch == null ? void 0 : previousMatch.index) === (match == null ? void 0 : match.index);

  if (isLooselyTrue) {
    return JSON.stringify(_extends({}, previousMatch)) === JSON.stringify(_extends({}, match));
  }

  return false;
};

var INFINITE_LOOP_ERROR = "Infinite loop.";
/**
 * @param {string|RegExp} matcher
 * @param {boolean}       skipCloning
 */

function resolveMatcher(matcher, skipCloning) {
  if (skipCloning === void 0) {
    skipCloning = false;
  }

  if (!(matcher instanceof RegExp)) {
    return new RegExp(matcher, "g");
  }

  if (skipCloning) {
    return matcher;
  }

  return clonedRegexp(matcher);
}
/**
 * Returns an iterator of all results matching a string against a regular expression, including capturing groups.
 *
 * @param   {string}                             string  String to match.
 * @param   {string|RegExp}                      matcher Value to match original string. If a non-`RegExp` object is passed, it is implicitly converted to a `RegExp` by using `new RegExp(regexp, 'g')`. The `RegExp` object must have the `global` flag, otherwise a `TypeError` will be thrown.
 *
 * @returns {IterableIterator<RegExpMatchArray>}
 */

function ponyfill(string, matcher) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }

  var composedMatcher = resolveMatcher(matcher);
  var globalFlag = composedMatcher.global;

  if (!globalFlag) {
    throw new TypeError("`String.prototype.matchAll` ponyfill called with a non-global RegExp argument");
  }
  /** @type {RegExpMatchArray[]} */

  var matches = [];
  var match, previousMatch;

  try {
    previousMatch = null;

    while ((match = composedMatcher.exec(string)) !== null) {
      if (isInfiniteLoop(previousMatch, match)) {
        throw new Error(INFINITE_LOOP_ERROR);
      }

      previousMatch = match;
      matches.push(match);
    }
  } catch (error) {
    /* istanbul ignore if */
    if (!(error instanceof Error && error.message === INFINITE_LOOP_ERROR)) {
      throw error;
    }

    matches.pop();
    string.replace(composedMatcher, function (value, index, input, groups) {
      /** @type {RegExpMatchArray} */
      var match = [value];
      match.index = index;
      match.input = input;

      if (supportsGroups) {
        match.groups = groups;
      }

      matches.push(match);
      return value;
    });
  }

  if (typeof Symbol === "undefined") {
    // @ts-ignore
    return matches[iterator]();
  }

  return matches[Symbol.iterator]();
}
/**
 * Returns an iterator of all results matching a string against a regular expression, including capturing groups. Uses native implementation if available.
 *
 * @param   {string}                             string  String to match.
 * @param   {string|RegExp}                      matcher Value to match original string. If a non-`RegExp` object is passed, it is implicitly converted to a `RegExp` by using `new RegExp(regexp, 'g')`. The `RegExp` object must have the `global` flag, otherwise a `TypeError` will be thrown.
 *
 * @returns {IterableIterator<RegExpMatchArray>}
 */

function preferNative(string, matcher) {
  if (typeof String.prototype.matchAll !== "undefined") {
    var composedMatcher = resolveMatcher(matcher, true);
    return string.matchAll(composedMatcher);
  }
  /* istanbul ignore next */

  return ponyfill(string, matcher);
}

/* eslint-disable quote-props */
function invertMapping(obj) {
  const result = {};

  const _keys = Object.keys(obj);

  for (let i = 0, length = _keys.length; i < length; i++) {
    result[obj[_keys[i]]] = _keys[i];
  }

  return result;
}

let SundaConst;

(function (_SundaConst) {
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
  _SundaConst.REGEX = {
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
})(SundaConst || (SundaConst = {}));
/* Various type of Sundanese characters, accessed with a key of Latin character */

let SundaneseChars;

(function (_SundaneseChars) {
  _SundaneseChars.SWARA = {
    a: "ᮃ",
    i: "ᮄ",
    u: "ᮅ",
    e: "ᮈ",
    é: "ᮆ",
    eu: "ᮉ",
    o: "ᮇ",
  };
  _SundaneseChars.NGALAGENA = {
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
  _SundaneseChars.RARANGKEN = {
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
  _SundaneseChars.RARANGKEN_SONORANT = {
    l: "ᮣ",
    r: "ᮢ",
    y: "ᮡ",
  };
  _SundaneseChars.ANGKA = {
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
  };
})(SundaneseChars || (SundaneseChars = {}));
/* Various type of Latin characters, accessed with a key of Sundanese character */

let LatinChars;

(function (_LatinChars) {
  _LatinChars.SWARA = invertMapping(SundaneseChars.SWARA);
  _LatinChars.NGALAGENA = invertMapping(SundaneseChars.NGALAGENA);
  _LatinChars.RARANGKEN = invertMapping(SundaneseChars.RARANGKEN);
  _LatinChars.RARANGKEN_SONORANT = invertMapping(SundaneseChars.RARANGKEN_SONORANT);
  _LatinChars.ANGKA = invertMapping(SundaneseChars.ANGKA);
})(LatinChars || (LatinChars = {}));

/**
 * @description Provides many helper function to get Sundanese unicode characters from Latin characters
 */

let SundaHelper;

(function (_SundaHelper) {
  _SundaHelper.getMain = (char) => {
    if (char == null) return "";
    if (char in SundaneseChars.SWARA) return SundaneseChars.SWARA[char];
    if (char in SundaneseChars.NGALAGENA) return SundaneseChars.NGALAGENA[char];
    return char;
  };

  _SundaHelper.getSonorant = (char) => {
    if (char == null) return "";
    if (char in SundaneseChars.RARANGKEN_SONORANT) return SundaneseChars.RARANGKEN_SONORANT[char];
    return char;
  };

  _SundaHelper.getRarangken = (char) => {
    if (char == null) return "";
    if (char === "a") return "";
    if (char === "e`") return SundaneseChars.RARANGKEN["é"];
    if (char in SundaneseChars.RARANGKEN) return SundaneseChars.RARANGKEN[char];
    return char;
  };

  _SundaHelper.getFinal = (char) => {
    if (char == null) return "";
    if (char in SundaneseChars.NGALAGENA) return SundaneseChars.NGALAGENA[char] + SundaneseChars.RARANGKEN["pamaeh"];
    return char;
  };

  _SundaHelper.getNumber = (char) => {
    if (char == null) return "";
    if (char in SundaneseChars.ANGKA) return SundaneseChars.ANGKA[char];
    return char;
  };
})(SundaHelper || (SundaHelper = {}));

var SundaHelper$1 = SundaHelper;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * @description A simple class that helps to compile and build the transliterated syllable.
 */
class SyllableBuilder {
  constructor() {
    _defineProperty(this, "result", void 0);

    this.result = "";
  }

  add(input) {
    this.result += input;
  }

  build(input) {
    if (input) this.result = input;
    return this.result;
  }
}

const toSundanese = (input) => {
  /* Normalize input */
  input = input.trim().toLowerCase();
  /*
   * Here, we break down the input on a per syllable basis using RegEx,
   * iterate and feed it into the syllable converter,
   * and append the result to the output string.
   */

  const syllables = [...preferNative(input, RegExp(SundaConst.REGEX.CAPTURE_LATIN, "g"))];
  let output = "";

  if (syllables.length > 0) {
    for (const group of syllables) {
      output += getTransliteration$1(group);
    }
  }

  return output;
};
/**
 * @description Converts the already broken down syllable into Sundanese script
 */

const getTransliteration$1 = (groups) => {
  /* Assign each capture groups into variable names */
  const [
    digits,
    punctuation,
    consonantMain,
    consonantSonorant,
    vowel,
    consonantRarangken,
    consonantFinal,
    consonantStandalone,
  ] = groups.slice(1, 10);
  const builder = new SyllableBuilder();
  /* Converts syllable containing numbers */

  if (digits != null) {
    let numbers = "";

    for (const each of digits) {
      numbers += SundaHelper$1.getNumber(each);
    }

    return builder.build("|" + numbers + "|");
  }
  /* Converts syllable containing punctuations */

  if (punctuation != null) {
    return builder.build(punctuation);
  }
  /* Converts syllable containing main letters */

  if (consonantStandalone == null) {
    if (consonantMain != null) {
      /* Add main consonant */
      builder.add(SundaHelper$1.getMain(consonantMain));
      /* Add sonorant */

      if (consonantSonorant != null) {
        builder.add(SundaHelper$1.getSonorant(consonantSonorant));
      }
      /* Add vowel sign */

      builder.add(SundaHelper$1.getRarangken(vowel));
    } else {
      /* Add standalone vowel character */
      builder.add(SundaHelper$1.getMain(vowel));
    }
    /* Add consonant sign */

    if (consonantRarangken != null) {
      builder.add(SundaHelper$1.getRarangken(consonantRarangken));
    }
    /* Add muted final consonant */

    if (consonantFinal != null) {
      builder.add(SundaHelper$1.getFinal(consonantFinal));
    }
  } else {
    /* Add muted standalone consonant */
    builder.add(SundaHelper$1.getFinal(consonantStandalone));
  }

  return builder.build();
};

/**
 * @description Provides many helper function to get Latin characters from Sundanese characters
 */

let LatinHelper;

(function (_LatinHelper) {
  _LatinHelper.getLetter = (char) => {
    if (char == null) return "";
    if (char in LatinChars.SWARA) return LatinChars.SWARA[char];
    if (char in LatinChars.NGALAGENA) return LatinChars.NGALAGENA[char];
    return char;
  };

  _LatinHelper.getSonorant = (char) => {
    if (char == null) return "";
    if (char in LatinChars.RARANGKEN_SONORANT) return LatinChars.RARANGKEN_SONORANT[char];
    return char;
  };

  _LatinHelper.getRarangken = (char) => {
    if (char == null) return "";
    if (char in LatinChars.RARANGKEN) return LatinChars.RARANGKEN[char];
    return char;
  };

  _LatinHelper.getNumber = (char) => {
    if (char == null) return "";
    if (char in LatinChars.ANGKA) return LatinChars.ANGKA[char];
    return char;
  };
})(LatinHelper || (LatinHelper = {}));

var LatinHelper$1 = LatinHelper;

const toLatin = (input) => {
  /* Trim input */
  input = input.trim();
  /*
   * Here, we break down the input on a per-syllable basis using RegEx,
   * iterate and feed it into the syllable transliterator,
   * and append the result to the output string.
   */

  const syllables = [...preferNative(input, RegExp(SundaConst.REGEX.CAPTURE_SUNDA, "g"))];
  let output = "";

  if (syllables.length > 0) {
    for (const group of syllables) {
      output += getTransliteration(group);
    }
  }

  return output;
};
/**
 * @description Converts the already broken down syllable into Sundanese script
 */

const getTransliteration = (groups) => {
  /* Assign each capture groups into variable names */
  const [angka, notSunda, ngalagena, rarangkenSonorant, rarangkenVowel, swara, rarangkenFinal] = groups.slice(1, 9);
  const builder = new SyllableBuilder();
  /* Converts syllable containing numbers */

  if (angka != null) {
    return builder.build(LatinHelper$1.getNumber(angka));
  }
  /* Converts syllable containing punctuations */

  if (notSunda != null) {
    return builder.build(notSunda);
  }
  /* Converts syllable containing letters */

  if (ngalagena != null) {
    builder.add(LatinHelper$1.getLetter(ngalagena));
    /* Converts muted consonant syllable */

    if (rarangkenVowel === SundaneseChars.RARANGKEN["pamaeh"]) {
      return builder.build();
    }
    /* Converts sonorant rarangken */

    if (rarangkenSonorant != null) {
      builder.add(LatinHelper$1.getSonorant(rarangkenSonorant));
    }
    /* Converts vowel rarangken */

    if (rarangkenVowel != null) {
      builder.add(LatinHelper$1.getRarangken(rarangkenVowel));
    } else {
      builder.add("a");
    }
  } else {
    /* Add muted standalone consonant */
    builder.add(LatinHelper$1.getLetter(swara));
  }

  if (rarangkenFinal != null) {
    builder.add(LatinHelper$1.getRarangken(rarangkenFinal));
  }

  return builder.build();
};

export { LatinHelper$1 as LatinHelper, SundaHelper$1 as SundaHelper, toLatin, toSundanese };
//# sourceMappingURL=index.js.map
