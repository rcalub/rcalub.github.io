// BETTER COLORS
// const [R, O, G, Y, B, W, Bl] = [
//   "#B90000",
//   "#FF5900",
//   "#009B48",
//   "#FFD500",
//   "#0045AD",
//   "#FFFFFF",
//   "black",
// ];

// FOR TESTING
const [R, O, G, Y, B, W, Bl] = [
  "red",
  "orange",
  "green",
  "yellow",
  "blue",
  "white",
  "black",
];

// SPEED OF SOLVER

let curCanvas;

class Canvas {
  constructor() {
    this._canvas = document.getElementById("tutorial");
    this._ctx = this.canvas.getContext("2d");
    this.onDisplay = null;
    this._sc;
  }

  scaleCanvas() {
    this.canvas.width *= 3;
    this.canvas.height *= 3;
    const [w, h] = [this.canvas.width, this.canvas.height];
    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.ctx.scale(3, 3);
  }

  static setCurCanvas(sc) {
    curCanvas = new Canvas();
    curCanvas.sc = sc;
    curCanvas.scaleCanvas();
  }

  renderGridMarkers() {
    for (let i = 0; i <= this.canvas.height / this.sc; i++) {
      for (let j = 0; j <= this.canvas.width / this.sc; j++) {
        let [x, y] = [j * this.sc, i * this.sc];
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(x, y, this.sc, this.sc);
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, this.sc, this.sc);
        this.ctx.fillStyle = "black";
        this.ctx.font = "4pt serif";
        this.ctx.fillText(`${j},${i}`, x + 1, y + this.sc - 1);
      }
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.onDisplay = null;
  }

  get sc() {
    return this._sc;
  }

  set sc(newSc) {
    this._sc = newSc;
  }

  get canvas() {
    return this._canvas;
  }

  get ctx() {
    return this._ctx;
  }
}

class RubiksCube {
  constructor(front, back, right, left, top, bottom) {
    this.front = front;
    this.back = back;
    this.right = right;
    this.left = left;
    this.top = top;
    this.bottom = bottom;
  }

  addCubeToDisplay() {
    if (curCanvas) {
      if (curCanvas.onDisplay == null) {
        curCanvas.onDisplay = this;
        this.renderCube();
      } else {
        alert("Canvas is populated");
      }
    } else {
      alert("No canvas instatiated");
    }
  }

  renderFace(faceArray, xStart, yStart) {
    let k = 0;
    curCanvas.ctx.translate(xStart * curCanvas.sc, yStart * curCanvas.sc);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let [x, y] = [j * curCanvas.sc, i * curCanvas.sc];
        curCanvas.ctx.fillStyle = faceArray[k];
        curCanvas.ctx.fillRect(x, y, curCanvas.sc, curCanvas.sc);
        curCanvas.ctx.lineWidth = 2;
        curCanvas.ctx.strokeRect(x, y, curCanvas.sc, curCanvas.sc);
        k++;
      }
    }
    curCanvas.ctx.translate(-curCanvas.sc * xStart, -curCanvas.sc * yStart);
  }

  renderCube() {
    this.renderFace(this.front, 3, 3);
    this.renderFace(this.back, 9, 3);
    this.renderFace(this.top, 3, 0);
    this.renderFace(this.bottom, 3, 6);
    this.renderFace(this.left, 0, 3);
    this.renderFace(this.right, 6, 3);
  }

  static displaySolvedCube() {
    const solvedCube = new RubiksCube(
      [R, R, R, R, R, R, R, R, R],
      [O, O, O, O, O, O, O, O, O],
      [B, B, B, B, B, B, B, B, B],
      [G, G, G, G, G, G, G, G, G],
      [W, W, W, W, W, W, W, W, W],
      [Y, Y, Y, Y, Y, Y, Y, Y, Y]
    );

    solvedCube.addCubeToDisplay();
  }

  static inputArrayToColorArray(charArray) {
    let colorArray = [];

    if (charArray.length != 9) {
      return [Bl, Bl, Bl, Bl, Bl, Bl, Bl, Bl, Bl];
    }

    for (let chr of charArray) {
      switch (chr) {
        case "R":
          colorArray.push(R);
          break;
        case "O":
          colorArray.push(O);
          break;
        case "W":
          colorArray.push(W);
          break;
        case "Y":
          colorArray.push(Y);
          break;
        case "G":
          colorArray.push(G);
          break;
        case "B":
          colorArray.push(B);
          break;
        default:
          colorArray.push(Bl);
          break;
      }
    }
    return colorArray;
  }

  // Test Values:
  // Front: YWYWRRYBO
  // Back: BGOYOYGRW
  // Right: RWRYBOYOR
  // Left: WBRGGBGOG
  // Upper: BWWRWOBRG
  // Lower: OYBBYGOGW
  static displayCustomCube() {
    const frontFace = RubiksCube.inputArrayToColorArray(
      document.getElementById("cube-input-front").value.split("")
    );
    const backFace = RubiksCube.inputArrayToColorArray(
      document.getElementById("cube-input-back").value.split("")
    );
    const rightFace = RubiksCube.inputArrayToColorArray(
      document.getElementById("cube-input-right").value.split("")
    );
    const leftFace = RubiksCube.inputArrayToColorArray(
      document.getElementById("cube-input-left").value.split("")
    );
    const topFace = RubiksCube.inputArrayToColorArray(
      document.getElementById("cube-input-top").value.split("")
    );
    const bottomFace = RubiksCube.inputArrayToColorArray(
      document.getElementById("cube-input-bottom").value.split("")
    );
    const newCube = new RubiksCube(
      frontFace,
      backFace,
      rightFace,
      leftFace,
      topFace,
      bottomFace
    );

    newCube.addCubeToDisplay();
  }

  static displayRandomizedCube() {
    const frontFace = [Y, W, Y, W, R, R, Y, B, O];
    const backFace = [B, G, O, Y, O, Y, G, R, W];
    const rightFace = [R, W, R, Y, B, O, Y, O, R];
    const leftFace = [W, B, R, G, G, B, G, O, G];
    const topFace = [B, W, W, R, W, O, B, R, G];
    const bottomFace = [O, Y, B, B, Y, G, O, G, W];

    const newCube = new RubiksCube(
      frontFace,
      backFace,
      rightFace,
      leftFace,
      topFace,
      bottomFace
    );

    newCube.addCubeToDisplay();
  }

  getRotationU() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[u, 0], [u, 2], [u, 8], [u, 6]]));
    p.push(RubiksCube.permutation_to_array([[u, 1], [u, 5], [u, 7], [u, 3]]));
    p.push(RubiksCube.permutation_to_array([[f, 0], [l, 0], [b, 0], [r, 0]]));
    p.push(RubiksCube.permutation_to_array([[f, 1], [l, 1], [b, 1], [r, 1]]));
    p.push(RubiksCube.permutation_to_array([[f, 2], [l, 2], [b, 2], [r, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[1], perm[0], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  //perm 0
  getRotationUPrime() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[u, 0], [u, 2], [u, 8], [u, 6]]));
    p.push(RubiksCube.permutation_to_array([[u, 1], [u, 5], [u, 7], [u, 3]]));
    p.push(RubiksCube.permutation_to_array([[f, 0], [l, 0], [b, 0], [r, 0]]));
    p.push(RubiksCube.permutation_to_array([[f, 1], [l, 1], [b, 1], [r, 1]]));
    p.push(RubiksCube.permutation_to_array([[f, 2], [l, 2], [b, 2], [r, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[0], perm[1], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  getRotationD() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[d, 0], [d, 2], [d, 8], [d, 6]]));
    p.push(RubiksCube.permutation_to_array([[d, 1], [d, 5], [d, 7], [d, 3]]));
    p.push(RubiksCube.permutation_to_array([[f, 6], [r, 6], [b, 6], [l, 6]]));
    p.push(RubiksCube.permutation_to_array([[f, 7], [r, 7], [b, 7], [l, 7]]));
    p.push(RubiksCube.permutation_to_array([[f, 8], [r, 8], [b, 8], [l, 8]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[1], perm[0], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  getRotationDPrime() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[d, 0], [d, 2], [d, 8], [d, 6]]));
    p.push(RubiksCube.permutation_to_array([[d, 1], [d, 5], [d, 7], [d, 3]]));
    p.push(RubiksCube.permutation_to_array([[f, 6], [r, 6], [b, 6], [l, 6]]));
    p.push(RubiksCube.permutation_to_array([[f, 7], [r, 7], [b, 7], [l, 7]]));
    p.push(RubiksCube.permutation_to_array([[f, 8], [r, 8], [b, 8], [l, 8]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[0], perm[1], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  getRotationF() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const p = RubiksCube.getPermF();
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[1], perm[0], oldCube);
      }
    }
    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  getRotationFPrime() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const p = RubiksCube.getPermF();
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[0], perm[1], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  static getPermF() {
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[f, 0], [f, 2], [f, 8], [f, 6]]));
    p.push(RubiksCube.permutation_to_array([[f, 1], [f, 5], [f, 7], [f, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 6], [r, 0], [d, 2], [l, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 7], [r, 3], [d, 1], [l, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 8], [r, 6], [d, 0], [l, 2]]));
    return p;
  }

  getRotationB() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[b, 0], [b, 2], [b, 8], [b, 6]]));
    p.push(RubiksCube.permutation_to_array([[b, 1], [b, 5], [b, 7], [b, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 2], [l, 0], [d, 6], [r, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 1], [l, 3], [d, 7], [r, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 0], [l, 6], [d, 8], [r, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[1], perm[0], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  getRotationBPrime() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[b, 0], [b, 2], [b, 8], [b, 6]]));
    p.push(RubiksCube.permutation_to_array([[b, 1], [b, 5], [b, 7], [b, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 2], [l, 0], [d, 6], [r, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 1], [l, 3], [d, 7], [r, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 0], [l, 6], [d, 8], [r, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[0], perm[1], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  getPermB() {
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[b, 0], [b, 2], [b, 8], [b, 6]]));
    p.push(RubiksCube.permutation_to_array([[b, 1], [b, 5], [b, 7], [b, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 2], [l, 0], [d, 6], [r, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 1], [l, 3], [d, 7], [r, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 0], [l, 6], [d, 8], [r, 2]]));
    return p;
  }

  getRotationL() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[l, 0], [l, 2], [l, 8], [l, 6]]));
    p.push(RubiksCube.permutation_to_array([[l, 1], [l, 5], [l, 7], [l, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 0], [f, 0], [d, 0], [b, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 3], [f, 3], [d, 3], [b, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 6], [f, 6], [d, 6], [b, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[1], perm[0], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  getPermL() {
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    
    let p = []
    p.push(RubiksCube.permutation_to_array([[l, 0], [l, 2], [l, 8], [l, 6]]));
    p.push(RubiksCube.permutation_to_array([[l, 1], [l, 5], [l, 7], [l, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 0], [f, 0], [d, 0], [b, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 3], [f, 3], [d, 3], [b, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 6], [f, 6], [d, 6], [b, 2]]));
    return p;
  }

  getRotationLPrime() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[l, 0], [l, 2], [l, 8], [l, 6]]));
    p.push(RubiksCube.permutation_to_array([[l, 1], [l, 5], [l, 7], [l, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 0], [f, 0], [d, 0], [b, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 3], [f, 3], [d, 3], [b, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 6], [f, 6], [d, 6], [b, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[0], perm[1], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  getRotationR() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[r, 0], [r, 2], [r, 8], [r, 6]]));
    p.push(RubiksCube.permutation_to_array([[r, 1], [r, 5], [r, 7], [r, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 8], [b, 0], [d, 8], [f, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 5], [b, 3], [d, 5], [f, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 2], [b, 6], [d, 2], [f, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[1], perm[0], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  getPermR() {
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];

    let p = [];
    p.push(RubiksCube.permutation_to_array([[r, 0], [r, 2], [r, 8], [r, 6]]));
    p.push(RubiksCube.permutation_to_array([[r, 1], [r, 5], [r, 7], [r, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 8], [b, 0], [d, 8], [f, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 5], [b, 3], [d, 5], [f, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 2], [b, 6], [d, 2], [f, 2]]));
    return p;
  }

  getRotationRPrime() {
    const oldCube = this.createCopy();
    const newCube = this.createCopy();
    const [f, b, r, l, u, d] = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    let p = []
    p.push(RubiksCube.permutation_to_array([[r, 0], [r, 2], [r, 8], [r, 6]]));
    p.push(RubiksCube.permutation_to_array([[r, 1], [r, 5], [r, 7], [r, 3]]));
    p.push(RubiksCube.permutation_to_array([[u, 8], [b, 0], [d, 8], [f, 8]]));
    p.push(RubiksCube.permutation_to_array([[u, 5], [b, 3], [d, 5], [f, 5]]));
    p.push(RubiksCube.permutation_to_array([[u, 2], [b, 6], [d, 2], [f, 2]]));
    for (let cycle of p) {
      for (let perm of cycle) {
        newCube.setPieceColor(perm[0], perm[1], oldCube);
      }
    }

    curCanvas.clearCanvas();
    newCube.addCubeToDisplay();
    return newCube;
  }

  // Input: [face: string, index: int]
  // Output: string: color of piece
  getPiece(pieceIndex) {
    const pieceFace = pieceIndex[0];
    const pieceIdx = pieceIndex[1];
    return this[pieceFace][pieceIdx];
  }

  // Input: [face: string, index: int], [face: string, index: int], oldCube: RubiksCube
  // Output: null
  setPieceColor(newIndex, oldIndex, oldCube) {
    const newFace = newIndex[0];
    const newIdx = newIndex[1];
    this[newFace][newIdx] = oldCube.getPiece(oldIndex);
  }

  // [L0, F0, R0, B0] => [[L0, F0], [F0, R0], [R0, B0], [B0, L0]]
  // Tested: Yes
  static permutation_to_array(permArray) {
    let sentToArray = [];
    for (let i = 0; i < permArray.length - 1; i++) {
      sentToArray.push([permArray[i], permArray[i + 1]]);
    }
    sentToArray.push([permArray[permArray.length - 1], permArray[0]]);

    return sentToArray;
  }

  // Input: null
  // Output: copyCube: RubiksCube
  createCopy() {
    return new RubiksCube(
        [...this.front],
        [...this.back],
        [...this.right],
        [...this.left],
        [...this.top],
        [...this.bottom]
      );
    }

  static scrambleCube() {
    if (!curCanvas.onDisplay) {
      alert("No cube on display, cannot shuffle");
      return;
    }
    const numMoves = Math.floor(Math.random() * 20) + 20;
    RubiksCube.doRandomMove(numMoves);
    return;
  }
  
  // Input: numMoves: int
  // Output: null
  static doRandomMove(numMoves) {
    if (numMoves == 0) {
      return;
    }
    let randomMove = Math.floor(Math.random()*6)
    switch (randomMove) {
      case (0):
        setTimeout(() => curCanvas.onDisplay.getRotationF(), 200);
        break;
      case (1):
        setTimeout(() => curCanvas.onDisplay.getRotationB(), 200);
        break;
      case (2):
        setTimeout(() => curCanvas.onDisplay.getRotationU(), 200);
        break;
      case (3):
        setTimeout(() => curCanvas.onDisplay.getRotationD(), 200);
        break;
      case (4):
        setTimeout(() => curCanvas.onDisplay.getRotationL(), 200);
        break;
      case (5):
        setTimeout(() => curCanvas.onDisplay.getRotationR(), 200);
        break;
      default:
        console.log('no move done');
        break;
    }

    
    RubiksCube.doRandomMove(numMoves - 1);
  }

  // Given a face and index, returns the respective connected edge
  // (References U and D edges on U and D, and horizontal F and B edges of F and B faces)
  // Input: face: string, index: int
  // Output: color: string
  getEdgeConnection(face, index) {
    if (face == 'top') {
      if (index == 1) return this.getPiece(['back', 1]);
      else if (index == 3) return this.getPiece(['left', 1]);
      else if (index == 5) return this.getPiece(['right', 1]);
      else if (index == 7) return this.getPiece(['front', 1]);
    }
    else if (face == 'bottom') {
      if (index == 1) return this.getPiece(['front', 7]);
      else if (index == 3) return this.getPiece(['left', 7]);
      else if (index == 5) return this.getPiece(['right', 7]);
      else if (index == 7) return this.getPiece(['back', 7]);
    }
    else if (face == 'front') {
      if (index == 3) return this.getPiece(['left', 5]);
      else if (index == 5) return this.getPiece(['right', 3]);
    }
    else if (face == 'back') {
      if (index == 3) return this.getPiece(['right', 5]);
      else if (index == 5) return this.getPiece(['left', 3]);
    }
  }

  // CAN BE IMPROVED TO BE MORE READABLE
  // returns the index of the U or D face, F or B face.
  // Input: colorOne: string, colorTwo: string
  // Output: [face: string, i: int]
  getEdgeByColor(colorOne, colorTwo) {
    for (let face in this) {
      if (face == 'top' || face == 'bottom') {
        for (let i = 0; i < this[face].length; i++) {
          if (i % 2 == 1) {
            if (this[face][i] == colorOne) {
              if (this.getEdgeConnection(face, i) == colorTwo) {
                return [face, i];
              }
            }
            else if (this[face][i] == colorTwo) {
              if (this.getEdgeConnection(face, i) == colorOne) {
                return [face, i];
              }
            }
          }
        }
      }
      else if (face == 'front' || face == 'back') {
        for (let i = 0; i < this[face].length; i++) {
          if (i == 3 || i == 5) {
            if (this[face][i] == colorOne) {
              if (this.getEdgeConnection(face, i) == colorTwo) {
                return [face, i];
              }
            }
            else if (this[face][i] == colorTwo) {
              if (this.getEdgeConnection(face, i) == colorOne) {
                return [face, i];
              }
            }
          }
        }
      }
    }
  }

  // Input: face: string, index: int
  // Output: [pieceOne: [face: string, index: int], pieceTwo: [face: string, index: int]]
  getCornerConnection(face, index) {
    if (face == 'top') {
      if (index == 0) return [['left', 0], ['back', 2]];
      else if (index == 2) return [['back', 0], ['right', 2]];
      else if (index == 6) return [['front', 0], ['left', 2]];
      else if (index == 8) return [['right', 0], ['front', 2]];
    }
    else if (face == 'bottom') {
      if (index == 0) return [['left', 8], ['front', 6]];
      else if (index == 2) return [['front', 8], ['right', 6]];
      else if (index == 6) return [['back', 8], ['left', 6]];
      else if (index == 8) return [['right', 8], ['back', 6]];
    }
  }

  // Input: color1: string, color2: string, color3: string
  // Output: pieceIndex: [face: string, i: int]
  findCornerByColor(color1, color2, color3) {
    for (let i = 0; i < 9; i++) {
      if (i == 0 || i == 2 || i == 6 || i == 8 ) {
        if (this.checkCornerMatching(color1, color2, color3, ['top', i])) {
          return ['top', i];
        }
        if (this.checkCornerMatching(color1, color2, color3, ['bottom', i])) {
          return ['bottom', i];
        }
      }
    }
  }

  // Input: color1: string, color2: string, color3: string, cornerPiece: [face: string, index: int]
  // Output: isMatching: boolean
  checkCornerMatching(color1, color2, color3, cornerPiece) {
    const corner1 = this.getPiece(cornerPiece);
    const [cornerIndex2, cornerIndex3] = this.getCornerConnection(cornerPiece[0], cornerPiece[1]);
    const corner2 = this.getPiece(cornerIndex2);
    const corner3 = this.getPiece(cornerIndex3);
    return ((corner1 == color1 && corner2 == color2 && corner3 == color3) ||
            (corner1 == color2 && corner2 == color3 && corner3 == color1) ||
            (corner1 == color3 && corner2 == color1 && corner3 == color2))
  }

  // Input: face: string, userIndex: int ? string
  // Output: pieceOrientation: boolean
  isEdgeOriented(face, userIndex) {
    let index = parseInt(userIndex);
    if (index % 2 == 0) {
      alert("Invalid index for edge");
      return false;
    }
    if (face == 'top') {
      return (this[face][index] == W);
    }
    else if (face == 'bottom') {
      return (this[face][index] == Y);
    }
    else if (face == 'front') {
      return (this[face][index] == R);
    }
    else if (face == 'back') {
      return (this[face][index] == O);
    }
    else {
      alert("Invalid face given");
    }
  }

  // Input: face: string, userIndex: string ? int
  // Output: topValue: int
  checkCornerOrientation(face, userIndex) {
    if (this.isCornerOriented(face, userIndex)) {
      return 0;
    }
  }

  isCornerOriented(face, userIndex) {
    return ((face == 'top' && this[face][userIndex] == W) ||
            (face == 'bottom' && this[face][userIndex] == Y) )
  }

  // Input: null
  // Output: null
  static formCross() {
    // Does red, white edge
    const [faceWR, indexWR] = curCanvas.onDisplay.getEdgeByColor(W, R);
    if (faceWR == 'top') {
      if (indexWR == 1) RubiksCube.doMovesFromArray(['B2', 'D2']);
      else if (indexWR == 3) RubiksCube.doMovesFromArray(['L2', 'D']);
      else if (indexWR == 5) RubiksCube.doMovesFromArray(['R2', 'D\'']);
      else if (indexWR == 7) RubiksCube.doMovesFromArray(['F2']);
    }
    else if (faceWR == 'bottom') {
      if (indexWR == 3) RubiksCube.doMovesFromArray(['D']);
      else if (indexWR == 5) RubiksCube.doMovesFromArray(['D\'']);
      else if (indexWR == 7) RubiksCube.doMovesFromArray(['D2']);
    }
    else if (faceWR == 'front') {
      if (indexWR == 3) RubiksCube.doMovesFromArray(['L', 'D', 'L\'']);
      else if (indexWR == 5) RubiksCube.doMovesFromArray(['R\'', 'D\'', 'R']);
    }
    else if (faceWR == 'back') {
      if (indexWR == 3) RubiksCube.doMovesFromArray(['R', 'D\'', 'R\'']);
      else if (indexWR == 5) RubiksCube.doMovesFromArray(['L\'', 'D', 'L']);
    }
    RubiksCube.doMovesFromArray(['F2']);
    if (!curCanvas.onDisplay.isEdgeOriented('top', 7)) {
      RubiksCube.doMovesFromArray(['F', 'U\'', 'R', 'U']);
    }
    // Does blue, white edge
    const [faceWB, indexWB] = curCanvas.onDisplay.getEdgeByColor(W, B);
    if (faceWB == 'top') {
      if (indexWB == 1) RubiksCube.doMovesFromArray(['B2', 'D\'']);
      else if (indexWB == 3) RubiksCube.doMovesFromArray(['L2', 'D2']);
      else if (indexWB == 5) RubiksCube.doMovesFromArray(['R2']);
      else if (indexWB == 7) RubiksCube.doMovesFromArray(['F2', 'D']);
    }
    else if (faceWB == 'bottom') {
      if (indexWB == 1) RubiksCube.doMovesFromArray(['D']);
      else if (indexWB == 3) RubiksCube.doMovesFromArray(['D2']);
      else if (indexWB == 7) RubiksCube.doMovesFromArray(['D\'']);
    }
    else if (faceWB == 'front') {
      if (indexWB == 3) RubiksCube.doMovesFromArray(['L', 'D2', 'L\'']);
      else if (indexWB == 5) RubiksCube.doMovesFromArray(['R\'', 'D\'', 'R', 'D']);
    }
    else if (faceWB == 'back') {
      if (indexWB == 3) RubiksCube.doMovesFromArray(['R', 'D\'', 'R\'', 'D']);
      else if (indexWB == 5) RubiksCube.doMovesFromArray(['L\'', 'D2', 'L']);
    }
    RubiksCube.doMovesFromArray(['R2']);
    if (!curCanvas.onDisplay.isEdgeOriented('top', 5)) {
      RubiksCube.doMovesFromArray(['R', 'U\'', 'B', 'U']);
    }
    // Does green, white edge
    const [faceWG, indexWG] = curCanvas.onDisplay.getEdgeByColor(W, G);
    if (faceWG == 'top') {
      if (indexWG == 1) RubiksCube.doMovesFromArray(['B2', 'D']);
      else if (indexWG == 3) RubiksCube.doMovesFromArray(['L2']);
      else if (indexWG == 5) RubiksCube.doMovesFromArray(['R2', 'D2']);
      else if (indexWG == 7) RubiksCube.doMovesFromArray(['F2', 'D\'']);
    }
    else if (faceWG == 'bottom') {
      if (indexWG == 1) RubiksCube.doMovesFromArray(['D\'']);
      else if (indexWG == 5) RubiksCube.doMovesFromArray(['D2']);
      else if (indexWG == 7) RubiksCube.doMovesFromArray(['D']);
    }
    else if (faceWG == 'front') {
      if (indexWG == 3) RubiksCube.doMovesFromArray(['L', 'D', 'L\'', 'D\'']);
      else if (indexWG == 5) RubiksCube.doMovesFromArray(['R\'', 'D2', 'R']);
    }
    else if (faceWG == 'back') {
      if (indexWG == 3) RubiksCube.doMovesFromArray(['R', 'D2', 'R\'']);
      else if (indexWG == 5) RubiksCube.doMovesFromArray(['L\'', 'D\'', 'L', 'D']);
    }
    RubiksCube.doMovesFromArray(['L2']);
    if (!curCanvas.onDisplay.isEdgeOriented('top', 3)) {
      RubiksCube.doMovesFromArray(['L', 'U\'', 'F', 'U']);
    }
    // Does orange, white edge
    const [faceWO, indexWO] = curCanvas.onDisplay.getEdgeByColor(W, O);
    if (faceWO == 'top') {
      if (indexWO == 1) RubiksCube.doMovesFromArray(['B2']);
      else if (indexWO == 3) RubiksCube.doMovesFromArray(['L2', 'D']);
      else if (indexWO == 5) RubiksCube.doMovesFromArray(['R2', 'D\'']);
      else if (indexWO == 7) RubiksCube.doMovesFromArray(['F2', 'D2']);
    }
    else if (faceWO == 'bottom') {
      if (indexWO == 1) RubiksCube.doMovesFromArray(['D2']);
      else if (indexWO == 3) RubiksCube.doMovesFromArray(['D\'']);
      else if (indexWO == 5) RubiksCube.doMovesFromArray(['D']);
    }
    else if (faceWO == 'front') {
      if (indexWO == 3) RubiksCube.doMovesFromArray(['L', 'D\'', 'L\'']);
      else if (indexWO == 5) RubiksCube.doMovesFromArray(['R\'', 'D', 'R']);
    }
    else if (faceWO == 'back') {
      if (indexWO == 3) RubiksCube.doMovesFromArray(['R', 'D', 'R\'']);
      else if (indexWO == 5) RubiksCube.doMovesFromArray(['L\'', 'D\'', 'L']);
    }
    RubiksCube.doMovesFromArray(['B2']);
    if (!curCanvas.onDisplay.isEdgeOriented('top', 1)) {
      RubiksCube.doMovesFromArray(['B', 'U\'', 'L', 'U']);
    }
  }
 
  // Input: null
  // Output: null
  static permuteWhiteCorners() {
    // Do WGO Corner
    const [faceWGO, indexWGO] = curCanvas.onDisplay.findCornerByColor(W, G, O);
    if (faceWGO == 'top') {
      if (indexWGO == 2) {
        RubiksCube.doMovesFromArray(['B\'', 'D\'', 'B', 'D']); //Moves it into bottom layer
        RubiksCube.doMovesFromArray(['D']); //Moves it into B[6]
      }
      else if (indexWGO == 6) {
        RubiksCube.doMovesFromArray(['L', 'D', 'L\'', 'D\'']); //Moves it into bottom layer
        RubiksCube.doMovesFromArray(['D\'']); //Moves it into B[6]
      }
      else if (indexWGO == 8) {
        RubiksCube.doMovesFromArray(['R\'', 'D\'', 'R', 'D']); //Moves it into bottom layer
        RubiksCube.doMovesFromArray(['D2']); //Moves it into B[6]
      }
    }
    else if (faceWGO == 'bottom') {
      if (indexWGO == 0) {
        RubiksCube.doMovesFromArray(['D\'']); //Moves it into B[6]
      }
      else if (indexWGO == 2) {
        RubiksCube.doMovesFromArray(['D2']); //Moves it into B[6]
      }
      else if (indexWGO == 8) {
        RubiksCube.doMovesFromArray(['D']); //Moves it into B[6]
      }
    }
    if (!(faceWGO == 'top' && indexWGO == 0)) RubiksCube.doMovesFromArray(['B', 'D', 'B\'']); // Slots into U[0]

    // Do WOB Corner
    const [faceWOB, indexWOB] = curCanvas.onDisplay.findCornerByColor(W, O, B);
    if (faceWOB == 'top') {
      if (indexWOB == 0) {
        RubiksCube.doMovesFromArray(['B', 'D', 'B\'', 'D\'']); // Moves to bottom layer
        RubiksCube.doMovesFromArray(['D\'']); // Moves piece into B[8]
      }
      else if (indexWOB == 6) {
        RubiksCube.doMovesFromArray(['L', 'D', 'L\'', 'D\'']); // Moves to bottom layer
        RubiksCube.doMovesFromArray(['D2']); // Moves piece into B[8]
      }
      else if (indexWOB == 8) {
        RubiksCube.doMovesFromArray(['R\'', 'D\'', 'R', 'D']); // Moves to bottom layer
        RubiksCube.doMovesFromArray(['D']); // Moves piece into B[8]
      }
    }
    else if (faceWOB == 'bottom') {
      if (indexWOB == 0) {
        RubiksCube.doMovesFromArray(['D2']); // Moves piece into B[8]
      }
      else if (indexWOB == 2) {
        RubiksCube.doMovesFromArray(['D2']); // Moves piece into B[8]
      }
      else if (indexWOB == 6) {
        RubiksCube.doMovesFromArray(['D\'']); // Moves piece into B[8]
      }
    }
    // move over from b[6]
    if (!(faceWOB == 'top' && indexWOB == 2)) RubiksCube.doMovesFromArray(['B\'', 'D\'', 'B']);
    // Do WRG Corner
    const [faceWRG, indexWRG] = curCanvas.onDisplay.findCornerByColor(W, R, G);
    if (faceWRG == 'top') {
      if (indexWRG == 0) {
        RubiksCube.doMovesFromArray(['B', 'D', 'B\'', 'D\'']); // Moves to bottom layer
        RubiksCube.doMovesFromArray(['D']); // Moves piece into B[0]
      }
      else if (indexWRG == 2) {
        RubiksCube.doMovesFromArray(['B\'', 'D\'', 'B', 'D']); //Moves it into bottom layer
        RubiksCube.doMovesFromArray(['D2']); //Moves it into B[0]
      }
      else if (indexWRG == 8) {
        RubiksCube.doMovesFromArray(['R\'', 'D\'', 'R', 'D']); // Moves to bottom layer
        RubiksCube.doMovesFromArray(['D\'']); // Moves piece into B[0]
      }
    }
    else if (faceWRG == 'bottom') {
      if (indexWRG == 2) {
        RubiksCube.doMovesFromArray(['D\'']); // Moves piece into B[0]
      }
      else if (indexWRG == 6) {
        RubiksCube.doMovesFromArray(['D']); // Moves piece into B[0]
      }
      else if (indexWRG == 8) {
        RubiksCube.doMovesFromArray(['D2']); // Moves piece into B[0]
      }
    }
    // move over from b[6]
    if(!(faceWRG == 'top' && indexWRG == 6)) RubiksCube.doMovesFromArray(['L', 'D', 'L\'']);
    // Do WBR Corner
    const [faceWBR, indexWBR] = curCanvas.onDisplay.findCornerByColor(W, B, R);
    if (faceWBR == 'top') {
      if (indexWBR == 0) {
        RubiksCube.doMovesFromArray(['B', 'D', 'B\'', 'D\'']); // Moves to bottom layer
        RubiksCube.doMovesFromArray(['D2']); // Moves piece into B[2]
      }
      else if (indexWBR == 2) {
        RubiksCube.doMovesFromArray(['B\'', 'D\'', 'B', 'D']); //Moves it into bottom layer
        RubiksCube.doMovesFromArray(['D\'']); //Moves it into B[2]
      }
      else if (indexWBR == 6) {
        RubiksCube.doMovesFromArray(['L', 'D', 'L\'', 'D\'']); // Moves to bottom layer
        RubiksCube.doMovesFromArray(['D']); // Moves piece into B[2]
      }
    }
    else if (faceWBR == 'bottom') {
      if (indexWBR == 0) {
        RubiksCube.doMovesFromArray(['D']); // Moves piece into B[2]
      }
      else if (indexWBR == 6) {
        RubiksCube.doMovesFromArray(['D2']); // Moves piece into B[2]
      }
      else if (indexWBR == 8) {
        RubiksCube.doMovesFromArray(['D\'']); // Moves piece into B[2]
      }
    }
    // move over from b[6]
    if(!(faceWBR == 'top' && indexWBR == 8)) RubiksCube.doMovesFromArray(['R\'', 'D\'', 'R']);
  }

  // Input: null
  // Output: null
  static rotateWhiteCorners() {
    let count = 0; // Variable to ensure no endless loop

    // Solves WGO corner
    while (!curCanvas.onDisplay.isCornerOriented('top', 0)) {
      RubiksCube.doMovesFromArray(['L\'', 'D\'', 'L', 'D']);
      if (count > 6) {
        alert('Unable to solve WGO Corner');
        break;
      }
      count++;
    }

    // Solves WOB corner
    count = 0;
    while (!curCanvas.onDisplay.isCornerOriented('top', 2)) {
      RubiksCube.doMovesFromArray(['B\'', 'D\'', 'B', 'D']);
      if (count > 7) {
        alert('Unable to solve WOB Corner');
        break;
      }
      count++;
    }

    // Solves WRG corner
    count = 0;
    while (!curCanvas.onDisplay.isCornerOriented('top', 6)) {
      RubiksCube.doMovesFromArray(['F\'', 'D\'', 'F', 'D']);
      if (count > 7) {
        alert('Unable to solve WRG Corner');
        break;
      }
      count++;
    }

    // Solves WBR corner
    count = 0;
    while (!curCanvas.onDisplay.isCornerOriented('top', 8)) {
      RubiksCube.doMovesFromArray(['R\'', 'D\'', 'R', 'D']);
      if (count > 7) {
        alert('Unable to solve WBR Corner');
        break;
      }
      count++;
    }
  }

  static solveSecondLayer() {
    // Solves RB Edge
    const [faceRB, indexRB] = curCanvas.onDisplay.getEdgeByColor(R, B);
    const orientationRB = curCanvas.onDisplay.getPiece(['front', 5]);
    if (faceRB == 'front' && indexRB == 5 && orientationRB == R) {
      //console.log('RB Solved');
    }
    else {
      if (faceRB == 'front') {
        if (indexRB == 3) {
          RubiksCube.doMovesFromArray(['D', 'L', 'D\'', 'L\'', 'D\'', 'F\'', 'D', 'F']);
          RubiksCube.doMovesFromArray(['D2']);
        }
        else if (indexRB == 5) {
          RubiksCube.doMovesFromArray(['D', 'F', 'D\'', 'F\'', 'D\'', 'R\'', 'D', 'R']);
          RubiksCube.doMovesFromArray(['D']);
        }
      }
      else if (faceRB == 'back') {
        if (indexRB == 3) {
          RubiksCube.doMovesFromArray(['D', 'R', 'D\'', 'R\'', 'D\'', 'B\'', 'D', 'B']);
        }
        else if (indexRB == 5) {
          RubiksCube.doMovesFromArray(['D', 'B', 'D\'', 'B\'', 'D\'', 'L\'', 'D', 'L']);
          RubiksCube.doMovesFromArray(['D\'']);
        }
      }
      else if (faceRB == 'bottom') {
        if (indexRB == 1) {
          // Do nothing
        }
        else if (indexRB == 3) {
          RubiksCube.doMovesFromArray(['D']);
        }
        else if (indexRB == 5) {
          RubiksCube.doMovesFromArray(['D\'']);
        }
        else if (indexRB == 7) {
          RubiksCube.doMovesFromArray(['D2']);
        }
      }
      const topColorRB = curCanvas.onDisplay.getPiece(['bottom', 1]);
      if (topColorRB ==  B) {
        RubiksCube.doMovesFromArray(['D\'', 'R\'', 'D', 'R', 'D', 'F', 'D\'', 'F\'']);
      }
      else {
        RubiksCube.doMovesFromArray(['D']);
        RubiksCube.doMovesFromArray(['D', 'F', 'D\'', 'F\'', 'D\'', 'R\'', 'D', 'R']);
      }
    }

    // Solves RG Edge
    const [faceRG, indexRG] = curCanvas.onDisplay.getEdgeByColor(R, G);
    const orientationRG = curCanvas.onDisplay.getPiece(['front', 3]);
    if (faceRG == 'front' && indexRG == 3 && orientationRG == R) {
      //console.log('RG Solved');
    }
    else {
      if (faceRG == 'front') {
        if (indexRG == 3) {
          RubiksCube.doMovesFromArray(['D', 'L', 'D\'', 'L\'', 'D\'', 'F\'', 'D', 'F']);
          RubiksCube.doMovesFromArray(['D']);
        }
        else if (indexRG == 5) {
          RubiksCube.doMovesFromArray(['D', 'F', 'D\'', 'F\'', 'D\'', 'R\'', 'D', 'R']);
        }
      }
      else if (faceRG == 'back') {
        if (indexRG == 3) {
          RubiksCube.doMovesFromArray(['D', 'R', 'D\'', 'R\'', 'D\'', 'B\'', 'D', 'B']);
          RubiksCube.doMovesFromArray(['D\'']);
        }
        else if (indexRG == 5) {
          RubiksCube.doMovesFromArray(['D', 'B', 'D\'', 'B\'', 'D\'', 'L\'', 'D', 'L']);
          RubiksCube.doMovesFromArray(['D2']);
        }
      }
      else if (faceRG == 'bottom') {
        if (indexRG == 1) {
          RubiksCube.doMovesFromArray(['D\'']);
        }
        else if (indexRG == 3) {
          // Do nothing
        }
        else if (indexRG == 5) {
          RubiksCube.doMovesFromArray(['D2']);
        }
        else if (indexRG == 7) {
          RubiksCube.doMovesFromArray(['D']);
        }
      }
      const topColorRG = curCanvas.onDisplay.getPiece(['bottom', 3]);
      if (topColorRG ==  R) {
        RubiksCube.doMovesFromArray(['D\'', 'F\'', 'D', 'F', 'D', 'L', 'D\'', 'L\'']);
      }
      else {
        RubiksCube.doMovesFromArray(['D']);
        RubiksCube.doMovesFromArray(['D', 'L', 'D\'', 'L\'', 'D\'', 'F\'', 'D', 'F']);
      }
    }

    // Solves OB Edge
    const [faceOB, indexOB] = curCanvas.onDisplay.getEdgeByColor(O, B);
    const orientationOB = curCanvas.onDisplay.getPiece(['back', 3]);
    if (faceOB == 'back' && indexOB == 3 && orientationOB == O) {
      //console.log('OB Solved');
    }
    else {
      if (faceOB == 'front') {
        if (indexOB == 3) {
          RubiksCube.doMovesFromArray(['D', 'L', 'D\'', 'L\'', 'D\'', 'F\'', 'D', 'F']);
        }
        else if (indexOB == 5) {
          RubiksCube.doMovesFromArray(['D', 'F', 'D\'', 'F\'', 'D\'', 'R\'', 'D', 'R']);
          RubiksCube.doMovesFromArray(['D\'']);
        }
      }
      else if (faceOB == 'back') {
        if (indexOB == 3) {
          RubiksCube.doMovesFromArray(['D', 'R', 'D\'', 'R\'', 'D\'', 'B\'', 'D', 'B']);
          RubiksCube.doMovesFromArray(['D2']);
        }
        else if (indexRG == 5) {
          RubiksCube.doMovesFromArray(['D', 'B', 'D\'', 'B\'', 'D\'', 'L\'', 'D', 'L']);
          RubiksCube.doMovesFromArray(['D']);
        }
      }
      else if (faceOB == 'bottom') {
        if (indexOB == 1) {
          RubiksCube.doMovesFromArray(['D2']);
        }
        else if (indexOB == 3) {
          RubiksCube.doMovesFromArray(['D\'']);
        }
        else if (indexOB == 5) {
          RubiksCube.doMovesFromArray(['D']);
        }
        else if (indexOB == 7) {
          // Do nothing
        }
      }
      const topColorOB = curCanvas.onDisplay.getPiece(['bottom', 7]);
      if (topColorOB ==  B) {
        RubiksCube.doMovesFromArray(['D', 'R', 'D\'', 'R\'', 'D\'', 'B\'', 'D', 'B']);
      }
      else {
        RubiksCube.doMovesFromArray(['D\'']);
        RubiksCube.doMovesFromArray(['D\'', 'B\'', 'D', 'B', 'D', 'R', 'D\'', 'R\'']);
      }
    }

    // Solves OG Edge
    const [faceOG, indexOG] = curCanvas.onDisplay.getEdgeByColor(O, G);
    const orientationOG = curCanvas.onDisplay.getPiece(['back', 5]);
    if (faceOG == 'back' && indexOG == 5 && orientationOG == O) {
      //console.log('OG Solved');
    }
    else {
      if (faceOG == 'front') {
        if (indexOG == 3) {
          RubiksCube.doMovesFromArray(['D', 'L', 'D\'', 'L\'', 'D\'', 'F\'', 'D', 'F']);
        }
        else if (indexOG == 5) {
          RubiksCube.doMovesFromArray(['D', 'F', 'D\'', 'F\'', 'D\'', 'R\'', 'D', 'R']);
          RubiksCube.doMovesFromArray(['D\'']);
        }
      }
      else if (faceOG == 'back') {
        if (indexOG == 3) {
          RubiksCube.doMovesFromArray(['D', 'R', 'D\'', 'R\'', 'D\'', 'B\'', 'D', 'B']);
          RubiksCube.doMovesFromArray(['D2']);
        }
        else if (indexRG == 5) {
          RubiksCube.doMovesFromArray(['D', 'B', 'D\'', 'B\'', 'D\'', 'L\'', 'D', 'L']);
          RubiksCube.doMovesFromArray(['D']);
        }
      }
      else if (faceOG == 'bottom') {
        if (indexOG == 1) {
          RubiksCube.doMovesFromArray(['D2']);
        }
        else if (indexOG == 3) {
          RubiksCube.doMovesFromArray(['D\'']);
        }
        else if (indexOG == 5) {
          RubiksCube.doMovesFromArray(['D']);
        }
        else if (indexOG == 7) {
          // Do nothing
        }
      }
      const topColorOG = curCanvas.onDisplay.getPiece(['bottom', 7]);
      if (topColorOG ==  G) {
        RubiksCube.doMovesFromArray(['D\'', 'L\'', 'D', 'L', 'D', 'B', 'D\'', 'B\'']);
      }
      else {
        RubiksCube.doMovesFromArray(['D']);
        RubiksCube.doMovesFromArray(['D', 'B', 'D\'', 'B\'', 'D\'', 'L\'', 'D', 'L']);
      }
    }
  }
  
  // Input: null
  // Output: Returns the shape of the yellow pieces on the bottom face ('D'- dot, 'S'- straight line, 'L'- L-shape, 'C'- Cross)
  getTopShape() {
    const [y1, y3, y5, y7] = [this.getPiece(['bottom', 1]), this.getPiece(['bottom', 3]), this.getPiece(['bottom', 5]), this.getPiece(['bottom', 7])]

    if (y1 != Y && y3 != Y && y5 != Y && y7 != Y) {
      return 'D';
    }
    else if (y1 == Y && y3 == Y && y5 == Y && y7 == Y) {
      return 'C';
    }
    else if ((y1 == Y && y5 != Y && y3 != Y && y7 == Y) || (y1 != Y && y3 == Y && y5 == Y && y7 != Y)) {
      return 'S';
    }
    else {
      return 'L';
    }
  }

  static formYellowCross() {
    const topShape = curCanvas.onDisplay.getTopShape();
    const crossAlgorithm = ['B', 'R', 'D', 'R\'', 'D\'', 'B\''];

    if (topShape == 'D') {
      RubiksCube.doMovesFromArray(crossAlgorithm);
      RubiksCube.doMovesFromArray(['D2']);
      RubiksCube.doMovesFromArray(crossAlgorithm);
      RubiksCube.doMovesFromArray(crossAlgorithm);
    }

    else if (topShape == 'S') {
      if (curCanvas.onDisplay.getPiece(['bottom', 7]) ==  Y) {
        RubiksCube.doMovesFromArray(['D']);
      }
      RubiksCube.doMovesFromArray(crossAlgorithm);
    }

    else if (topShape == 'L') {
      let [bottom1, bottom3] = [curCanvas.onDisplay.getPiece(['bottom', 1]), curCanvas.onDisplay.getPiece(['bottom', 3])];
      let count = 0;
      while ((bottom1 != Y || bottom3 != Y)) {
        if (count > 4) {
          alert('Loop encountered in forming yellow cross');
          return;
        }
        RubiksCube.doMovesFromArray(['D']);
        [bottom1, bottom3] = [curCanvas.onDisplay.getPiece(['bottom', 1]), curCanvas.onDisplay.getPiece(['bottom', 3])];
        count++;
      }
      RubiksCube.doMovesFromArray(crossAlgorithm);
      RubiksCube.doMovesFromArray(crossAlgorithm);
    }
  }

  static permuteLastEdges() {
    let backEdge = curCanvas.onDisplay.getPiece(['back', 7]);
    let count = 0;
    const swapEdge = (['R', 'D', 'R\'', 'D', 'R', 'D2', 'R\'', 'D'])
    // Moves to orange edge
    while (backEdge != O) {
      if (count > 5) {
        console.log('Permute last edge error');
        return;
      }
      RubiksCube.doMovesFromArray(['D\'']);
      backEdge = curCanvas.onDisplay.getPiece(['back', 7]);
      count++;
    }
    // Moves to YG cubie
    RubiksCube.doMovesFromArray(['D\'']);
    // Checks YG cubie if correct
    backEdge = curCanvas.onDisplay.getPiece(['back', 7]);
    // If not YG cube, swap with piece on L
    if (backEdge != G) {
      RubiksCube.doMovesFromArray(swapEdge);
      backEdge = curCanvas.onDisplay.getPiece(['back', 7]);
      if (backEdge != G) {
        RubiksCube.doMovesFromArray(['D\'']);
        RubiksCube.doMovesFromArray(swapEdge);
        RubiksCube.doMovesFromArray(['D'])
        RubiksCube.doMovesFromArray(swapEdge);
      }
    }
    RubiksCube.doMovesFromArray(['D\'']);
    backEdge = curCanvas.onDisplay.getPiece(['back', 7]);
    if (backEdge != R) {
      RubiksCube.doMovesFromArray(swapEdge);
    }
    backEdge = curCanvas.onDisplay.getPiece(['back', 7]);
    count = 0;
    while (backEdge != O) {
      if (count > 5) {
        console.log('Permute last edge error');
        return;
      }
      RubiksCube.doMovesFromArray(['D\'']);
      backEdge = curCanvas.onDisplay.getPiece(['back', 7]);
      count++;
    }
  }

  static permuteLastCorners(count) {
    let cornerYBO = curCanvas.onDisplay.findCornerByColor(Y, B, O); // Should be 2
    let cornerYOG = curCanvas.onDisplay.findCornerByColor(Y, O, G); // Should be 8
    let cornerYGR = curCanvas.onDisplay.findCornerByColor(Y, G, R); // Should be 6
    let cornerYRB = curCanvas.onDisplay.findCornerByColor(Y, R, B); // Should be 0
    const swapCorners = ['D', 'R', 'D\'', 'L\'', 'D', 'R\'', 'D\'', 'L'];
    if (count > 3) {
      console.log('permute last corners error');
      return;
    }
    if (cornerYBO[1] == 8 && cornerYOG[1] == 6 && cornerYGR[1] == 0 && cornerYRB[1] == 2) {
      return;
    }
    else if (cornerYBO[1] == 8) {
      RubiksCube.doMovesFromArray(swapCorners);
      cornerYOG = curCanvas.onDisplay.findCornerByColor(Y, O, G);
      if (cornerYOG[1] != 6) {
        RubiksCube.doMovesFromArray(swapCorners)
      }
    }
    else if (cornerYOG[1] == 6) {
      RubiksCube.doMovesFromArray(['D\''])
      RubiksCube.doMovesFromArray(swapCorners);
      cornerYGR = curCanvas.onDisplay.findCornerByColor(Y, G, R)
      if (cornerYGR[1] != 6) {
        RubiksCube.doMovesFromArray(swapCorners)
      }
      RubiksCube.doMovesFromArray(['D'])
    }
    else if (cornerYGR[1] == 0) {
      RubiksCube.doMovesFromArray(['D2']);
      RubiksCube.doMovesFromArray(swapCorners);
      cornerYRB = curCanvas.onDisplay.findCornerByColor(Y, R, B);
      if (cornerYRB[1] != 6) {
        RubiksCube.doMovesFromArray(swapCorners)
      }
      RubiksCube.doMovesFromArray(['D2']);
    }
    else if (cornerYRB[1] == 0) {
      RubiksCube.doMovesFromArray(['D']);
      RubiksCube.doMovesFromArray(swapCorners);
      cornerYBO = curCanvas.onDisplay.findCornerByColor(Y, B, O); 
      if (cornerYBO[1] != 6) {
        RubiksCube.doMovesFromArray(swapCorners)
      }
      RubiksCube.doMovesFromArray(['D\'']);
    }
    else {
      RubiksCube.doMovesFromArray(swapCorners);
      RubiksCube.permuteLastCorners(count++);
    }
  }

  static orientLastEdges() {
    const flipEdge = ['R', 'U', 'R\'', 'U\''];
    let count = 0;
    let check = 0;
    if ((curCanvas.onDisplay.bottom)[0] != Y) {
      count++;
    }
    if ((curCanvas.onDisplay.bottom)[2] != Y) {
      count++;
    }
    if ((curCanvas.onDisplay.bottom)[6] != Y) {
      count++;
    }
    if ((curCanvas.onDisplay.bottom)[8] != Y) {
      count++;
    }
    while (count != 0) {
      check = 0;
      if (curCanvas.onDisplay.bottom[2] == Y) {
        count--;
        RubiksCube.doMovesFromArray(['D\''])
      }
      while (curCanvas.onDisplay.bottom[2] != Y) {
        if (check > 7) {
          console.log('Permute last corner error');
          return;
        }
        RubiksCube.doMovesFromArray(flipEdge)
        check++;
      }
    }
    return;
  }

  // Input: null
  // Output: null
  static solveCube() {
    let count = 0;
    RubiksCube.formCross(); // Done
    RubiksCube.permuteWhiteCorners(); // Done
    RubiksCube.rotateWhiteCorners(); // Done
    RubiksCube.solveSecondLayer(); // Done
    RubiksCube.formYellowCross(); // Done
    RubiksCube.permuteLastEdges(); // Done
    RubiksCube.permuteLastCorners(0);
    RubiksCube.orientLastEdges();
    while (curCanvas.onDisplay.front[7] != R) {
      if (count > 6) {
        console.log('Error in rotating last layer');
        return;
      }
      RubiksCube.doMovesFromArray(['D']);
      count++;
    }

  }

  // Input: movesArray: [move1: string, ...]
  // Output: null
  static doMovesFromArray(movesArray) {
    for (let move of movesArray) {
      switch (move) {
        case 'L':
          curCanvas.onDisplay.getRotationL();
          break;
        case 'L2':
          curCanvas.onDisplay.getRotationL();
          curCanvas.onDisplay.getRotationL();
          break;
        case 'L\'':
          curCanvas.onDisplay.getRotationLPrime();
          break;
        case 'R':
          curCanvas.onDisplay.getRotationR();
          break;
        case 'R2':
          curCanvas.onDisplay.getRotationR();
          curCanvas.onDisplay.getRotationR();
          break;
        case 'R\'':
          curCanvas.onDisplay.getRotationRPrime();
          break;
        case 'U':
          curCanvas.onDisplay.getRotationU();
          break;
        case 'U2':
          curCanvas.onDisplay.getRotationU();
          curCanvas.onDisplay.getRotationU();
          break;
        case 'U\'':
          curCanvas.onDisplay.getRotationUPrime();
          break;
        case 'D':
          curCanvas.onDisplay.getRotationD();
          break;
        case 'D2':
          curCanvas.onDisplay.getRotationD();
          curCanvas.onDisplay.getRotationD();
          break;
        case 'D\'':
          curCanvas.onDisplay.getRotationDPrime();
          break;
        case 'F':
          curCanvas.onDisplay.getRotationF();
          break;
        case 'F2':
          curCanvas.onDisplay.getRotationF();
          curCanvas.onDisplay.getRotationF();
          break;
        case 'F\'':
          curCanvas.onDisplay.getRotationFPrime();
          break;
        case 'B':
          curCanvas.onDisplay.getRotationB();
          break;
        case 'B2':
          curCanvas.onDisplay.getRotationB();
          curCanvas.onDisplay.getRotationB();
          break;
        case 'B\'':
          curCanvas.onDisplay.getRotationBPrime();
          break;
        default:
          alert(`Invalid move: ${move}`);
          return;
          break;
      }
    }
  }
}
