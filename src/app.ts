import './style/game.css'
import {field, fieldSize, matrix, size} from './store'
import {setNodeStyles, setPositionItems} from './position';
import {generateGame} from './DOM';
import {IMatrix} from './types/initial';
import {log} from "util";
import {start} from "repl";

const tileContainer: Element = document.querySelector('.tiles')!
const gridContainer: Element = document.querySelector('.grid')!

generateGame({field, gridContainer, tileContainer, matrix})

const tileArray: HTMLElement[] = Array.from(tileContainer!.querySelectorAll('.tile'))

setPositionItems(matrix, tileArray);


const blackNumber = 0

tileContainer.addEventListener('click', (event: any) => {
    const target = event.target as HTMLElement
    const tile = target.closest('.tile') as HTMLElement
    if (!tile) return;
    const tileNumber = Number(tile.dataset.matrixId)
    const tileCoords = findCoordByNumber(tileNumber, matrix)
    const blankCoords = findCoordByNumber(blackNumber, matrix)
    const isValid = isValidForSwap(tileCoords, blankCoords)
    if (isValid) {
        if (isValid === 'short-swap') {
            swap(blankCoords, tileCoords, matrix)
            setPositionItems(matrix, tileArray)
        }
        if (isValid === 'long-swap') {
            longSwap(blankCoords, tileCoords, matrix)
            setPositionItems(matrix, tileArray)
        }
    }
})

function findCoordByNumber(num: number, matrix: number[][]) {
    for( let y = 0; y < matrix.length; y++) {
        for( let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] === num) {
                return { x, y };
            }
        }
    }
    return null;
}

function isValidForSwap(coords1: any, coords2: any) {
    // console.log(coords1, coords2);
    const diffX = Math.abs(coords1.x - coords2.x)
    const diffY = Math.abs(coords1.y - coords2.y)

    if ((diffX === 1 || diffY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y)) {
        return 'short-swap'
    }
    if (((diffX === 0 && diffY !== 0) || (diffX !== 0 && diffY === 0))) {
        return 'long-swap'
    }
    return false
}

function swap(coords1: any, coords2: any, matrix: IMatrix) {
    const coords1Number = matrix[coords1.y][coords1.x];
    matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
    matrix[coords2.y][coords2.x] = coords1Number;
}

function longSwap(coords1: any, coords2: any, matrix: any) {
    const coords1Number = matrix[coords1.y][coords1.x];
    console.log(coords2)
    for( let y = 0; y < matrix.length; y++) {
        if (y === coords2.y) {
            let startRow = matrix[y].slice(0, coords2.x);
            let endRow = matrix[y].slice(coords2.x, size)
            const blank = matrix[y].slice(coords1.x)
            const currentSize = endRow.length - 1

            if (coords2.x === 0 && (coords1.x === currentSize)) {
                startRow = matrix[y].slice(0, size);
                matrix[y] = longSwapRight(startRow, blank, currentSize)
                console.log(coords1.x, currentSize)
            } if (coords2.x === 0 && (coords1.x !== currentSize)) {
                startRow = matrix[y].slice(0, coords1.x)
                startRow.unshift(0)
                endRow = matrix[y].slice(coords1.x + 1, size)
                matrix[y] = [].concat(startRow, endRow)
            }
            else {
                const currentEndRow = longSwapRight(endRow, blank, currentSize)
                console.log(currentEndRow)
                matrix[y] = currentEndRow
                console.log('else')
            }
        }
    }
}

function longSwapRight(row: any, blank: any, end: number) {
    return [].concat(blank, row.slice(0, end))
}