const { readLines, printPart1, printPart2 } = require('../utils/utils');

class Bag {
  constructor(rules) {
    this.color = rules.substr(0, rules.indexOf(' bags '));

    this.subBagColorToCountMap = {};
    let containRules = rules.replace(/\.| bags| bag/g, '').split('contain ')[1];
    if (containRules === 'no other') return;
    containRules = containRules.split(', ');
    for (const containRule of containRules) {
      const count = parseInt(containRule.split(' ')[0]);
      const color = containRule.substr(`${count} `.length);
      this.subBagColorToCountMap[color] = count;
    }
  }

  getAllSubBagColorsRecursively(bagColorToBagMap) {
    let bagColors = Object.keys(this.subBagColorToCountMap);
    for (const bagColor of bagColors) {
      const subBagColors = bagColorToBagMap[
        bagColor
      ].getAllSubBagColorsRecursively(bagColorToBagMap);
      bagColors = [...new Set(bagColors.concat(subBagColors))];
    }
    return bagColors;
  }

  getNumberOfSubBags(bagColorToBagMap) {
    let subBagCount = 0;
    for (const bagColor in this.subBagColorToCountMap) {
      const bag = bagColorToBagMap[bagColor];
      subBagCount +=
        (bag.getNumberOfSubBags(bagColorToBagMap) + 1) *
        this.subBagColorToCountMap[bagColor];
    }
    return subBagCount;
  }
}

function part1(bagColorToBagMap) {
  let acceptableBags = [];
  for (const bag of Object.values(bagColorToBagMap)) {
    if (
      bag.getAllSubBagColorsRecursively(bagColorToBagMap).includes('shiny gold')
    ) {
      acceptableBags.push(bag.color);
    }
  }
  return acceptableBags.length;
}

const bags = readLines().map(rules => new Bag(rules));
const bagColorToBagMap = {};
for (const bag of bags) bagColorToBagMap[bag.color] = bag;
printPart1(part1(bagColorToBagMap));
printPart2(bagColorToBagMap['shiny gold'].getNumberOfSubBags(bagColorToBagMap));
