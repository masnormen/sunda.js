# Sunda.js

[![npm](https://img.shields.io/npm/v/sunda.js?color=green)](https://www.npmjs.com/package/sunda.js)
[![size](https://img.shields.io/github/repo-size/masnormen/sunda.js?color=green)](https://github.com/masnormen/sunda.js)
[![madein](https://img.shields.io/badge/made%20in-Indonesia-red)](https://github.com/masnormen/sunda.js)

**Sunda.js** is a small library for converting/transliterating Latin into Sundanese script (Aksara Sunda Baku), or vice versa.

## :eyes: Why this library?

Sunda.js is based off of my other project, [Carakan.js](https://github.com/masnormen/carakanjs/), which is a transliterator library for Javanese script. After researching about the Sundanese script, I found that the Sundanese writing system is similar, and even a lot simpler than the Javanese one. Then, I realized that the same algorithm could be used to transliterate Latin into it. As I see that there's no library for transliterating Latin into Sundanese script yet (and vice versa), I decided to make one.

Sunda.js is also fast. It just needs around ***2 milliseconds*** to convert a simple sentence.

## :open_book: Table of Contents

- [Sunda.js](#sundajs)
  * [:eyes: Why this library?](#eyes-why-this-library)
  * [:open_book: Table of Contents](#open_book-table-of-contents)
  * [:rocket: Features](#rocket-features)
  * [:package: Installation](#package-installation)
  * [:keyboard: Usage](#keyboard-usage)
    + [Latin &rarr; Sundanese using `toSundanese()`](#latin--sundanese-using-tosundanese)
    + [Sundanese &rarr; Latin using `toLatin()`](#sundanese--latin-using-tolatin)
    + [Notes](#notes)
  * [:fire: API](#fire-api)
    + [toSundanese(input)](#tosundaneseinput)
      - [input](#input)
    + [toLatin(input)](#tolatininput)
      - [input](#input-1)
    + [SundaHelper](#sundahelper)
    + [LatinHelper](#latinhelper)
  * [:toolbox: TODO](#toolbox-todo)
  * [:books: References](#books-references)

## :rocket: Features

Currently, Sunda.js can handle these features:

- Aksara Ngalagéna
- Aksara Ngalagéna for foreign sounds (f, q, v, x, z, kh, sy)
- Aksara Swara
- All rarangkén
- Angka
- ...and many more (see the code yourself!)

## :package: Installation

NPM:

```sh
$ npm install sunda.js
```

Yarn:

```sh
$ yarn add sunda.js
```

## :keyboard: Usage

### Latin &rarr; Sundanese using `toSundanese()`

**Basic example**

```js
import { toSundanese } from "sunda.js";

let x = toSundanese("Wih, geulis euy!");
console.log(x)

// => ᮝᮤᮂ, ᮌᮩᮜᮤᮞ᮪ ᮉᮚ᮪!
```

**Writing basic vowels**

```js
let x = toSundanese("pa pi pu pe pé peu po p");
console.log(x)

// => ᮕ ᮕᮤ ᮕᮥ ᮕᮨ ᮕᮦ ᮕᮩ ᮕᮧ ᮕ᮪
```

**Writing various Rerangkén**

```js
let x = toSundanese("Di Klatén, ada santri kyai tebang pohon buah pir");
console.log(x)

// => ᮓᮤ ᮊᮣᮒᮦᮔ᮪, ᮃᮓ ᮞᮔ᮪ᮒᮢᮤ ᮊᮡᮄ ᮒᮨᮘᮀ ᮕᮧᮠᮧᮔ᮪ ᮘᮥᮃᮂ ᮕᮤᮁ
```

**Writing numbers**

```js
// pipe (|) will be automatically added around numbers

let x = toSundanese("tanggal 17 bulan 8 taun 1945");
console.log(x)

// => ᮒᮀᮌᮜ᮪ |᮱᮷| ᮘᮥᮜᮔ᮪ |᮸| ᮒᮅᮔ᮪ |᮱᮹᮴᮵|
```

### Sundanese &rarr; Latin using `toLatin()`

**Basic example**

```js
import { toLatin } from "sunda.js";

let x = toLatin("ᮝᮤᮂ, ᮌᮩᮜᮤᮞ᮪ ᮉᮚ᮪!");
console.log(x)

// => wih, geulis euy!
```

**Detecting rerangkén when converting back to Latin**

```js
let x = toLatin("ᮓᮤ ᮊᮣᮒᮦᮔ᮪, ᮃᮓ ᮞᮔ᮪ᮒᮢᮤ ᮊᮡᮄ ᮒᮨᮘᮀ ᮕᮧᮠᮧᮔ᮪ ᮘᮥᮃᮂ ᮕᮤᮁ");
console.log(x)

// => di klatén, ada santri kyai tebang pohon buah pir
```

**Writing numbers**

```js
// pipe (|) will be automatically removed from around numbers

let x = toLatin("ᮒᮀᮌᮜ᮪ |᮱᮷| ᮘᮥᮜᮔ᮪ |᮸| ᮒᮅᮔ᮪ |᮱᮹᮴᮵|");
console.log(x)

// => tanggal 17 bulan 8 taun 1945
```

### Notes

- In Latin -> Sundanese transliteration, you can use either uppercase (capital) or lowercase. The result will be the same.
- In Sundanese -> Latin transliteration, pipe (|) immediately before and after numbers will be removed.
- Other than pipe (|), all characters that's not Sundanese or Latin character (like dot, comma, semicolon, etc) will be output as it is.

## :fire: API

Sunda.js package exports four things: functions `toSundanese()` & `toLatin()`, and also namespace `SundaHelper` and `LatinHelper` which contains various helper.

### toSundanese(input)

Returns a string of transliterated Sundanese script, given Latin input.

#### input
Type: `string`

A string of Latin character which will be transliterated into Sundanese script. For examples, see the above section.

### toLatin(input)

Returns a string of transliterated Latin script, given Sundanese script input.

#### input
Type: `string`

A string of Sundanese character which will be transliterated into Latin script. For examples, see the above section.

### SundaHelper

A namespace which contains various helper for the engine to convert Latin letters into Sundanese Script.


### LatinHelper

A namespace which contains various helper for the engine to convert Sundanese letters into Latin Script.

## :toolbox: TODO

- [x] support transliteration of Sundanese script back to Latin
- [ ] support more punctuations from ancient Sundanese character (Bindu Surya, Bindu Panglong, etc)

## :books: References

- [Aksara Sunda Baku (Wikipedia ID)](https://id.wikipedia.org/wiki/Aksara_Sunda_Baku)
- [Kairaga](https://www.kairaga.com/)