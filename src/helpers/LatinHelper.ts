import { LatinChars } from "../constants/constants";

/**
 * @description Provides many helper function to get Latin characters from Sundanese characters
 */
namespace LatinHelper {
  /**
   * @description Returns the corresponding Ngalagena and Swara character
   * @param char The character to be transliterated
   */
  export const getLetter = (char: string): string => {
    if (char == null) return "";
    if (char in LatinChars.SWARA) return LatinChars.SWARA[char];
    if (char in LatinChars.NGALAGENA) return LatinChars.NGALAGENA[char];
    return char;
  };

  /**
   * @description Returns the corresponding sonorant consonant character
   * @param char The character to be transliterated
   */
  export const getSonorant = (char: string): string => {
    if (char == null) return "";
    if (char in LatinChars.RARANGKEN_SONORANT) return LatinChars.RARANGKEN_SONORANT[char];
    return char;
  };

  /**
   * @description Returns the corresponding rarangken character
   * @param char The character to be transliterated
   */
  export const getRarangken = (char: string): string => {
    if (char == null) return "";
    if (char in LatinChars.RARANGKEN) return LatinChars.RARANGKEN[char];
    return char;
  };

  /**
   * @description Returns the corresponding Latin number character
   * @param char The character to be transliterated
   */
  export const getNumber = (char: string): string => {
    if (char == null) return "";
    if (char in LatinChars.ANGKA) return LatinChars.ANGKA[char];
    return char;
  };
}

export default LatinHelper;
