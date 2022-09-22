import './style/game.css'
import {field, matrix, size} from './store'
import {setPositionItems} from './position';
import {generateGame} from './DOM';
import {IMatrix, IPosTile, ISize} from './types/initial';
import {log} from 'util';

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
    const tileCoords: IPosTile | undefined = findCoordByNumber(tileNumber, matrix)
    const blankCoords: IPosTile | undefined = findCoordByNumber(blackNumber, matrix)
    const isValid = isValidForSwap(tileCoords, blankCoords)
    if (isValid && blankCoords && tileCoords) {
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

function findCoordByNumber(num: number, matrix: number[][]): IPosTile | undefined {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] === num) {
                return {x, y};
            }
        }
    }
    return undefined;
}

function isValidForSwap(coords1: any, coords2: any) {
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

function longSwap(blackCoords: IPosTile, targetCoords: IPosTile, matrix: IMatrix) {
    const swapRight = (row: number[], targetTile: number, zeroTile: number): number[] => {
        const blank = row.slice(blackCoords.x);
        const currentSize = row.length - 1;
        if ((targetTile === 0) && (zeroTile === currentSize)) {
            const startRow = row.slice(0, size);
            return firstZeroConcat(startRow, blank, currentSize)
        }
        if ((targetTile === 0) && (zeroTile !== currentSize)) {
            const startRow: any = row.slice(0, zeroTile)
            startRow.unshift(0)
            const endRow: any = row.slice(zeroTile + 1, size)
            return [].concat(startRow, endRow)
        } else {
            const startRow: any = row.slice(0, targetTile)
            const endRow: any = row.slice(targetTile, size).filter((tile: number) => tile !== 0)
            endRow.unshift(0)
            return [].concat(startRow, endRow)
        }
    }
    const swapLeft = (row: number[], targetTile: number, zeroTile: number): number[] => {
        const currentSize = row.length - 1;
        if ((targetTile === currentSize) && (zeroTile === 0)) {
            const newRow = row.filter((tile: number) => tile !== 0);
            newRow.push(0)
            return newRow
        }
        if ((zeroTile !== 0) && (targetTile === currentSize)) {
            const startRow: any = row.slice(0, zeroTile)
            const endRow: any = row.slice(zeroTile + 1, size)
            endRow.push(0)
            return [].concat(startRow, endRow)
        }
        if ((zeroTile !== 0) && (targetTile !== currentSize)) {
            const startRow: any = row.slice(0, targetTile + 1).filter((tile: number) => tile !== 0)
            const endRow: any = row.slice(targetTile + 1 , size)
            startRow.push(0)
            return [].concat(startRow, endRow)
        }
        else {
            const startRow: any = row.slice(1, targetTile + 1);
            const endRow: any = row.slice(targetTile + 1, size);
            startRow.push(0)
            return [].concat(startRow, endRow)

        }
    }
    const swapBottom = (matrix: any,targetTile: number, zeroTile: number) => {
        console.log(targetTile, zeroTile)
        console.log(matrix)
    }
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            const targetTile = targetCoords.x;
            const zeroTile = blackCoords.x;
            if (y === targetCoords.y) {
                if (zeroTile > targetTile) {
                    return matrix[y] = swapRight(matrix[y], targetTile, zeroTile)
                }
                if (zeroTile < targetTile) {
                    return matrix[y] = swapLeft(matrix[y], targetTile, zeroTile)
                }

                if (x === zeroTile) {
                    const blankCoords: IPosTile = findCoordByNumber(blackNumber, matrix)!
                    let counterY: ISize = blankCoords.y

                    if (blankCoords.y > targetCoords.y) {
                        while (counterY !== 0) {
                            const blankCoords: IPosTile = findCoordByNumber(blackNumber, matrix)!
                            const tile = matrix[counterY][x];
                            const nextTile = matrix[counterY - 1][x]
                            if (blankCoords.y > targetCoords.y) {
                                matrix[counterY - 1][x] = tile
                                matrix[counterY][x] = nextTile
                            }
                            --counterY
                        }
                    }

                    if (blankCoords.y <= targetCoords.y) {
                        const blankCoords: IPosTile = findCoordByNumber(blackNumber, matrix)!
                        let counterY = blankCoords.y
                        console.log(counterY, )
                        while (counterY !== targetCoords.y) {
                            const tile = matrix[counterY][x];
                            const nextTile = matrix[counterY + 1][x]
                            matrix[counterY + 1][x] = tile
                            matrix[counterY][x] = nextTile
                            ++counterY
                        }
                    }
                    console.log(matrix)
                }
            }

        }
    }
}

function firstZeroConcat(row: any, blank: any, end: number) {
    return [].concat(blank, row.slice(0, end))
}