import { SundaneseChars } from "../constants/constants";

/**
 * @description Provides many helper function to get Sundanese unicode characters from Latin characters
 */
namespace SundaHelper {
  /**
   * @description Returns the corresponding main consonant character
   * @param char The character to be transliterated
   */
  export const getMain = (char: string): string => {
    if (char == null) return "";
    if (char in SundaneseChars.SWARA) return SundaneseChars.SWARA[char];
    if (char in SundaneseChars.NGALAGENA) return SundaneseChars.NGALAGENA[char];
    return char;
  };

  /**
   * @description Returns the corresponding sonorant consonant character
   * @param char The character to be transliterated
   */
  export const getSonorant = (char: string): string => {
    if (char == null) return "";
    if (char in SundaneseChars.RARANGKEN_SONORANT) return SundaneseChars.RARANGKEN_SONORANT[char];
    return char;
  };

  /**
   * @description Returns the corresponding rarangken character
   * @param char The character to be transliterated
   */
  export const getRarangken = (char: string): string => {
    if (char == null) return "";
    if (char === "a") return "";
    if (char === "e`") return SundaneseChars.RARANGKEN["é"];
    if (char in SundaneseChars.RARANGKEN) return SundaneseChars.RARANGKEN[char];
    return char;
  };

  /**
   * @description Returns the corresponding final (muted) consonant character
   * @param char The character to be transliterated
   */
  export const getFinal = (char: string): string => {
    if (char == null) return "";
    if (char in SundaneseChars.NGALAGENA) return SundaneseChars.NGALAGENA[char] + SundaneseChars.RARANGKEN["pamaeh"];
    return char;
  };

  /**
   * @description Returns the corresponding Sundanese number character
   * @param char The character to be transliterated
   */
  export const getNumber = (char: string): string => {
    if (char == null) return "";
    if (char in SundaneseChars.ANGKA) return SundaneseChars.ANGKA[char];
    return char;
  };
}

export default SundaHelper;
