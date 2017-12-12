"use strict";

const fs = require('fs');

function noDuplicates(passphrase) {
  return isValidPassphrase(passphrase, function(word1, word2) {
    return word1 !== word2;
  });
}

function noAnagrams(passphrase) {
  return isValidPassphrase(passphrase, function(word1, word2) {
    if (word1.length !== word2.length) return true;
    var letters1 = word1.split('').sort();
    var letters2 = word2.split('').sort();
    for (var i = 0; i < letters1.length; i++) {
      if (letters2[i] !== letters1[i]) return true;
    }
    return false;
  });
}

function isValidPassphrase(passphrase, validityFunction) {
  var words = passphrase.split(' ');
  for (var i = 1; i < words.length; i++) {
    for (var j = 0; j < i; j++) {
      if (!validityFunction(words[i], words[j])) return false;
    }
  }
  return true;
}

function main() {
  fs.readFile('./part1.txt', 'utf8', function(error, data) {
    var passphrases = data.split('\n');
    var validPassphraseCount = 0;
    for (var i = 0 ; i < passphrases.length; i++) {
      if (noDuplicates(passphrases[i])) validPassphraseCount++;
    }
    console.log('Part 1: ' + validPassphraseCount);
  });

  fs.readFile('./part2.txt', 'utf8', function(error, data) {
    var passphrases = data.split('\n');
    var validPassphraseCount = 0;
    for (var i = 0 ; i < passphrases.length; i++) {
      if (noAnagrams(passphrases[i])) validPassphraseCount++;
    }
    console.log('Part 2: ' + validPassphraseCount);
  });
}

if (require.main === module) main();

module.exports.noDuplicates = noDuplicates;
module.exports.noAnagrams = noAnagrams;
