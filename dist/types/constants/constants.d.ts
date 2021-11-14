declare type CharacterMapping = {
    [char: string]: string;
};
declare namespace SundaConst {
    const REGEX: {
        CAPTURE_LATIN: string;
        CAPTURE_SUNDA: string;
    };
}
declare namespace SundaneseChars {
    const SWARA: CharacterMapping;
    const NGALAGENA: CharacterMapping;
    const RARANGKEN: CharacterMapping;
    const RARANGKEN_SONORANT: CharacterMapping;
    const ANGKA: CharacterMapping;
}
declare namespace LatinChars {
    const SWARA: CharacterMapping;
    const NGALAGENA: CharacterMapping;
    const RARANGKEN: CharacterMapping;
    const RARANGKEN_SONORANT: CharacterMapping;
    const ANGKA: CharacterMapping;
}
export { LatinChars, SundaneseChars, SundaConst };
//# sourceMappingURL=constants.d.ts.map