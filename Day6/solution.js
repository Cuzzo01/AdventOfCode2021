const fs = require("fs");

const InputFileName = "./input.txt";
const DaysToIterate = 256;
const MAX_FISH_AGE = 8;

const input = fs.readFileSync(InputFileName, "utf-8");
const inputArr = input.split(",");

for (let i = 0; i < inputArr.length; i++) {
  inputArr[i] = parseInt(inputArr[i]);
}
// console.log("Initial State: \t", JSON.stringify(inputArr));

const compressedFish = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
for (let j = 0; j < inputArr.length; j++) {
  const fishAge = inputArr[j];
  if (compressedFish.hasOwnProperty(fishAge)) {
    compressedFish[fishAge]++;
  } else {
    compressedFish[fishAge] = 1;
  }
}
// console.log(`Initial State: \t`, compressedFish);

// Part 1
// console.time('Part 1');
// for (i = 0; i < DaysToIterate; i++) {
//     const fishToIterate = inputArr.length;
//     for (let j = 0; j < fishToIterate; j++) {
//         const fishAge = inputArr[j];
//         if (fishAge === 0) {
//             // spawn new fish
//             inputArr.push(8);
//             // reset age to 6
//             inputArr[j] = 6;
//         } else {
//             inputArr[j]--;
//         }
//     }
//     // console.log(`Day ${i}:`, JSON.stringify(inputArr), `\nCount is ${inputArr.length}`);
//     console.log(`Day ${i}: Count is ${inputArr.length}`);
// }
// console.timeEnd('Part 1');

// Part 2
console.time("Part 2");
for (i = 0; i < DaysToIterate; i++) {
  let fishToSpawn = 0;
  for (let age = 0; age <= MAX_FISH_AGE; age++) {
    if (compressedFish.hasOwnProperty(age)) {
      const fishCount = compressedFish[age];

      if (age === 0) {
        fishToSpawn = fishCount;
      } else if (age === 7) {
        compressedFish[age - 1] = fishCount + fishToSpawn;
      } else {
        compressedFish[age - 1] = fishCount;
      }
      compressedFish[age] = 0;
    }
  }
  compressedFish[MAX_FISH_AGE] = fishToSpawn;

  let totalFish = 0;
  for (let age = 0; age <= MAX_FISH_AGE; age++) {
    if (compressedFish.hasOwnProperty(age)) {
      totalFish += compressedFish[age];
    }
  }
  console.log(`Day ${i}: Count is ${totalFish}`);
  // console.log(`Day ${i}:\n`, compressedFish, `\nCount is ${totalFish}`);
}
console.timeEnd("Part 2");
