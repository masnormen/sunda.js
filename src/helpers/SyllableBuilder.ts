/**
 * @classdesc A simple class that helps to compile and build the transliterated syllable
 */
export class SyllableBuilder {
  result: string;
  constructor() {
    this.result = "";
  }
  add(input: string): void {
    this.result += input;
  }
  build(input?: string): string {
    if (input) this.result = input;
    return this.result;
  }
}
