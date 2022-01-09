const fs = require("fs");
const data = fs.readFileSync("map.txt").toString();

class StageInfo {
  constructor(data, stage) {
    this.data = data;
    this.stage = stage;
    this.countStage = 1;
    this.count = {};
    this.dataSplitArray = [];
    this.sliceBeginIndex = 0;
    this.sliceEndIndex;
    this.sliceEnd = [];
    this.player = { x: 0, y: 0 };
    this.nowPlayer = { x: 0, y: 0 };
  }
  SaveGameInfo() {
    this.dataArray = this.data.split("\r\n");

    this.dataArray.forEach((element) => {
      this.dataSplitArray.push(element.split(""));
    });

    for (let r = 0; r < this.dataSplitArray.length; r++) {
      for (let c = 0; c < this.dataSplitArray[r].length; c++) {
        switch (this.dataSplitArray[r][c]) {
          case "#":
            this.dataSplitArray[r][c] = 0;
            break;
          case "O":
            this.dataSplitArray[r][c] = 1;
            break;
          case "o":
            this.dataSplitArray[r][c] = 2;
            break;
          case "P":
            this.dataSplitArray[r][c] = 3;
            break;
          case "=":
            this.dataSplitArray[r][c] = 4;
            if (!this.dataSplitArray[r][c + 1]) {
              this.sliceEnd.push(r);
            }
            break;
        }
      }
    }
    this.CountGameInfo();
  }
  CountGameInfo() {
    this.count = { wall: 0, hall: 0, ball: 0, player: 0 };
    this.width = [];
    this.sliceEndIndex = this.sliceEnd[0];

    this.sliceArray = this.dataSplitArray.slice(
      this.sliceBeginIndex,
      this.sliceEndIndex
    );

    for (let r = 0; r < this.sliceArray.length; r++) {
      for (let c = 0; c < this.sliceArray[r].length; c++) {
        switch (this.sliceArray[r][c]) {
          case 0:
            this.count.wall++;
            break;
          case 1:
            this.count.hall++;
            break;
          case 2:
            this.count.ball++;
            break;
          case 3:
            this.count.player++;
            this.player.x = r;
            this.player.y = c + 1;
            break;
        }
      }

      //단계를 알려주는 문구는 가로길이에 포함하지 않는다.
      if (r > 0) {
        this.width.push(this.sliceArray[r].length);
      }
    }

    this.max = this.width.reduce(function (previous, current) {
      return previous > current ? previous : current;
    });

    this.nowPlayer = { x: this.player.x, y: this.player.y };
    this.PrintGameInfo();
  }

  PrintGameInfo() {
    this.printArray = [];

    for (let r = this.sliceBeginIndex; r < this.sliceEndIndex; r++) {
      for (let c = 0; c < this.dataArray[r].length; c++) {
        if (this.dataArray[r].includes("Stage")) {
          this.printArray.push(`${this.dataArray[r]}\n`);
          break;
        } else if (this.dataArray[r].includes("=")) {
          this.printArray.push("");
          break;
        } else {
          this.printArray.push(`${this.dataArray[r]}`);
          break;
        }
      }
    }

    this.printArray.forEach((e) => {
      console.log(e);
    });

    console.log(`\n가로크기: ${this.max}`);
    console.log(`세로크기: ${this.sliceArray.length - 1}`);
    console.log(`구멍의 수: ${this.count.hall}`);
    console.log(`공의 수: ${this.count.ball}`);
    console.log(`플레이어 위치 (${this.player.x},${this.player.y})\n`);

    this.count = { wall: 0, hall: 0, ball: 0, player: 0 };
    this.player = { x: 0, y: 0 };

    if (this.stage == this.countStage) {
      return;
    }

    if (
      JSON.stringify(this.sliceArray[this.sliceArray.length - 1]) !==
      JSON.stringify(this.dataSplitArray[this.dataSplitArray.length - 1])
    ) {
      this.countStage++;
      this.sliceBeginIndex += this.sliceArray.length + 1;
      if (this.sliceEnd.length > 0) {
        this.sliceEnd.shift();
        if (this.sliceEnd.length == 0) {
          this.sliceEnd.push(this.dataSplitArray.length);
        }
      }

      this.CountGameInfo();
    } else {
      return;
    }
  }
}

const stageInfo = new StageInfo(data, 5);
stageInfo.SaveGameInfo();
module.exports = StageInfo;