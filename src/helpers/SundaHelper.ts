import { SundaChars } from "../constants/constants";

/**
 * @description Provides many helper function to get Sundanese unicode characters based on the type
 */
namespace SundaHelper {
  /**
   * @description Returns the corresponding main consonant character
   * @param char The character to be transliterated
   */
  export const getMain = (char: string): string => {
    if (char == null) return "";
    if (char in SundaChars.SWARA) return SundaChars.SWARA[char];
    if (char in SundaChars.NGALAGENA) return SundaChars.NGALAGENA[char];
    return char;
  };

  /**
   * @description Returns the corresponding sonorant consonant character
   * @param char The character to be transliterated
   */
  export const getSonorant = (char: string): string => {
    if (char == null) return "";
    if (char in SundaChars.RARANGKEN_SONORANT) return SundaChars.RARANGKEN_SONORANT[char];
    return char;
  };

  /**
   * @description Returns the corresponding rarangken character
   * @param char The character to be transliterated
   */
  export const getRarangken = (char: string): string => {
    if (char == null) return "";
    if (char === "a") return "";
    if (char in SundaChars.RARANGKEN) return SundaChars.RARANGKEN[char];
    return char;
  };

  /**
   * @description Returns the corresponding final (muted) consonant character
   * @param char The character to be transliterated
   */
  export const getFinal = (char: string): string => {
    if (char == null) return "";
    if (char in SundaChars.NGALAGENA)
      return SundaChars.NGALAGENA[char] + SundaChars.RARANGKEN["pamaeh"];
    return char;
  };

  /**
   * @description Returns the corresponding Sundanese number character
   * @param char The character to be transliterated
   */
  export const getNumber = (char: string): string => {
    if (char == null) return "";
    if (char in SundaChars.ANGKA) return SundaChars.ANGKA[char];
    return char;
  };
}

export default SundaHelper;
