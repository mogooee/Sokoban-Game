const fs = require("fs");
const data = fs.readFileSync("map.txt").toString();

const StageInfo = require("./Q1_PrintMapData.js");
let stage = 1;
const stageInfo = new StageInfo(data, stage);
stageInfo.SaveGameInfo();

let input = "ddxw";

makeStage();

function makeStage() {
  let stageArray = [];
  stageInfo.printArray.forEach((element) => {
    stageArray.push(element.split(""));
  });

  inputData(stageArray);
}

function initPrint(stageArray) {
  stageArray.forEach((e) => {
    console.log(e.join(""));
  });

  console.log(`\nSOKOBAN> ${input} (엔터)\n`);
}

function inputData(stageArray) {
  initPrint(stageArray);

  for (let i = 0; i < input.length; i++) {
    movePlayer(input[i], stageArray);
    printStage(input[i], stageArray);
  }
}

function movePlayer(input, stageArray) {
  //기존위치에 p를 삭제
  stageArray[stageInfo.nowPlayer.x][stageInfo.nowPlayer.y - 1] = " ";

  // input에 따라 이동을 수행
  switch (input) {
    case "w":
      if (
        stageArray[stageInfo.nowPlayer.x - 1][stageInfo.nowPlayer.y - 1] == " "
      ) {
        now = "위쪽으로 이동합니다.";
        stageInfo.nowPlayer.x--;
        break;
      } else {
        now = "(경고!) 해당 명령을 수행할 수 없습니다.";
      }
      break;
    case "a":
      if (stageArray[stageInfo.nowPlayer.x][stageInfo.nowPlayer.y - 2] == " ") {
        now = "왼쪽으로 이동합니다.";
        stageInfo.nowPlayer.y--;
      } else {
        now = "(경고!) 해당 명령을 수행할 수 없습니다.";
      }
      break;
    case "s":
      if (
        stageArray[stageInfo.nowPlayer.x + 1][stageInfo.nowPlayer.y - 1] == " "
      ) {
        now = "아래쪽으로 이동합니다.";
        stageInfo.nowPlayer.x++;
      } else {
        now = "(경고!) 해당 명령을 수행할 수 없습니다.";
      }
      break;
    case "d":
      if (stageArray[stageInfo.nowPlayer.x][stageInfo.nowPlayer.y] == " ") {
        now = "오른쪽으로 이동합니다.";
        stageInfo.nowPlayer.y++;
      } else {
        now = "(경고!) 해당 명령을 수행할 수 없습니다.";
      }
      break;
    case "q":
      now = "프로그램을 종료합니다.";
      break;
    default:
      now = "(경고!) 해당 명령을 수행할 수 없습니다.";
  }

  stageArray[stageInfo.nowPlayer.x][stageInfo.nowPlayer.y - 1] = "P";
  return;
}

function printStage(input, stageArray) {
  stageArray.forEach((element) => {
    console.log(element.join(""));
  });
  console.log(`\n${input.toUpperCase()}: ${now}\n`);
}
