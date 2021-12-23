const fs = require("fs");
const data = fs.readFileSync("map.txt").toString();

const StageInfo = require("./Q1_PrintMapData");
let stage = 1;
let stageInfo = new StageInfo(data, stage);
stageInfo.SaveGameInfo();

let input = [
  "a",
  "aaddwsswddaa",
  "dddddssadwwaasd",
  "dsassdddwwaawasdddssaawsdddwwaawaasdssaw",
  "ssasdrssasdwwwddssasaawdwwddssdsa",
];

class Move {
  constructor(input, data, stage) {
    this.input = input;
    this.data = data;
    this.stage = stage;
    this.stageArray = [];
    this.countTurn = 0;
    this.now = "";
  }

  MakeStage() {
    stageInfo.printArray.forEach((element) => {
      this.stageArray.push(element.split(""));
    });

    this.InputData();

    if (this.stage > 5) {
      return;
    }
  }

  InitPrint() {
    this.stageArray.forEach((e) => {
      console.log(e.join(""));
    });
    console.log(`\nSOKOBAN> ${this.input[this.stage - 1]} (엔터)\n`);
  }

  InputData() {
    this.InitPrint();
    for (
      this.inputArrayIndex = 0;
      this.inputArrayIndex < this.input[this.stage - 1].length;
      this.inputArrayIndex++
    ) {
      this.MovePlayer(this.input[this.stage - 1][this.inputArrayIndex]);
      //clear끝나고 난 뒤
      if (this.stage > 5) return;
      this.PrintStage(this.input[this.stage - 1][this.inputArrayIndex]);

      if (this.stage > 5) {
        return;
      }
    }
  }

  MovePlayer(input) {
    this.stageArray[stageInfo.nowPlayer.x][stageInfo.nowPlayer.y - 1] = " ";

    let playerUp =
      this.stageArray[stageInfo.nowPlayer.x - 1][stageInfo.nowPlayer.y - 1];
    let playerLeft =
      this.stageArray[stageInfo.nowPlayer.x][stageInfo.nowPlayer.y - 2];
    let playerDown =
      this.stageArray[stageInfo.nowPlayer.x + 1][stageInfo.nowPlayer.y - 1];
    let playerRight =
      this.stageArray[stageInfo.nowPlayer.x][stageInfo.nowPlayer.y];

    switch (input) {
      case "w":
        if (playerUp === " " || playerUp === "O") {
          this.now = "위쪽으로 이동합니다.";
          stageInfo.nowPlayer.x--;
          break;
        } else if (playerUp === "#") {
          this.now = "(경고!) 해당 명령을 수행할 수 없습니다.";
          break;
        } else if (playerUp === "o") {
          if (
            this.stageArray[stageInfo.nowPlayer.x - 2][
              stageInfo.nowPlayer.y - 1
            ] === " " ||
            this.stageArray[stageInfo.nowPlayer.x - 2][
              stageInfo.nowPlayer.y - 1
            ] === "O"
          ) {
            if (
              this.stageArray[stageInfo.nowPlayer.x - 2][
                stageInfo.nowPlayer.y - 1
              ] === "O"
            ) {
              this.stageArray[stageInfo.nowPlayer.x - 2][
                stageInfo.nowPlayer.y - 1
              ] = "0";
            } else if (
              this.stageArray[stageInfo.nowPlayer.x - 2][
                stageInfo.nowPlayer.y - 1
              ] === " "
            ) {
              this.stageArray[stageInfo.nowPlayer.x - 2][
                stageInfo.nowPlayer.y - 1
              ] = "o";
            }
            this.now = "위쪽으로 이동합니다.";
            stageInfo.nowPlayer.x--;
            break;
          } else {
            this.now = "(경고!) 해당 명령을 수행할 수 없습니다.";
          }
        } else if (playerUp === "0") {
          if (
            this.stageArray[stageInfo.nowPlayer.x - 2][
              stageInfo.nowPlayer.y - 1
            ] === " "
          ) {
            this.stageArray[stageInfo.nowPlayer.x - 2][
              stageInfo.nowPlayer.y - 1
            ] = "o";
            this.stageArray[stageInfo.nowPlayer.x - 1][
              stageInfo.nowPlayer.y - 1
            ] = "O";
            this.now = "위쪽으로 이동합니다.";
            stageInfo.nowPlayer.x--;
          }
          break;
        }
        break;
      case "a":
        if (playerLeft === " " || playerLeft === "O") {
          this.now = "왼쪽으로 이동합니다.";
          stageInfo.nowPlayer.y--;
          break;
        } else if (playerLeft === "#") {
          this.now = "(경고!) 해당 명령을 수행할 수 없습니다.";
          break;
        } else if (playerLeft === "o") {
          if (
            this.stageArray[stageInfo.nowPlayer.x][
              stageInfo.nowPlayer.y - 3
            ] === " " ||
            this.stageArray[stageInfo.nowPlayer.x][
              stageInfo.nowPlayer.y - 3
            ] === "O"
          ) {
            if (
              this.stageArray[stageInfo.nowPlayer.x][
                stageInfo.nowPlayer.y - 3
              ] === "O"
            ) {
              this.stageArray[stageInfo.nowPlayer.x][
                stageInfo.nowPlayer.y - 3
              ] = "0";
            } else if (
              this.stageArray[stageInfo.nowPlayer.x][
                stageInfo.nowPlayer.y - 3
              ] === " "
            ) {
              this.stageArray[stageInfo.nowPlayer.x][
                stageInfo.nowPlayer.y - 3
              ] = "o";
            }
            this.now = "왼쪽으로 이동합니다.";
            stageInfo.nowPlayer.y--;
            break;
          } else {
            this.now = "(경고!) 해당 명령을 수행할 수 없습니다.";
          }
        } else if (playerLeft === "0") {
          if (
            this.stageArray[stageInfo.nowPlayer.x][
              stageInfo.nowPlayer.y - 3
            ] === " "
          ) {
            this.stageArray[stageInfo.nowPlayer.x][stageInfo.nowPlayer.y - 3] =
              "o";
            this.stageArray[stageInfo.nowPlayer.x][stageInfo.nowPlayer.y - 2] =
              "O";
            this.now = "왼쪽으로 이동합니다.";
            stageInfo.nowPlayer.y--;
          }
          break;
        }
        break;
      case "s":
        if (playerDown === " " || playerDown === "O") {
          this.now = "아래쪽으로 이동합니다.";
          stageInfo.nowPlayer.x++;
          break;
        } else if (playerDown === "#") {
          this.now = "(경고!) 해당 명령을 수행할 수 없습니다.";
          break;
        } else if (playerDown === "o") {
          if (
            this.stageArray[stageInfo.nowPlayer.x + 2][
              stageInfo.nowPlayer.y - 1
            ] === " " ||
            this.stageArray[stageInfo.nowPlayer.x + 2][
              stageInfo.nowPlayer.y - 1
            ] === "O"
          ) {
            if (
              this.stageArray[stageInfo.nowPlayer.x + 2][
                stageInfo.nowPlayer.y - 1
              ] === "O"
            ) {
              this.stageArray[stageInfo.nowPlayer.x + 2][
                stageInfo.nowPlayer.y - 1
              ] = "0";
            } else if (
              this.stageArray[stageInfo.nowPlayer.x + 2][
                stageInfo.nowPlayer.y - 1
              ] === " "
            ) {
              this.stageArray[stageInfo.nowPlayer.x + 2][
                stageInfo.nowPlayer.y - 1
              ] = "o";
            }
            this.now = "아래쪽으로 이동합니다.";
            stageInfo.nowPlayer.x++;
            break;
          } else {
            this.now = "(경고!) 해당 명령을 수행할 수 없습니다.";
          }
        } else if (playerDown === "0") {
          if (
            this.stageArray[stageInfo.nowPlayer.x + 2][
              stageInfo.nowPlayer.y - 1
            ] === " "
          ) {
            this.stageArray[stageInfo.nowPlayer.x + 2][
              stageInfo.nowPlayer.y - 1
            ] = "o";
            this.stageArray[stageInfo.nowPlayer.x + 1][
              stageInfo.nowPlayer.y - 1
            ] = "O";
            this.now = "아래쪽으로 이동합니다.";
            stageInfo.nowPlayer.x++;
          } else if (
            this.stageArray[stageInfo.nowPlayer.x + 2][
              stageInfo.nowPlayer.y - 1
            ] === "O"
          ) {
            this.stageArray[stageInfo.nowPlayer.x + 2][
              stageInfo.nowPlayer.y - 1
            ] = "0";
            this.stageArray[stageInfo.nowPlayer.x + 1][
              stageInfo.nowPlayer.y - 1
            ] = "O";
            this.now = "아래쪽으로 이동합니다.";
            stageInfo.nowPlayer.x++;
          }
          break;
        }
        break;
      case "d":
        if (playerRight === " " || playerRight === "O") {
          this.now = "오른쪽으로 이동합니다.";
          stageInfo.nowPlayer.y++;
          break;
        } else if (playerRight === "#") {
          this.now = "(경고!) 해당 명령을 수행할 수 없습니다.";
          break;
        } else if (playerRight === "o") {
          if (
            this.stageArray[stageInfo.nowPlayer.x][
              stageInfo.nowPlayer.y + 1
            ] === " " ||
            this.stageArray[stageInfo.nowPlayer.x][
              stageInfo.nowPlayer.y + 1
            ] === "O"
          ) {
            if (
              this.stageArray[stageInfo.nowPlayer.x][
                stageInfo.nowPlayer.y + 1
              ] === "O"
            ) {
              this.stageArray[stageInfo.nowPlayer.x][
                stageInfo.nowPlayer.y + 1
              ] = "0";
            } else if (
              this.stageArray[stageInfo.nowPlayer.x][
                stageInfo.nowPlayer.y + 1
              ] === " "
            ) {
              this.stageArray[stageInfo.nowPlayer.x][
                stageInfo.nowPlayer.y + 1
              ] = "o";
            }
            this.now = "오른쪽으로 이동합니다.";
            stageInfo.nowPlayer.y++;
            break;
          } else {
            this.now = "(경고!) 해당 명령을 수행할 수 없습니다.";
          }
        } else if (playerRight === "0") {
          if (
            this.stageArray[stageInfo.nowPlayer.x][
              stageInfo.nowPlayer.y + 1
            ] === " "
          ) {
            this.stageArray[stageInfo.nowPlayer.x][stageInfo.nowPlayer.y + 1] =
              "o";
            this.stageArray[stageInfo.nowPlayer.x][stageInfo.nowPlayer.y] = "O";
            this.now = "오른쪽으로 이동합니다.";
            stageInfo.nowPlayer.y++;
          }
          break;
        }
        break;

      case "q":
        this.now = "프로그램을 종료합니다.";
        break;

      case "r":
        this.now = "@@@@초기화합니다@@@@.";
        this.ClearStage();
        return;

      default:
        this.now = "(경고!) 해당 명령을 수행할 수 없습니다.";
    }

    this.DetectHole();

    this.stageArray[stageInfo.nowPlayer.x][stageInfo.nowPlayer.y - 1] = "P";

    this.PrintHoleAfterPass();
  }

  DetectHole() {
    if (
      this.stageArray[stageInfo.nowPlayer.x][stageInfo.nowPlayer.y - 1] === "O"
    ) {
      //기존 구멍의 위치값이 아직 출력되지 않았다면 다른 변수에 할당하고 현재 플레이어 위치값은 this.holePosition에 덮어쓴다.
      if (this.holePosition) {
        this.holePositionBeforePrint = Object.assign({}, this.holePosition);
      }
      this.holePosition = Object.assign({}, stageInfo.nowPlayer);
    }
  }

  PrintHoleAfterPass() {
    if (
      this.holePosition &&
      this.stageArray[this.holePosition.x][this.holePosition.y - 1] === " "
    ) {
      this.stageArray[this.holePosition.x][this.holePosition.y - 1] = "O";
      this.holePosition = { x: 0, y: 0 };
    }

    if (
      this.holePositionBeforePrint &&
      this.stageArray[this.holePositionBeforePrint.x][
        this.holePositionBeforePrint.y - 1
      ] === " "
    ) {
      this.stageArray[this.holePositionBeforePrint.x][
        this.holePositionBeforePrint.y - 1
      ] = "O";
      this.holePositionBeforePrint = { x: 0, y: 0 };
    }
    return;
  }

  PrintStage(input) {
    let isNaNSuccess = 0;
    this.DetectMove();

    this.stageArray.forEach((element) => {
      for (let i = 0; i < element.length; i++) {
        if (element[i] === "o") isNaNSuccess++;
      }
      console.log(element.join(""));
    });

    if (!isNaNSuccess) {
      this.stage++;

      if (this.stage > 5) {
        console.log(`\n전체 게임을 클리어하셨습니다!\n축하드립니다!`);
        this.PrintCountTurn();
        return;
      } else {
        console.log(`\n축하합니다! Stage ${this.stage - 1} Clear!!`);
        this.PrintCountTurn();
        this.countTurn = 0;
        stageInfo = new StageInfo(this.data, this.stage);
        stageInfo.SaveGameInfo();
        this.stageArray = [];
        this.MakeStage();

        return;
      }
    } else {
      console.log(`\n${input.toUpperCase()}: ${this.now}\n`);
    }
  }

  DetectMove() {
    if (this.now.indexOf("이동")) {
      this.countTurn++;
    }
  }

  PrintCountTurn() {
    console.log(`턴 수: ${this.countTurn}\n`);
  }

  ClearStage() {
    console.log(`\n${this.now}\n`);
    this.input[this.stage - 1] = this.input[this.stage - 1].substring(
      this.inputArrayIndex + 1
    );
    this.countTurn = 0;
    stageInfo = new StageInfo(this.data, this.stage);
    stageInfo.SaveGameInfo();
    this.stageArray = [];
    this.MakeStage();
    return;
  }
}

let move = new Move(input, data, stage);
move.MakeStage();
