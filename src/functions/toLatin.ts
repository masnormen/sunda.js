import { preferNative as matchAll } from "string-match-all";
import LatinHelper from "../helpers/LatinHelper";
import SyllableBuilder from "../helpers/SyllableBuilder";
import { SundaConst, SundaneseChars } from "../constants/constants";

/**
 * @function toLatin
 * @description Transliterate a string in Sundanese characters into its corresponding form in Latin.
 * @param input The input string in Sundanese script to be converted.
 * @returns The converted string in Latin.
 * @example
 * toLatin("ᮝᮤᮂ, ᮌᮩᮜᮤᮞ᮪ ᮉᮚ᮪!")
 * // => wih, geulis euy!
 */
const toLatin = (input: string): string => {
  /* Trim input */
  input = input.trim();

  /*
   * Here, we break down the input on a per-syllable basis using RegEx,
   * iterate and feed it into the syllable transliterator,
   * and append the result to the output string.
   */
  const syllables = [...matchAll(input, RegExp(SundaConst.REGEX.CAPTURE_SUNDA, "g"))];

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
const getTransliteration = (groups: RegExpMatchArray): string => {
  /* Assign each capture groups into variable names */
  const [angka, notSunda, ngalagena, rarangkenSonorant, rarangkenVowel, swara, rarangkenFinal] = groups.slice(1, 9);

  const builder = new SyllableBuilder();

  /* Converts syllable containing numbers */
  if (angka != null) {
    return builder.build(LatinHelper.getNumber(angka));
  }

  /* Converts syllable containing punctuations */
  if (notSunda != null) {
    return builder.build(notSunda);
  }

  /* Converts syllable containing letters */
  if (ngalagena != null) {
    builder.add(LatinHelper.getLetter(ngalagena));

    /* Converts muted consonant syllable */
    if (rarangkenVowel === SundaneseChars.RARANGKEN["pamaeh"]) {
      return builder.build();
    }

    /* Converts sonorant rarangken */
    if (rarangkenSonorant != null) {
      builder.add(LatinHelper.getSonorant(rarangkenSonorant));
    }

    /* Converts vowel rarangken */
    if (rarangkenVowel != null) {
      builder.add(LatinHelper.getRarangken(rarangkenVowel));
    } else {
      builder.add("a");
    }
  } else {
    /* Add muted standalone consonant */
    builder.add(LatinHelper.getLetter(swara));
  }

  if (rarangkenFinal != null) {
    builder.add(LatinHelper.getRarangken(rarangkenFinal));
  }

  return builder.build();
};

export default toLatin;
