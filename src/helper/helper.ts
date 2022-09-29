import {log} from 'console';
import {IField, IMatrix, IPosTile} from '../types/initial';
import {fifteen} from "../store";
import {fifteenCounter} from "./DOM";
import {updateLocalCounter} from "./localStorage";

export const getMatrix = (arr: number[], size: number) => {
    const matrix: any[] = []
    arr.map(() => matrix.push(arr.splice(0, size)))
    return matrix;
}

export const findCoordByNumber = (num: number, matrix: IMatrix) => {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] === num) {
                return {x, y};
            }
        }
    }
    return undefined;
}

export const isValidForSwap = (coords1: IPosTile, coords2: IPosTile) => {
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

export const firstZeroConcat = (row: any, blank: any, end: number) => [].concat(blank, row.slice(0, end))

export const checkWin = (matrix: IMatrix, matrixWin: IMatrix) => {
    if (JSON.stringify(matrix) === JSON.stringify(matrixWin)) {
        alert('победа')
    }
}

export const shuffleField = (field: IField): IField => (
    [...field].sort(() => Math.random() - .5).concat(0)
)

export const incrementCounter = () => {
    let counter = Number(fifteenCounter.innerHTML);
    fifteenCounter.innerHTML = String(++counter);
    updateLocalCounter(counter)
}
