import { preferNative as matchAll } from "string-match-all";
import SundaHelper from "../helpers/SundaHelper";
import SyllableBuilder from "../helpers/SyllableBuilder";
import { SundaConst } from "../constants/constants";

/**
 * @function toSundanese
 * @description Transliterate a string in Latin characters into its corresponding form in Sundanese script.
 * @param input The input string in Latin to be converted.
 * @returns The converted string in Sundanese script.
 * @example
 * toSundanese("Wih, geulis euy!")
 * // => ᮝᮤᮂ, ᮌᮩᮜᮤᮞ᮪ ᮉᮚ᮪!
 */
const toSundanese = (input: string): string => {
  /* Normalize input */
  input = input.trim().toLowerCase();

  /*
   * Here, we break down the input on a per syllable basis using RegEx,
   * iterate and feed it into the syllable converter,
   * and append the result to the output string.
   */
  const syllables = [...matchAll(input, RegExp(SundaConst.REGEX.CAPTURE_LATIN, "g"))];

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
      numbers += SundaHelper.getNumber(each);
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
      builder.add(SundaHelper.getMain(consonantMain));
      /* Add sonorant */
      if (consonantSonorant != null) {
        builder.add(SundaHelper.getSonorant(consonantSonorant));
      }
      /* Add vowel sign */
      builder.add(SundaHelper.getRarangken(vowel));
    } else {
      /* Add standalone vowel character */
      builder.add(SundaHelper.getMain(vowel));
    }
    /* Add consonant sign */
    if (consonantRarangken != null) {
      builder.add(SundaHelper.getRarangken(consonantRarangken));
    }
    /* Add muted final consonant */
    if (consonantFinal != null) {
      builder.add(SundaHelper.getFinal(consonantFinal));
    }
  } else {
    /* Add muted standalone consonant */
    builder.add(SundaHelper.getFinal(consonantStandalone));
  }
  return builder.build();
};

export default toSundanese;
