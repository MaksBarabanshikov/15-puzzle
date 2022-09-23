import { IMatrix, IPosTile } from './types/initial';
import { blankTile, size } from './store';
import { findCoordByNumber, firstZeroConcat } from './helper';

export const swap = (coords1: any, coords2: any, matrix: IMatrix) => {
    const coords1Number = matrix[coords1.y][coords1.x];
    matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
    matrix[coords2.y][coords2.x] = coords1Number;
}

const swapRight = (row: number[], targetTile: number, zeroTile: number, blackCoords: IPosTile): number[] => {
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

const swapBottom = (matrix: IMatrix, targetCoords: IPosTile, x: number) => {
    const blankCoords: IPosTile = findCoordByNumber(blankTile, matrix)!
    let counterY = blankCoords.y
    while (counterY !== 0) {
        const blankCoords: IPosTile = findCoordByNumber(blankTile, matrix)!
        const tile = matrix[counterY][x];
        const nextTile = matrix[counterY - 1][x]
        if (blankCoords.y > targetCoords.y) {
            matrix[counterY - 1][x] = tile
            matrix[counterY][x] = nextTile
        }
        --counterY
    }
}

const swapTop = (matrix: IMatrix, targetCoords: IPosTile, x: number) => {
    const blankCoords: IPosTile = findCoordByNumber(blankTile, matrix)!
    let counterY = blankCoords.y
    while (counterY !== targetCoords.y) {
        const tile = matrix[counterY][x];
        const nextTile = matrix[counterY + 1][x]
        matrix[counterY + 1][x] = tile
        matrix[counterY][x] = nextTile
        ++counterY
    }
}

export const longSwap = (blankCoords: IPosTile, targetCoords: IPosTile, matrix: IMatrix) => {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            const targetTile = targetCoords.x;
            const zeroTile = blankCoords.x;
            if (y === targetCoords.y) {
                if (zeroTile > targetTile) {
                    return matrix[y] = swapRight(matrix[y], targetTile, zeroTile, blankCoords)
                }
                if (zeroTile < targetTile) {
                    return matrix[y] = swapLeft(matrix[y], targetTile, zeroTile)
                }
                if (x === zeroTile) {
                    if (blankCoords.y > targetCoords.y) {
                        swapBottom(matrix, targetCoords, x)
                    }
                    if (blankCoords.y <= targetCoords.y) {
                       swapTop(matrix, targetCoords, x)
                    }
                }
            }

        }
    }
}