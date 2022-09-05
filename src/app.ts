import "./style/game.css"
import { drawTiles } from "./helper";

const size: number = 4

const fieldSize: number = Math.pow(size, 2)

const fieldArray: Array<number> = [...Array(fieldSize).keys()]

const gameField = document.getElementById("15-puzzle")

const tileContainer = document.querySelector(".tiles")

drawTiles(fieldArray)

const tileArray = Array.from(gameField!.querySelectorAll(".tile"))

