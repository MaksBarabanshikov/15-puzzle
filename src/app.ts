import "./style/game.css"
import { draw, getMatrix } from "./helper";
import { setPositionItems } from "./position";

const size: number = 4

const fieldSize: number = Math.pow(size, 2)

const fieldArray: number[] = [...Array(fieldSize).keys()]

const shuffleFieldArray: number[] = fieldArray.sort(() => Math.random() - .5).concat(100)

// const gameField = document.getElementById("15-puzzle")

const tileContainer: Element = document.querySelector(".tiles")!

draw(fieldArray, tileContainer)

const tileArray: HTMLElement[] = Array.from(tileContainer!.querySelectorAll(".tile"))

const matrix = getMatrix(shuffleFieldArray, size)

setPositionItems(matrix, tileArray);
