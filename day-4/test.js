"use strict";

var assert = require('assert');
var passphrases = require('./high-entropy-passphrases');

describe('No duplicates', function () {
  it('"aa bb cc dd ee" is valid', function () {
    assert(true === passphrases.noDuplicates('aa bb cc dd ee'));
  });


  it('"aa bb cc dd aa" is not valid - the word aa appears more than once', function () {
    assert(false === passphrases.noDuplicates('aa bb cc dd aa'));
  });

  it('"aa bb cc dd aaa" is valid - aa and aaa count as different words', function () {
    assert(true === passphrases.noDuplicates('aa bb cc dd aaa'));
  });
});

describe('No anagrams', function () {
  it('"abcde fghij" is a valid passphrase', function () {
    assert(true === passphrases.noAnagrams('abcde fghij'));
  });

  it('"abcde xyz ecdab" is not valid - the letters from the third word can be rearranged to form the first word', function () {
    assert(false === passphrases.noAnagrams('abcde xyz ecdab'));
  });

  it('"a ab abc abd abf abj" is a valid passphrase, because all letters need to be used when forming another word', function () {
    assert(true === passphrases.noAnagrams('a ab abc abd abf abj'));
  });

  it('"iiii oiii ooii oooi oooo" is valid', function () {
    assert(true === passphrases.noAnagrams('iiii oiii ooii oooi oooo'));
  });

  it('"oiii ioii iioi iiio" is not valid - any of these words can be rearranged to form any other word', function () {
    assert(false === passphrases.noAnagrams('oiii ioii iioi iiio'));
  });
});
